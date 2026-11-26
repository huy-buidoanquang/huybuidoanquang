interface Star3D {
    x: number;
    y: number;
    z: number;
    size: number;
    hue: number;
    twinkle: number;
}

export function initJourneyStage3D(): () => void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.querySelector<HTMLCanvasElement>('.stage-3d');
    const cleanups: Array<() => void> = [];

    // 1. 3D Pointer Tilt + Specular Glare on interactive homepage cards
    if (!reducedMotion) {
        const tiltTargets = document.querySelectorAll<HTMLElement>('.destination-link, .project-row');
        tiltTargets.forEach((card) => {
            const isDest = card.classList.contains('destination-link');
            const maxTilt = isDest ? 8 : 3.5;

            const onMove = (event: PointerEvent) => {
                if (event.pointerType === 'touch') return;
                const rect = card.getBoundingClientRect();
                const px = (event.clientX - rect.left) / rect.width;
                const py = (event.clientY - rect.top) / rect.height;
                const rx = (0.5 - py) * maxTilt * 2;
                const ry = (px - 0.5) * maxTilt * 2;
                card.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
                card.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
                card.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
                card.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
                card.style.setProperty('--parallax-x', `${((0.5 - px) * 18).toFixed(1)}px`);
                card.style.setProperty('--parallax-y', `${((0.5 - py) * 18).toFixed(1)}px`);
            };

            const onLeave = () => {
                card.style.setProperty('--tilt-rx', '0deg');
                card.style.setProperty('--tilt-ry', '0deg');
                card.style.setProperty('--parallax-x', '0px');
                card.style.setProperty('--parallax-y', '0px');
            };

            card.addEventListener('pointermove', onMove);
            card.addEventListener('pointerleave', onLeave);
            cleanups.push(() => {
                card.removeEventListener('pointermove', onMove);
                card.removeEventListener('pointerleave', onLeave);
            });
        });
    }

    // 2. Floating Chapter Compass HUD
    const chapters = [...document.querySelectorAll<HTMLElement>('.home > .chapter')];
    const hudLinks = [...document.querySelectorAll<HTMLAnchorElement>('.compass-hud a')];
    const hudBar = document.querySelector<HTMLElement>('.compass-progress');

    const updateHud = () => {
        const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, window.scrollY / docH));
        if (hudBar) hudBar.style.transform = `scaleY(${progress.toFixed(4)})`;

        let activeIndex = 0;
        const mid = window.innerHeight * 0.42;
        chapters.forEach((chapter, idx) => {
            if (chapter.getBoundingClientRect().top <= mid) activeIndex = idx;
        });
        hudLinks.forEach((link, idx) => {
            link.classList.toggle('is-active', idx === activeIndex);
        });
    };

    window.addEventListener('scroll', updateHud, { passive: true });
    window.addEventListener('resize', updateHud, { passive: true });
    updateHud();
    cleanups.push(() => {
        window.removeEventListener('scroll', updateHud);
        window.removeEventListener('resize', updateHud);
    });

    // 3. Real-Time 3D Perspective Starfield + Topographic Wireframe Terrain Canvas
    if (!canvas || reducedMotion) {
        return () => cleanups.forEach((fn) => fn());
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return () => cleanups.forEach((fn) => fn());
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollNorm = 0;
    let journeyBlend = 0;
    let paperFade = 0;

    const journeysEl = document.querySelector<HTMLElement>('#journeys');
    const journalEl = document.querySelector<HTMLElement>('#journal');
    const aboutEl = document.querySelector<HTMLElement>('.about-chapter');

    const stars: Star3D[] = Array.from({ length: 165 }, (_, i) => ({
        x: (Math.sin(i * 127.1 + 1.3) * 43758.5453 % 1 - 0.5) * 2.6,
        y: (Math.sin(i * 269.5 + 4.7) * 43758.5453 % 1 - 0.5) * 2.0,
        z: ((i / 165) + 0.08) * 2.4,
        size: 0.9 + (i % 4) * 0.55,
        hue: i % 3 === 0 ? 198 : i % 3 === 1 ? 260 : 42,
        twinkle: i * 0.73,
    }));

    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        targetX = (event.clientX / Math.max(1, width) - 0.5) * 2;
        targetY = (event.clientY / Math.max(1, height) - 0.5) * 2;
    };

    const smooth = (top: number, vh: number) => {
        if (vh <= 0) return 0;
        const t = Math.max(0, Math.min(1, 0.95 - top / vh));
        return t * t * (3 - 2 * t);
    };

    const onScroll = () => {
        const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollNorm = Math.max(0, Math.min(1, window.scrollY / docH));
        if (journeysEl) journeyBlend = smooth(journeysEl.getBoundingClientRect().top, window.innerHeight);
        if (journalEl) paperFade = smooth(journalEl.getBoundingClientRect().top, window.innerHeight);
    };

    const gridCols = 28;
    const gridRows = 16;

    const project3D = (
        x: number,
        y: number,
        z: number,
        yaw: number,
        pitch: number,
        fov: number,
    ): { sx: number; sy: number; scale: number; depth: number } | null => {
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);

        const rx = x * cy - z * sy;
        const rz1 = x * sy + z * cy;
        const ry = y * cp - rz1 * sp;
        const rz = y * sp + rz1 * cp + 2.45;

        if (rz <= 0.2) return null;
        const scale = fov / rz;
        return {
            sx: width * 0.5 + rx * scale,
            sy: height * 0.52 + ry * scale,
            scale,
            depth: rz,
        };
    };

    const draw = (now: number) => {
        if (document.hidden) {
            rafId = 0;
            return;
        }
        const t = now * 0.001;
        pointerX += (targetX - pointerX) * 0.055;
        pointerY += (targetY - pointerY) * 0.055;

        ctx.clearRect(0, 0, width, height);

        const aboutFactor = aboutEl ? smooth(aboutEl.getBoundingClientRect().top, window.innerHeight) : 1;
        const globalAlpha = (1 - paperFade) * (0.28 + aboutFactor * 0.72);
        if (globalAlpha < 0.01) {
            rafId = requestAnimationFrame(draw);
            return;
        }

        const fov = Math.min(width, height) * 0.92;
        const yaw = pointerX * 0.16 + Math.sin(t * 0.14) * 0.04;
        const pitch = 0.28 + pointerY * 0.1 + journeyBlend * 0.18;

        // Layer A: 3D Starfield / Atmospheric Depth Dust
        const starSpeed = 0.06 + scrollNorm * 0.25;
        for (const s of stars) {
            const zMoved = ((s.z - t * starSpeed - scrollNorm * 1.4) % 2.4 + 2.4) % 2.4 - 0.9;
            const p = project3D(s.x * 1.8, s.y * 1.4, zMoved, yaw * 0.85, pitch * 0.45, fov);
            if (!p) continue;
            if (p.sx < -40 || p.sx > width + 40 || p.sy < -40 || p.sy > height + 40) continue;

            const pulse = 0.55 + 0.45 * Math.sin(t * 1.8 + s.twinkle);
            const depthFade = Math.max(0, Math.min(1, 1.35 - p.depth * 0.34));
            const alpha = globalAlpha * depthFade * pulse * (0.65 - journeyBlend * 0.25);
            if (alpha <= 0.02) continue;

            const radius = Math.max(0.6, s.size * (p.scale / (fov * 0.55)));
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${journeyBlend > 0.45 ? 36 : s.hue}, 82%, 86%, ${alpha.toFixed(3)})`;
            ctx.fill();
        }

        // Layer B: 3D Procedural Topographic Ridge Mesh (emerges in About → Projects → Journeys)
        const meshAlpha = globalAlpha * aboutFactor * 0.52;
        if (meshAlpha > 0.02) {
            const points: Array<Array<{ sx: number; sy: number; depth: number; elev: number } | null>> = [];
            const travelZ = scrollNorm * 5.2 + t * 0.22;

            for (let row = 0; row < gridRows; row++) {
                const rowPts: Array<{ sx: number; sy: number; depth: number; elev: number } | null> = [];
                const gz = -1.2 + (row / (gridRows - 1)) * 3.1;
                for (let col = 0; col < gridCols; col++) {
                    const gx = -2.35 + (col / (gridCols - 1)) * 4.7;
                    const wave1 = Math.sin(gx * 1.7 + t * 0.35) * Math.cos((gz + travelZ) * 1.35) * 0.28;
                    const wave2 = Math.sin(gx * 3.2 - (gz + travelZ) * 2.1) * 0.11;
                    const ridge = Math.exp(-Math.pow(gx * 0.55, 2)) * (0.2 + journeyBlend * 0.26);
                    const gy = 0.72 - (wave1 + wave2 + ridge);
                    const proj = project3D(gx, gy, gz, yaw, pitch, fov);
                    rowPts.push(proj ? { sx: proj.sx, sy: proj.sy, depth: proj.depth, elev: wave1 + ridge } : null);
                }
                points.push(rowPts);
            }

            // Draw horizontal contour ribbons (stronger)
            for (let row = 0; row < gridRows; row++) {
                const rowRatio = row / (gridRows - 1);
                const rowFade = Math.sin(rowRatio * Math.PI) * meshAlpha;
                if (rowFade < 0.015) continue;

                ctx.beginPath();
                let started = false;
                for (let col = 0; col < gridCols; col++) {
                    const pt = points[row][col];
                    if (!pt) { started = false; continue; }
                    if (!started) { ctx.moveTo(pt.sx, pt.sy); started = true; }
                    else { ctx.lineTo(pt.sx, pt.sy); }
                }
                const r = Math.round(142 + journeyBlend * 102);
                const g = Math.round(216 - journeyBlend * 20);
                const b = Math.round(248 - journeyBlend * 105);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(rowFade * 0.78).toFixed(3)})`;
                ctx.lineWidth = row % 3 === 0 ? 1.25 : 0.7;
                ctx.stroke();
            }

            // Draw subtle longitudinal meridian lines
            for (let col = 0; col < gridCols; col += 2) {
                const colFade = Math.sin((col / (gridCols - 1)) * Math.PI) * meshAlpha * 0.36;
                if (colFade < 0.01) continue;
                ctx.beginPath();
                let started = false;
                for (let row = 0; row < gridRows; row++) {
                    const pt = points[row][col];
                    if (!pt) { started = false; continue; }
                    if (!started) { ctx.moveTo(pt.sx, pt.sy); started = true; }
                    else { ctx.lineTo(pt.sx, pt.sy); }
                }
                const r = Math.round(180 + journeyBlend * 64);
                const g = Math.round(190 + journeyBlend * 10);
                const b = Math.round(245 - journeyBlend * 90);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${colFade.toFixed(3)})`;
                ctx.lineWidth = 0.65;
                ctx.stroke();
            }
        }

        rafId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
        if (!document.hidden && rafId === 0) {
            rafId = requestAnimationFrame(draw);
        }
    };

    resize();
    onScroll();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    rafId = requestAnimationFrame(draw);

    cleanups.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
    });

    return () => cleanups.forEach((fn) => fn());
}

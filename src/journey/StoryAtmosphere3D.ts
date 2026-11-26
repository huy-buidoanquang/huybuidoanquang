type AtmosphereType = 'none' | 'ocean' | 'clouds' | 'embers' | 'golden-wind' | 'waterfall' | 'spores' | 'petals';

interface Mote3D {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    size: number;
    phase: number;
    tint: number;
}

function initAtmosphereCanvas(canvas: HTMLCanvasElement, mode: AtmosphereType): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx || mode === 'none') return () => {};

    let w = 0;
    let h = 0;
    let rafId = 0;
    let mx = 0;
    let my = 0;

    const count = mode === 'clouds' ? 32 : mode === 'waterfall' ? 95 : 72;
    const motes: Mote3D[] = Array.from({ length: count }, (_, i) => {
        const s1 = Math.abs(Math.sin(i * 91.7 + 1.2) * 10000) % 1;
        const s2 = Math.abs(Math.sin(i * 47.3 + 3.9) * 10000) % 1;
        const s3 = Math.abs(Math.sin(i * 17.9 + 7.1) * 10000) % 1;
        return {
            x: s1,
            y: s2,
            z: 0.25 + s3 * 0.95,
            vx: mode === 'clouds' ? 0.008 + s3 * 0.012 : mode === 'golden-wind' ? 0.018 + s3 * 0.02 : (s1 - 0.5) * 0.009,
            vy: mode === 'waterfall' ? 0.035 + s3 * 0.045 : mode === 'spores' || mode === 'embers' ? -(0.008 + s3 * 0.014) : (s2 - 0.5) * 0.006,
            size: mode === 'clouds' ? 90 + s3 * 160 : mode === 'ocean' ? 2 + s3 * 4.5 : 1.6 + s3 * 3.8,
            phase: i * 0.85,
            tint: s3,
        };
    });

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        mx = (e.clientX / Math.max(1, w) - 0.5) * 32;
        my = (e.clientY / Math.max(1, h) - 0.5) * 24;
    };

    const render = (now: number) => {
        if (document.hidden) {
            rafId = 0;
            return;
        }
        const t = now * 0.001;
        ctx.clearRect(0, 0, w, h);

        for (const m of motes) {
            const px = ((m.x + t * m.vx) % 1.2 + 1.2) % 1.2 - 0.1;
            const py = ((m.y + t * m.vy) % 1.2 + 1.2) % 1.2 - 0.1;
            const x = px * w + mx * m.z + Math.sin(t * 0.9 + m.phase) * (mode === 'clouds' ? 24 : 12) * m.z;
            const y = py * h + my * m.z + Math.cos(t * 0.7 + m.phase) * 8 * m.z;
            const pulse = 0.55 + 0.45 * Math.sin(t * 1.9 + m.phase);

            if (mode === 'clouds') {
                const rad = m.size * m.z;
                const grad = ctx.createRadialGradient(x, y, rad * 0.1, x, y, rad);
                grad.addColorStop(0, `rgba(255, 255, 255, ${(0.14 * m.z).toFixed(3)})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2);
                ctx.fill();
            } else if (mode === 'waterfall') {
                const len = 10 + m.z * 20;
                ctx.strokeStyle = `rgba(148, 240, 214, ${(0.18 * m.z * pulse).toFixed(3)})`;
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 2, y + len);
                ctx.stroke();
            } else if (mode === 'ocean') {
                const r = m.size * m.z;
                ctx.fillStyle = m.tint > 0.55
                    ? `rgba(255, 162, 92, ${(0.34 * pulse * m.z).toFixed(3)})`
                    : `rgba(116, 214, 242, ${(0.28 * pulse * m.z).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            } else if (mode === 'embers') {
                const r = m.size * m.z;
                ctx.fillStyle = m.tint > 0.4
                    ? `rgba(232, 164, 76, ${(0.32 * pulse * m.z).toFixed(3)})`
                    : `rgba(210, 220, 216, ${(0.18 * pulse * m.z).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            } else if (mode === 'golden-wind') {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(t * 0.7 + m.phase);
                ctx.fillStyle = m.tint > 0.5
                    ? `rgba(196, 68, 48, ${(0.26 * m.z).toFixed(3)})`
                    : `rgba(214, 158, 72, ${(0.28 * m.z).toFixed(3)})`;
                ctx.fillRect(-m.size * 1.2, -m.size * 0.35, m.size * 2.4, m.size * 0.7);
                ctx.restore();
            } else if (mode === 'spores') {
                const r = m.size * m.z;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 3.4);
                grad.addColorStop(0, m.tint > 0.6
                    ? `rgba(182, 242, 174, ${(0.45 * pulse).toFixed(3)})`
                    : `rgba(174, 214, 255, ${(0.4 * pulse).toFixed(3)})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r * 3.4, 0, Math.PI * 2);
                ctx.fill();
            } else if (mode === 'petals') {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(t * 0.4 + m.phase);
                ctx.fillStyle = m.tint > 0.65
                    ? `rgba(158, 35, 48, ${(0.2 * m.z).toFixed(3)})`
                    : `rgba(202, 162, 92, ${(0.22 * m.z).toFixed(3)})`;
                ctx.fillRect(-m.size, -m.size * 0.45, m.size * 2, m.size * 0.9);
                ctx.restore();
            }
        }

        rafId = requestAnimationFrame(render);
    };

    const onVis = () => {
        if (!document.hidden && rafId === 0) rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    rafId = requestAnimationFrame(render);

    return () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('visibilitychange', onVis);
    };
}

function initTilt3D(reducedMotion: boolean): void {
    if (reducedMotion) return;
    const targets = document.querySelectorAll<HTMLElement>('[data-tilt-3d]');
    targets.forEach((el) => {
        const strength = Number(el.dataset.tiltStrength || '7');
        el.addEventListener('pointermove', (e) => {
            if (e.pointerType === 'touch') return;
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rx = (0.5 - py) * strength * 2;
            const ry = (px - 0.5) * strength * 2;
            el.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
            el.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
            el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
            el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
        });
        el.addEventListener('pointerleave', () => {
            el.style.setProperty('--tilt-rx', '0deg');
            el.style.setProperty('--tilt-ry', '0deg');
        });
    });
}

function initPhotoDecks(reducedMotion: boolean): void {
    const decks = document.querySelectorAll<HTMLElement>('.photo-deck-3d');
    decks.forEach((deck) => {
        const cards = [...deck.querySelectorAll<HTMLElement>('.deck-card')];
        const prevBtn = deck.querySelector<HTMLButtonElement>('.deck-prev');
        const nextBtn = deck.querySelector<HTMLButtonElement>('.deck-next');
        const counterEl = deck.querySelector<HTMLElement>('.deck-counter');
        const captionEl = deck.querySelector<HTMLElement>('.deck-active-caption');
        const stage = deck.querySelector<HTMLElement>('.deck-stage');
        if (cards.length === 0) return;

        let active = Math.floor(cards.length / 2);

        const layout = () => {
            cards.forEach((card, idx) => {
                const offset = idx - active;
                const abs = Math.abs(offset);
                card.classList.toggle('is-active', offset === 0);
                card.setAttribute('aria-current', offset === 0 ? 'true' : 'false');
                card.style.zIndex = String(cards.length - abs + (offset === 0 ? 5 : 0));
                if (reducedMotion) {
                    card.style.opacity = offset === 0 ? '1' : '0.35';
                    card.style.transform = `translate3d(${offset * 42}%, 0, 0) scale(${offset === 0 ? 1 : 0.85})`;
                } else {
                    const tx = offset * 44;
                    const ty = abs * 14;
                    const tz = offset === 0 ? 110 : -abs * 125;
                    const ry = Math.max(-44, Math.min(44, offset * -22));
                    const rz = offset * 2.4;
                    const sc = Math.max(0.64, 1 - abs * 0.11);
                    card.style.opacity = abs > 3 ? '0' : String(Math.max(0.32, 1 - abs * 0.24));
                    card.style.transform = `translate3d(${tx}%, ${ty}px, ${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc.toFixed(3)})`;
                }
            });

            if (counterEl) {
                counterEl.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
            }
            const activeTrigger = cards[active]?.querySelector<HTMLButtonElement>('.photo-trigger');
            if (captionEl && activeTrigger) {
                captionEl.textContent = activeTrigger.dataset.photoCaption || activeTrigger.dataset.photoAlt || '';
            }
        };

        const go = (nextIdx: number) => {
            active = (nextIdx + cards.length) % cards.length;
            layout();
        };

        cards.forEach((card, idx) => {
            const trigger = card.querySelector<HTMLButtonElement>('.photo-trigger');
            trigger?.addEventListener('click', (event) => {
                if (idx !== active) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    go(idx);
                }
            }, true);
        });

        prevBtn?.addEventListener('click', () => go(active - 1));
        nextBtn?.addEventListener('click', () => go(active + 1));

        let dragStartX = 0;
        let dragging = false;
        stage?.addEventListener('pointerdown', (e) => {
            dragStartX = e.clientX;
            dragging = true;
        });
        stage?.addEventListener('pointerup', (e) => {
            if (!dragging) return;
            dragging = false;
            const dx = e.clientX - dragStartX;
            if (Math.abs(dx) > 42) {
                go(dx < 0 ? active + 1 : active - 1);
            }
        });

        layout();
    });
}

function initPhotoStrips(reducedMotion: boolean): void {
    const strips = document.querySelectorAll<HTMLElement>('.photo-strip');
    strips.forEach((strip) => {
        const track = strip.querySelector<HTMLElement>('.strip-track');
        const slides = [...strip.querySelectorAll<HTMLElement>('.strip-slide')];
        const prevBtn = strip.querySelector<HTMLButtonElement>('.strip-prev');
        const nextBtn = strip.querySelector<HTMLButtonElement>('.strip-next');
        if (!track || slides.length === 0) return;

        const updateCurve = () => {
            if (reducedMotion) return;
            const trackRect = track.getBoundingClientRect();
            const centerX = trackRect.left + trackRect.width / 2;
            slides.forEach((slide) => {
                const r = slide.getBoundingClientRect();
                const dist = (r.left + r.width / 2 - centerX) / Math.max(1, trackRect.width * 0.55);
                const clamped = Math.max(-1, Math.min(1, dist));
                slide.style.transform = `perspective(1000px) rotateY(${(-clamped * 10).toFixed(2)}deg) scale(${(1 - Math.abs(clamped) * 0.05).toFixed(3)})`;
            });
        };

        track.addEventListener('scroll', updateCurve, { passive: true });
        window.addEventListener('resize', updateCurve, { passive: true });
        updateCurve();

        const step = () => Math.max(280, track.clientWidth * 0.72);
        prevBtn?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reducedMotion ? 'auto' : 'smooth' }));
        nextBtn?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reducedMotion ? 'auto' : 'smooth' }));

        let isDown = false;
        let startX = 0;
        let startScroll = 0;
        let dragged = false;

        track.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') return;
            isDown = true;
            dragged = false;
            startX = e.clientX;
            startScroll = track.scrollLeft;
            track.classList.add('is-dragging');
        });
        window.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 6) dragged = true;
            track.scrollLeft = startScroll - dx;
        });
        window.addEventListener('pointerup', () => {
            isDown = false;
            track.classList.remove('is-dragging');
        });
        track.addEventListener('click', (e) => {
            if (dragged) {
                e.preventDefault();
                e.stopPropagation();
                dragged = false;
            }
        }, true);
    });
}

function initScrollReveals(reducedMotion: boolean): void {
    const items = document.querySelectorAll<HTMLElement>('.story-photo, .photo-showcase-3d, .photo-deck-3d, .photo-strip, .story-gallery figure');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
}

export function initStoryExperience(): () => void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.querySelector<HTMLCanvasElement>('.story-atmosphere');
    const mode = (canvas?.dataset.atmosphere || 'none') as AtmosphereType;

    const cleanupCanvas = !reducedMotion && canvas ? initAtmosphereCanvas(canvas, mode) : () => {};
    initTilt3D(reducedMotion);
    initPhotoDecks(reducedMotion);
    initPhotoStrips(reducedMotion);
    initScrollReveals(reducedMotion);

    return () => cleanupCanvas();
}

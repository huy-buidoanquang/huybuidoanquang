import * as THREE from 'three';
import { getScrollProgress } from './scrollProgress.js';

export function mountJourney(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 12;
    const objects: THREE.Object3D[] = [];
    const add = (object: THREE.Object3D) => { scene.add(object); objects.push(object); };
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xc8ec81, wireframe: true, transparent: true, opacity: 0.48 });
    for (let i = 0; i < 7; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7 + i * 0.34, 0.015, 5, 100), ringMaterial);
        ring.position.z = -i * 1.25;
        ring.rotation.x = 0.3 + i * 0.07;
        add(ring);
    }
    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.4, 1),
        new THREE.MeshBasicMaterial({ color: 0x9fd6d0, wireframe: true, transparent: true, opacity: 0.6 })
    );
    core.position.set(1.6, 0.3, -13);
    add(core);
    const portal = new THREE.Mesh(
        new THREE.TorusGeometry(4, 0.07, 6, 100),
        new THREE.MeshBasicMaterial({ color: 0xe4c49b, transparent: true, opacity: 0.75 })
    );
    portal.position.z = -27;
    portal.rotation.y = 0.4;
    add(portal);
    const stars = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
        stars[i * 3] = (Math.random() - 0.5) * 24;
        stars[i * 3 + 1] = (Math.random() - 0.5) * 18;
        stars[i * 3 + 2] = 8 - Math.random() * 48;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(stars, 3));
    add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xc6e6dc, size: 0.035 })));

    let pointerX = 0, pointerY = 0, frame = 0, disposed = false;
    const resize = () => {
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setSize(innerWidth, innerHeight, false);
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
    };
    const onPointer = (event: PointerEvent) => {
        pointerX = event.clientX / innerWidth - 0.5;
        pointerY = event.clientY / innerHeight - 0.5;
    };
    const draw = () => {
        if (disposed || document.hidden) return;
        const progress = getScrollProgress(scrollY, document.documentElement.scrollHeight - innerHeight);
        camera.position.z += (12 - progress * 43 - camera.position.z) * 0.06;
        camera.position.x += (pointerX * 0.35 - camera.position.x) * 0.04;
        camera.position.y += (-pointerY * 0.25 - camera.position.y) * 0.04;
        core.rotation.x += 0.003;
        core.rotation.y += 0.004;
        portal.rotation.z += 0.0015;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => { if (document.hidden) cancelAnimationFrame(frame); else draw(); };
    const dispose = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        removeEventListener('resize', resize);
        removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVisibility);
        for (const object of objects) {
            const mesh = object as THREE.Mesh;
            mesh.geometry?.dispose();
            const material = mesh.material;
            if (Array.isArray(material)) material.forEach((item) => item.dispose());
            else material?.dispose();
        }
        renderer.dispose();
    };
    resize();
    addEventListener('resize', resize, { passive: true });
    addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    addEventListener('pagehide', dispose, { once: true });
    canvas.classList.add('ready');
    draw();
    return dispose;
}

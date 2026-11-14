import * as THREE from 'three';
import { getScrollProgress } from './scrollProgress.js';
import projectArt from '../assets/project.svg?url';
import signalArt from '../assets/signal.svg?url';
import placeArt from '../assets/dalat-aerial.webp?url';

export function mountJourney(canvas: HTMLCanvasElement | null, getNatureBlend: () => number) {
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
        return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x18223e, 0.023);
    const cosmicFog = new THREE.Color(0x18223e);
    const natureFog = new THREE.Color(0x17352f);
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    const route = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 13),
        new THREE.Vector3(0.3, 0.2, 4),
        new THREE.Vector3(1.7, 0, -6),
        new THREE.Vector3(-1.3, 0.4, -16),
        new THREE.Vector3(0.8, 0.3, -28),
        new THREE.Vector3(0, 0.5, -38),
    ]);
    camera.position.copy(route.getPointAt(0));
    const objects: THREE.Object3D[] = [];
    const add = (object: THREE.Object3D) => { scene.add(object); objects.push(object); };
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xb5c9ff, transparent: true, opacity: 0.34, depthWrite: false });
    for (let i = 0; i < 13; i++) {
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.5 + Math.sin(i) * 0.7, 0.018, 3, 72), orbitMaterial);
        orbit.position.set(Math.sin(i * 0.6) * 1.1, Math.cos(i * 0.5) * 0.7, 4 - i * 1.65);
        orbit.rotation.set(0.2, i * 0.13, i * 0.31);
        add(orbit);
    }
    const starPositions = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 26;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        starPositions[i * 3 + 2] = 10 - Math.random() * 43;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xdceaff, size: 0.055, transparent: true, opacity: 0.76, depthWrite: false });
    add(new THREE.Points(starGeometry, starMaterial));
    const imageTextures = [projectArt, signalArt, placeArt].map((url) => new THREE.TextureLoader().load(url));
    const imageMaterials: THREE.MeshBasicMaterial[] = [];
    imageTextures.forEach((texture, index) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.88 });
        const world = new THREE.Mesh(new THREE.SphereGeometry(1.75, 40, 28), material);
        world.position.set(index === 1 ? -2.5 : 2.5, index === 2 ? 1.4 : -0.3, -11 - index * 5);
        world.scale.set(1.35, 1, 0.68);
        world.rotation.y = index === 1 ? 0.28 : -0.28;
        imageMaterials.push(material);
        add(world);
    });

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
        const blend = getNatureBlend();
        orbitMaterial.opacity = 0.34 * (1 - blend);
        starMaterial.opacity = 0.76 * (1 - blend);
        imageMaterials.forEach((material, index) => {
            material.opacity = 0.88 * (index === 2 ? blend : 1 - blend * 0.65);
        });
        scene.fog!.color.copy(cosmicFog).lerp(natureFog, blend);
        const target = route.getPointAt(progress * 0.98);
        camera.position.lerp(target, 0.055);
        camera.position.x += (pointerX * 0.23) * 0.03;
        camera.position.y += (-pointerY * 0.18) * 0.03;
        camera.lookAt(route.getPointAt(Math.min(progress * 0.98 + 0.045, 1)));
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
        imageTextures.forEach((texture) => texture.dispose());
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

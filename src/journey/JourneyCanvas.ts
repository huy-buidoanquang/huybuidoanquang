import * as THREE from 'three';
import { getScrollProgress } from './scrollProgress.js';
import projectArt from '../assets/project.svg?url';
import signalArt from '../assets/signal.svg?url';
import placeArt from '../assets/dalat.svg?url';

export function mountJourney(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
        return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x17352f, 0.026);
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
    const treeCount = 44;
    const trunks = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(0.08, 0.14, 2.8, 5),
        new THREE.MeshBasicMaterial({ color: 0x172d27 }),
        treeCount
    );
    const crowns = new THREE.InstancedMesh(
        new THREE.ConeGeometry(0.95, 3.2, 6),
        new THREE.MeshBasicMaterial({ color: 0x204438 }),
        treeCount
    );
    const tree = new THREE.Object3D();
    for (let i = 0; i < treeCount; i++) {
        const side = i % 2 ? 1 : -1;
        const depth = 7 - i * 1.05;
        const distance = 4.6 + (i * 13 % 7) * 0.6;
        const height = 0.75 + (i * 7 % 9) * 0.08;
        tree.position.set(side * distance, -2.8, depth);
        tree.scale.setScalar(height);
        tree.updateMatrix();
        trunks.setMatrixAt(i, tree.matrix);
        tree.position.y = -0.2;
        tree.updateMatrix();
        crowns.setMatrixAt(i, tree.matrix);
    }
    add(trunks);
    add(crowns);
    const imageTextures = [projectArt, signalArt, placeArt].map((url) => new THREE.TextureLoader().load(url));
    imageTextures.forEach((texture, index) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const frame = new THREE.Mesh(
            new THREE.PlaneGeometry(4.8, 3),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.88 })
        );
        frame.position.set(index === 1 ? -2.5 : 2.5, index === 2 ? 1.4 : -0.3, -11 - index * 5);
        frame.rotation.y = index === 1 ? 0.28 : -0.28;
        add(frame);
    });
    const terrain = new THREE.PlaneGeometry(35, 30, 38, 32);
    terrain.rotateX(-Math.PI / 2);
    const vertices = terrain.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
        const x = vertices.getX(i), z = vertices.getZ(i);
        vertices.setY(i, Math.sin(x * 0.42) * Math.cos(z * 0.31) * 1.4 + Math.sin(z * 0.65) * 0.45);
    }
    add(new THREE.Mesh(terrain, new THREE.MeshBasicMaterial({ color: 0x183b31, side: THREE.DoubleSide, transparent: true, opacity: 0.55 })));
    terrain.translate(0, -5, -31);
    const mist = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
        mist[i * 3] = (Math.random() - 0.5) * 24;
        mist[i * 3 + 1] = Math.random() * 3 - 2;
        mist[i * 3 + 2] = 8 - Math.random() * 48;
    }
    const mistGeometry = new THREE.BufferGeometry();
    mistGeometry.setAttribute('position', new THREE.BufferAttribute(mist, 3));
    add(new THREE.Points(mistGeometry, new THREE.PointsMaterial({ color: 0xe5efdf, size: 0.14, transparent: true, opacity: 0.3 })));

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

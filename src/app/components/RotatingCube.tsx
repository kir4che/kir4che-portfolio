"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

// 每一面的連結資訊（順序對應 BoxGeometry 面：+X, -X, +Y, -Y, +Z, -Z）
const FACES = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mollysu/",
    icon: "/icons/linkedin.webp",
  },
  {
    label: "Blog",
    url: "https://kir4che.com/",
    icon: "/icons/kir4che-blog.webp",
  },
  {
    label: "GitHub",
    url: "https://github.com/kir4che",
    icon: "/icons/github.webp",
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/profile/kir4che.bsky.social",
    icon: "/icons/bluesky.webp",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@kir4che",
    icon: "/icons/youtube.webp",
  },
  {
    label: "Codepen",
    url: "https://codepen.io/kir4che",
    icon: "/icons/codepen.webp",
  },
];

export default function RotatingCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const textures = FACES.map((f) => loader.load(f.icon));
    const materials = textures.map(
      (map) =>
        new THREE.MeshStandardMaterial({
          map,
          roughness: 0.5,
          metalness: 0.05,
        }),
    );
    const cube = new THREE.Mesh(geometry, materials);
    cube.quaternion.setFromEuler(new THREE.Euler(0.25, 0, 0));
    scene.add(cube);

    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(-3, -2, -3);
    scene.add(fillLight);

    const s = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      velX: 0,
      velY: 0,
      autoRotX: reduced ? 0 : 0.003,
      autoRotY: reduced ? 0 : 0.015,
      // 定時隨機切換漂移目標速度
      driftTargetX: reduced ? 0 : 0.003,
      driftTargetY: reduced ? 0 : 0.015,
      driftNextAt: performance.now() + 3000,
      pointerDownTime: 0,
      pointerDownX: 0,
      pointerDownY: 0,
    };

    const deltaQ = new THREE.Quaternion();
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);

    // 隨機漂移目標速度
    const randomDrift = () => {
      // Y 軸保持正向（向右轉），X 軸允許正負小幅漂移。
      s.driftTargetY = 0.008 + Math.random() * 0.016;
      s.driftTargetX = (Math.random() - 0.5) * 0.008;
      s.driftNextAt = performance.now() + 2500 + Math.random() * 3000;
    };

    // 根據 dx, dy 計算旋轉增量並套用到 cube 上
    const applyDeltaRotation = (dx: number, dy: number) => {
      deltaQ
        .setFromAxisAngle(axisY, dy)
        .multiply(new THREE.Quaternion().setFromAxisAngle(axisX, dx));
      cube.quaternion.premultiply(deltaQ);
    };

    const onPointerDown = (e: PointerEvent) => {
      mount.setPointerCapture(e.pointerId);
      s.isDragging = true;
      s.prevX = e.clientX;
      s.prevY = e.clientY;
      s.velX = 0;
      s.velY = 0;
      s.pointerDownTime = Date.now();
      s.pointerDownX = e.clientX;
      s.pointerDownY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!s.isDragging) return;
      s.velX = (e.clientY - s.prevY) * 0.008;
      s.velY = (e.clientX - s.prevX) * 0.008;
      applyDeltaRotation(s.velX, s.velY);
      s.prevX = e.clientX;
      s.prevY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      mount.releasePointerCapture(e.pointerId);
      s.isDragging = false;
      const elapsed = Date.now() - s.pointerDownTime;
      const dx = e.clientX - s.pointerDownX;
      const dy = e.clientY - s.pointerDownY;
      // < 200ms 且位移距離平方 < 4px² → 視為 click，否則視為 drag。
      if (elapsed < 200 && dx * dx + dy * dy < 4) {
        const rect = mount.getBoundingClientRect();
        // 轉成 NDC（範圍 -1 ~ 1）才能餵給 Raycaster
        // Y 軸加負號是因為螢幕 Y 向下為正，NDC Y 向上為正，方向相反。
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cube);
        if (intersects.length > 0 && intersects[0].face) {
          const face = FACES[intersects[0].face.materialIndex];
          if (face?.url) window.open(face.url, "_blank", "noopener,noreferrer");
        }
      }
    };

    mount.addEventListener("pointerdown", onPointerDown);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    const animate = () => {
      // 每幀讓速度逐漸減少，模擬慣性。
      // 手動拖曳時 * 0.95 快速減速；非拖曳時 * 0.92 較慢減速，讓 cube 能多轉幾圈。
      if (s.isDragging) {
        s.autoRotX *= 0.95;
        s.autoRotY *= 0.95;
      } else {
        s.velX *= 0.92;
        s.velY *= 0.92;
        // 超過 0.01 的速度才繼續旋轉，避免過慢時還一直轉。
        if (!reduced && performance.now() > s.driftNextAt) randomDrift();
        s.autoRotX = THREE.MathUtils.lerp(
          s.autoRotX,
          reduced ? 0 : s.driftTargetX,
          0.02,
        );
        s.autoRotY = THREE.MathUtils.lerp(
          s.autoRotY,
          reduced ? 0 : s.driftTargetY,
          0.02,
        );
        applyDeltaRotation(s.velX + s.autoRotX, s.velY + s.autoRotY);
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // cube 離開 viewport 時暫停 animation loop，進入時恢復，減少不必要的 GPU 消耗。
    const observer = new IntersectionObserver(
      ([entry]) => {
        renderer.setAnimationLoop(entry.isIntersecting ? animate : null);
      },
      { threshold: 0 },
    );
    observer.observe(mount);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      renderer.setAnimationLoop(null);
    };
    const onContextRestored = () => renderer.setAnimationLoop(animate);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      onContextRestored,
    );

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        onContextRestored,
      );
      mount.removeEventListener("pointerdown", onPointerDown);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerup", onPointerUp);
      geometry.dispose();
      textures.forEach((t) => t.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return (
    <div
      ref={mountRef}
      className="size-full cursor-grab active:cursor-grabbing"
    />
  );
}

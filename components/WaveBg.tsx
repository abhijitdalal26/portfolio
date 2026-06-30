"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function WaveBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let cleanupFn: (() => void) | undefined;

    import("three").then((THREE) => {
      if (!containerRef.current) return;

      const SEPARATION = 60, AMOUNTX = 70, AMOUNTY = 70;
      let count = 0;
      let mouseX = 0, mouseY = 0;
      let halfW = window.innerWidth / 2;
      let halfH = window.innerHeight / 2;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      camera.position.y = 300;

      const scene = new THREE.Scene();

      const numParticles = AMOUNTX * AMOUNTY;
      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let i = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i]     = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          positions[i + 1] = 0;
          positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scales[j] = 1;
          i += 3; j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      const colorDark  = new THREE.Color("#0ea5e9");
      const colorLight = new THREE.Color("#4f46e5");

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(themeRef.current === "dark" ? "#0ea5e9" : "#4f46e5") },
        },
        vertexShader: `
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      container.appendChild(renderer.domElement);

      function onPointerMove(e: PointerEvent) {
        if (!e.isPrimary) return;
        mouseX = e.clientX - halfW;
        mouseY = e.clientY - halfH;
      }

      function onResize() {
        halfW = window.innerWidth / 2;
        halfH = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("resize", onResize);

      function animate() {
        animId = requestAnimationFrame(animate);

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (200 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        const pos = geometry.attributes.position.array as Float32Array;
        const sc  = geometry.attributes.scale.array as Float32Array;

        let ii = 0, jj = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            pos[ii + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            sc[jj] =
              (Math.sin((ix + count) * 0.3) + 1) * 8 +
              (Math.sin((iy + count) * 0.5) + 1) * 8;
            ii += 3; jj++;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.scale.needsUpdate = true;

        const target = themeRef.current === "dark" ? colorDark : colorLight;
        material.uniforms.color.value.lerp(target, 0.05);

        renderer.render(scene, camera);
        count += 0.05;
      }

      animate();

      cleanupFn = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        renderer.domElement.remove();
      };
    });

    return () => cleanupFn?.();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

"use client";

import { Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

function WireCore() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#312e81"
          emissiveIntensity={0.45}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.08;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.8, 0, 0]}>
      <torusGeometry args={[2.4, 0.018, 16, 120]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
    </mesh>
  );
}

function ParticleCloud({ count = 320 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = 2.39996322972865332;
    for (let i = 0; i < count; i++) {
      const t = i * golden;
      const r = 4 + ((i * 17) % 50) * 0.1;
      const theta = t % (Math.PI * 2);
      const phi = Math.acos(((i * 13) % 200) / 100 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function PortfolioSceneCanvas() {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.75]}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 6, 4]} intensity={0.8} color="#e0e7ff" />
      <directionalLight position={[-6, -4, -2]} intensity={0.35} color="#67e8f9" />
      <WireCore />
      <OrbitalRing />
      <ParticleCloud count={280} />
    </Canvas>
  );
}

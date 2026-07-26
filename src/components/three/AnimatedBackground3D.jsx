import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Tube, TubeGeometry, CatmullRomCurve3, MeshLine, MeshLineGeometry, MeshLineMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedTorus() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.0015;
      meshRef.current.position.z = Math.sin(Date.now() * 0.0005) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusGeometry args={[8, 3, 32, 100]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.3}
        wireframe={false}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function RotatingCubes() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          position={[Math.cos((i / 3) * Math.PI * 2) * 15, Math.sin((i / 3) * Math.PI * 2) * 15, -8]}
        >
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial
            color={i === 0 ? "#a78bfa" : i === 1 ? "#22d3ee" : "#38bdf8"}
            emissive={i === 0 ? "#a78bfa" : i === 1 ? "#22d3ee" : "#38bdf8"}
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, 0, 0]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[10, 0, 0]} intensity={0.8} color="#22d3ee" />
      <AnimatedTorus />
      <RotatingCubes />
    </>
  );
}

export default function AnimatedBackground3D() {
  return (
    <div className="w-full h-full absolute inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

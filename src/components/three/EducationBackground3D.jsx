import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function EducationBooks() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 7,
            Math.sin((i / 12) * Math.PI * 2) * 7,
            Math.cos((i / 12) * Math.PI * 2) * 2,
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <boxGeometry args={[1.5, 2.5, 0.8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#38bdf8"}
            emissive={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#38bdf8"}
            emissiveIntensity={0.25}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function EducationBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 10, 5]} intensity={1.1} />
        <pointLight position={[-8, 5, 3]} intensity={0.7} color="#22d3ee" />
        <EducationBooks />
      </Canvas>
    </div>
  );
}

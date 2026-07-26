import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedPlanes() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 5, Math.sin((i / 5) * Math.PI * 2) * 5, i - 2]}>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissive={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.3}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function AboutBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedPlanes />
      </Canvas>
    </div>
  );
}

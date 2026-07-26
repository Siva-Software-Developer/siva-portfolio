import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AwardTrophies() {
  const trophies = useRef([]);

  useFrame(() => {
    trophies.current.forEach((trophy, i) => {
      if (trophy) {
        trophy.rotation.y += 0.008;
        trophy.position.z = Math.sin(Date.now() * 0.0003 + i) * 2;
      }
    });
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
          <mesh
            ref={(el) => (trophies.current[i] = el)}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 7,
              Math.sin((i / 5) * Math.PI * 2) * 4,
              0,
            ]}
          >
            <coneGeometry args={[1, 2, 8]} />
            <meshStandardMaterial
              color={["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e"][i]}
              emissive={["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e"][i]}
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function CertificationsBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#fbbf24" />
        <pointLight position={[-10, 0, 0]} intensity={0.6} color="#f59e0b" />
        <AwardTrophies />
      </Canvas>
    </div>
  );
}

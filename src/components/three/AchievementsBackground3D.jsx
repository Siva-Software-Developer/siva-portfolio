import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function AchievementPyramids() {
  const pyramids = useRef([]);

  useFrame(() => {
    pyramids.current.forEach((pyramid, i) => {
      if (pyramid) {
        pyramid.rotation.y += 0.003;
        pyramid.position.y += Math.sin(Date.now() * 0.0004 + i) * 0.01;
      }
    });
  });

  return (
    <>
      {[...Array(7)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh
            ref={(el) => (pyramids.current[i] = el)}
            position={[
              Math.cos((i / 7) * Math.PI * 2) * 6,
              Math.sin((i / 7) * Math.PI * 2) * 3,
              Math.cos((i / 7) * Math.PI * 2) * 2,
            ]}
          >
            <octahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#22d3ee" : "#06b6d4"}
              emissive={i % 2 === 0 ? "#22d3ee" : "#06b6d4"}
              emissiveIntensity={0.3}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function AchievementsBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, 0, 0]} intensity={0.6} color="#22d3ee" />
        <AchievementPyramids />
      </Canvas>
    </div>
  );
}

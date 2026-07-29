import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function OrbitingDots() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 4.5,
            Math.sin((i / 12) * Math.PI * 2) * 2.5,
            Math.sin((i / 12) * Math.PI * 2) * 4.5,
          ]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissive={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function AboutBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, 3, 3]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[5, -2, 2]} intensity={0.6} color="#a78bfa" />
        <OrbitingDots />
      </Canvas>
    </div>
  );
}
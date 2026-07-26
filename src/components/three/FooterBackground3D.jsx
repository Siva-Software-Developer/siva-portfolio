import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FooterGrid() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[(i % 5) * 4 - 8, Math.floor(i / 5) * 4 - 6, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissive={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FooterBackground3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full">
      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <FooterGrid />
      </Canvas>
    </div>
  );
}

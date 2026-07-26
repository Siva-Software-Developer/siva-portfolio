import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function SkillSpheres() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 8,
            Math.sin((i / 8) * Math.PI * 2) * 8,
            Math.cos((i / 8) * Math.PI * 2) * 3,
          ]}
        >
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            color={["#22d3ee", "#a78bfa", "#38bdf8", "#06b6d4", "#c084fc", "#0891b2", "#7c3aed", "#06b6d4"][i]}
            emissive={["#22d3ee", "#a78bfa", "#38bdf8", "#06b6d4", "#c084fc", "#0891b2", "#7c3aed", "#06b6d4"][i]}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, 0, 0]} intensity={0.6} color="#a78bfa" />
        <SkillSpheres />
      </Canvas>
    </div>
  );
}

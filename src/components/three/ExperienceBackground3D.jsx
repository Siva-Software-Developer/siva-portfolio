import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function TimelineHelix() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const points = [];
  for (let i = 0; i < 20; i++) {
    points.push([
      Math.cos((i / 20) * Math.PI * 2) * 6,
      (i - 10) * 0.8,
      Math.sin((i / 20) * Math.PI * 2) * 6,
    ]);
  }

  return (
    <group ref={group}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22d3ee" : "#c084fc"}
            emissive={i % 2 === 0 ? "#22d3ee" : "#c084fc"}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#22d3ee" transparent opacity={0.3} />
      </line>
    </group>
  );
}

export default function ExperienceBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TimelineHelix />
      </Canvas>
    </div>
  );
}

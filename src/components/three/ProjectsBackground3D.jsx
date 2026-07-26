import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function FloatingCubes() {
  const cubes = useRef([]);

  useFrame(() => {
    cubes.current.forEach((cube, i) => {
      if (cube) {
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.005;
        cube.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.01;
      }
    });
  });

  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.8} floatIntensity={2}>
          <mesh
            ref={(el) => (cubes.current[i] = el)}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 8,
              Math.sin((i / 6) * Math.PI * 2) * 4,
              Math.cos((i / 6) * Math.PI * 2) * 3,
            ]}
            scale={1.5}
          >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color={["#22d3ee", "#a78bfa", "#38bdf8", "#06b6d4", "#c084fc", "#ec4899"][i]}
              emissive={["#22d3ee", "#a78bfa", "#38bdf8", "#06b6d4", "#c084fc", "#ec4899"][i]}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.15}
              wireframe={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function ProjectsBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, 0, 0]} intensity={0.7} color="#a78bfa" />
        <pointLight position={[0, -10, 0]} intensity={0.6} color="#38bdf8" />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed, distort, scale, geometry = "icosahedron" }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
    }
  });

  const GeometryComponent = {
    icosahedron: () => <icosahedronGeometry args={[1, 4]} />,
    tetrahedron: () => <tetrahedronGeometry args={[1, 3]} />,
    octahedron: () => <octahedronGeometry args={[1, 3]} />,
    dodecahedron: () => <dodecahedronGeometry args={[1, 0]} />,
  }[geometry] || (() => <icosahedronGeometry args={[1, 4]} />);

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <GeometryComponent />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.15}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Torus({ position, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.5;
      meshRef.current.rotation.y += speed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.8, 0.3, 16, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.95}
        roughness={0.05}
        wireframe={false}
      />
    </mesh>
  );
}

function Scene() {
  const shapes = useMemo(
    () => [
      { position: [-2.5, 1, 0], color: "#22d3ee", speed: 0.3, distort: 0.35, scale: 1.2, geometry: "icosahedron" },
      { position: [2.8, -0.5, -1], color: "#a78bfa", speed: 0.25, distort: 0.4, scale: 1, geometry: "octahedron" },
      { position: [0, 1.5, -0.5], color: "#38bdf8", speed: 0.2, distort: 0.3, scale: 0.85, geometry: "tetrahedron" },
      { position: [-1.2, -1.2, 0.5], color: "#06b6d4", speed: 0.28, distort: 0.38, scale: 0.95, geometry: "dodecahedron" },
      { position: [1.5, 0.8, -1.2], color: "#c084fc", speed: 0.22, distort: 0.32, scale: 0.8, geometry: "icosahedron" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 3, 3]} intensity={1} color="#22d3ee" />
      <pointLight position={[4, -2, 2]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[0, 0, -5]} intensity={0.6} color="#38bdf8" />
      <Stars radius={60} depth={50} count={1500} factor={4} saturation={0.5} fade speed={0.5} />
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
      <Torus position={[0, 0, -2]} color="#22d3ee" speed={0.01} />
    </>
  );
}

export default function HeroScene3D() {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden glass-premium shadow-2xl shadow-cyan-500/10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

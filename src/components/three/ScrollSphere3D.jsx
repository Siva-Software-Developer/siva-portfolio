import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ScrollSphere() {
  const meshRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (groupRef.current) {
        groupRef.current.rotation.x = window.scrollY * 0.0005;
        groupRef.current.rotation.y = window.scrollY * 0.0008;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[3, 5]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a78bfa" />
    </group>
  );
}

export default function ScrollSphere3D() {
  return (
    <div className="w-full h-80 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <ScrollSphere />
      </Canvas>
    </div>
  );
}

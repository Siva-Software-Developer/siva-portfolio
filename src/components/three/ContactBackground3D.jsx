import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Stars({ count = 100 }) {
  const stars = useRef();

  useFrame(() => {
    if (stars.current) {
      stars.current.rotation.x += 0.0001;
      stars.current.rotation.y += 0.0001;
    }
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 60;
    positions[i + 1] = (Math.random() - 0.5) * 60;
    positions[i + 2] = (Math.random() - 0.5) * 60;
  }

  return (
    <group ref={stars}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial attach="material" color="#22d3ee" size={0.3} />
      </points>
    </group>
  );
}

function ContactOrb() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[3, 4]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function ContactBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, 10, 0]} intensity={0.5} color="#22d3ee" />
        <Stars count={150} />
        <ContactOrb />
      </Canvas>
    </div>
  );
}

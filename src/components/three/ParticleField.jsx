import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000 * 3; i += 3) {
      temp[i] = (Math.random() - 0.5) * 2000;
      temp[i + 1] = (Math.random() - 0.5) * 2000;
      temp[i + 2] = (Math.random() - 0.5) * 2000;
    }
    return temp;
  }, []);

  useFrame((_state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= 0.0001;
      meshRef.current.rotation.y -= 0.0002;
    }
  });

  return (
    <group ref={meshRef}>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={new THREE.Color("#22d3ee")}
          size={8}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 1500], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
}

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleSphere = () => {
  const meshRef = useRef<THREE.Points>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + (Math.random() - 0.5) * 0.3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.08;
      wireRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#ff6a00"
          wireframe
          transparent
          opacity={0.15}
          emissive="#ff3c00"
          emissiveIntensity={0.3}
        />
      </mesh>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ff7a18"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <pointLight position={[5, 5, 5]} color="#ff7a18" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#ff3c00" intensity={1} />
      <ambientLight intensity={0.1} />
    </group>
  );
};

const GlobeScene = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ParticleSphere />
      </Canvas>
    </div>
  );
};

export default GlobeScene;

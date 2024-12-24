import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

interface SignalEffectProps {
  start: Vector3;
  end: Vector3;
  progress: number;
}

export function SignalEffect({ start, end, progress }: SignalEffectProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const position = new Vector3().lerpVectors(
        new Vector3(...start),
        new Vector3(...end),
        progress
      );
      meshRef.current.position.copy(position);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
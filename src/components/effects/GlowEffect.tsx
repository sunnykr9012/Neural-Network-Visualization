import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

interface GlowEffectProps {
  color: string;
  intensity: number;
  pulse?: boolean;
}

export function GlowEffect({ color, intensity, pulse = false }: GlowEffectProps) {
  const glowRef = useRef<THREE.PointLight>(null);
  const baseIntensity = intensity;

  useFrame(({ clock }) => {
    if (glowRef.current && pulse) {
      const t = clock.getElapsedTime();
      glowRef.current.intensity = baseIntensity * (1 + Math.sin(t * 2) * 0.3);
    }
  });

  return <pointLight ref={glowRef} color={color} intensity={intensity} distance={2} />;
}
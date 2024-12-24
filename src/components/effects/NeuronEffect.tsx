import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

export function useNeuronEffect(isActive: boolean) {
  const colorRef = useRef(new Color('#4a90e2'));
  const targetColor = new Color(isActive ? '#ff4a4a' : '#4a90e2');
  
  useFrame(() => {
    colorRef.current.lerp(targetColor, 0.1);
  });

  return colorRef;
}
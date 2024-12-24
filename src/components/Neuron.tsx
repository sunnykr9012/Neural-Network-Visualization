import { useRef, useState } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useNeuronStore } from './store/neuronStore';
import { useNeuronEffect } from './effects/NeuronEffect';
import { GlowEffect } from './effects/GlowEffect';

interface NeuronProps {
  id: string;
  position: [number, number, number];
  selected?: boolean;
}

export function Neuron({ id, position, selected }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedNeuron, updateNeuronPosition } = useNeuronStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<Vector3 | null>(null);
  const colorRef = useNeuronEffect(selected || hovered);

  useFrame(() => {
    if (meshRef.current && (hovered || selected)) {
      meshRef.current.scale.lerp(new Vector3(1.2, 1.2, 1.2), 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.2, 16, 16]}
        onPointerDown={(e) => {
          e.stopPropagation();
          setSelectedNeuron(id);
          setIsDragging(true);
          dragStart.current = new Vector3().copy(e.point);
        }}
        onPointerUp={() => {
          setIsDragging(false);
          dragStart.current = null;
        }}
        onPointerMove={(e) => {
          if (isDragging && dragStart.current) {
            e.stopPropagation();
            const newPosition = new Vector3().copy(e.point);
            updateNeuronPosition(id, newPosition);
          }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={colorRef.current}
          emissive={colorRef.current}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.2}
        />
      </Sphere>
      {(selected || hovered) && (
        <GlowEffect
          color={selected ? "#ff4a4a" : "#4a90e2"}
          intensity={1.5}
          pulse={selected}
        />
      )}
    </group>
  );
}
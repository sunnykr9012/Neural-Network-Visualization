import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { bubbleSort, SortingStep } from '../algorithms/Sorting';

interface BarProps {
  value: number;
  index: number;
  isComparing: boolean;
  isSwapping: boolean;
}

function Bar({ value, index, isComparing, isSwapping }: BarProps) {
  const color = isSwapping ? '#ff4a4a' : isComparing ? '#4aff4a' : '#4a90e2';
  const height = value * 0.5;
  const position = [index * 0.5 - 2, height / 2 - 2, 0];

  return (
    <mesh position={position}>
      <boxGeometry args={[0.4, height, 0.4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function SortingVisualizer() {
  const [array] = useState(() => Array.from({ length: 10 }, () => Math.random() * 8));
  const [step, setStep] = useState<SortingStep>({ array, comparing: [-1, -1] });
  const sortGenerator = useRef(bubbleSort(array));

  useFrame(() => {
    const result = sortGenerator.current.next();
    if (!result.done) {
      setStep(result.value);
    }
  });

  return (
    <group position={[0, 0, 5]}>
      {step.array.map((value, index) => (
        <Bar
          key={index}
          value={value}
          index={index}
          isComparing={step.comparing.includes(index)}
          isSwapping={step.swapping?.includes(index) || false}
        />
      ))}
    </group>
  );
}
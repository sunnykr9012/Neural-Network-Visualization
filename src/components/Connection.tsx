import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
}

export function Connection({ start, end }: ConnectionProps) {
  return (
    <Line
      points={[new Vector3(...start), new Vector3(...end)]}
      color="#2a4d69"
      lineWidth={1}
      opacity={0.4}
      transparent
    />
  );
}
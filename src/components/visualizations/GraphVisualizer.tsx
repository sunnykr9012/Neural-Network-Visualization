import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GraphNode } from '../algorithms/types';
import { dijkstra, DijkstraStep } from '../algorithms/graph/DijkstraAlgorithm';

interface NodeVisualizerProps {
  node: GraphNode;
  position: [number, number, number];
  isVisited: boolean;
  isCurrent: boolean;
  distance: number;
}

function NodeVisualizer({ node, position, isVisited, isCurrent, distance }: NodeVisualizerProps) {
  let color = '#4a90e2';
  if (isCurrent) color = '#ff4a4a';
  else if (isVisited) color = '#4aff4a';

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={isCurrent ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.2}
        color="white"
      >
        {`${node.value} (${distance === Infinity ? '∞' : distance})`}
      </Text>
    </group>
  );
}

export function GraphVisualizer() {
  const [graph] = useState<Map<string, GraphNode>>(() => {
    const g = new Map<string, GraphNode>();
    g.set('1', { id: '1', value: 1, edges: ['2', '3'] });
    g.set('2', { id: '2', value: 2, edges: ['4'] });
    g.set('3', { id: '3', value: 3, edges: ['4'] });
    g.set('4', { id: '4', value: 4, edges: [] });
    return g;
  });

  const [step, setStep] = useState<DijkstraStep>({
    distances: new Map(),
    visited: new Set(),
    current: '1'
  });

  const dijkstraGenerator = useRef(dijkstra(graph, '1'));

  useFrame(() => {
    const result = dijkstraGenerator.current.next();
    if (!result.done) {
      setStep(result.value);
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {Array.from(graph.values()).map((node, index) => (
        <NodeVisualizer
          key={node.id}
          node={node}
          position={[
            2 * Math.cos(index * Math.PI * 0.5),
            2 * Math.sin(index * Math.PI * 0.5),
            0
          ]}
          isVisited={step.visited.has(node.id)}
          isCurrent={step.current === node.id}
          distance={step.distances.get(node.id) ?? Infinity}
        />
      ))}
    </group>
  );
}
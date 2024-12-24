import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { TreeNode } from '../algorithms/types';
import { inorderTraversal, TraversalStep } from '../algorithms/tree/BinaryTreeTraversals';

interface NodeVisualizerProps {
  node: TreeNode;
  position: [number, number, number];
  isHighlighted: boolean;
}

function NodeVisualizer({ node, position, isHighlighted }: NodeVisualizerProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={isHighlighted ? '#ff4a4a' : '#4a90e2'}
          emissive={isHighlighted ? '#ff4a4a' : '#4a90e2'}
          emissiveIntensity={isHighlighted ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.2}
        color="white"
      >
        {node.value.toString()}
      </Text>
    </group>
  );
}

export function TreeVisualizer() {
  const [tree] = useState<TreeNode>({
    id: '1',
    value: 5,
    left: { id: '2', value: 3 },
    right: { id: '3', value: 7 }
  });
  
  const [currentStep, setCurrentStep] = useState<TraversalStep | null>(null);
  const traversalGenerator = useRef(inorderTraversal(tree));
  
  useFrame(() => {
    const result = traversalGenerator.current.next();
    if (!result.done) {
      setCurrentStep(result.value);
    }
  });

  return (
    <group position={[0, 2, 0]}>
      <NodeVisualizer
        node={tree}
        position={[0, 0, 0]}
        isHighlighted={currentStep?.node.id === tree.id}
      />
      {tree.left && (
        <>
          <line>
            <bufferGeometry />
            <lineBasicMaterial color="#4a90e2" />
          </line>
          <NodeVisualizer
            node={tree.left}
            position={[-2, -2, 0]}
            isHighlighted={currentStep?.node.id === tree.left.id}
          />
        </>
      )}
      {tree.right && (
        <>
          <line>
            <bufferGeometry />
            <lineBasicMaterial color="#4a90e2" />
          </line>
          <NodeVisualizer
            node={tree.right}
            position={[2, -2, 0]}
            isHighlighted={currentStep?.node.id === tree.right.id}
          />
        </>
      )}
    </group>
  );
}
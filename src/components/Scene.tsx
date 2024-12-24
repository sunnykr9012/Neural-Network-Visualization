import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NeuralNetwork } from './NeuralNetwork';
import { BackgroundEffect } from './effects/BackgroundEffect';
import { SortingVisualizer } from './visualizations/SortingVisualizer';
import { TreeVisualizer } from './visualizations/TreeVisualizer';
import { GraphVisualizer } from './visualizations/GraphVisualizer';

export function Scene() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [8, 5, 8] }}>
        <BackgroundEffect />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <NeuralNetwork />
        <SortingVisualizer />
        <TreeVisualizer />
        <GraphVisualizer />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
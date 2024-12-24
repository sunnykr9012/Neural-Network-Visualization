import React from 'react';
import { Scene } from './components/Scene';
import { NodeEditor } from './components/editor/NodeEditor';
import { Brain } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="absolute top-0 left-0 z-10 p-4 text-white">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6" />
          <h1 className="text-xl font-bold">Neural Network Visualization</h1>
        </div>
        <p className="mt-2 text-sm text-gray-300">
          Interactive 3D visualization of a neural network architecture
        </p>
      </div>
      <NodeEditor />
      <Scene />
    </div>
  );
}
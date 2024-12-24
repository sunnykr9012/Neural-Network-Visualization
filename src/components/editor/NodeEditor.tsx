import React from 'react';
import { PlusCircle, MinusCircle, Edit2 } from 'lucide-react';
import { useNodeStore } from '../store/nodeStore';

export function NodeEditor() {
  const { selectedNode, updateNodeValue, addChildNode, removeNode } = useNodeStore();

  if (!selectedNode) return null;

  return (
    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-3">Edit Node</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Edit2 className="w-4 h-4" />
          <input
            type="number"
            value={selectedNode.value}
            onChange={(e) => updateNodeValue(selectedNode.id, Number(e.target.value))}
            className="bg-white/20 px-2 py-1 rounded w-20"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => addChildNode(selectedNode.id)}
            className="flex items-center space-x-1 bg-green-500/20 hover:bg-green-500/30 px-3 py-1 rounded"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Child</span>
          </button>

          <button
            onClick={() => removeNode(selectedNode.id)}
            className="flex items-center space-x-1 bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded"
          >
            <MinusCircle className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
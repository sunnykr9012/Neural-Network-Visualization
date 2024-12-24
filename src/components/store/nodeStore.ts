import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { TreeNode } from '../types';

interface NodeStore {
  nodes: Map<string, TreeNode>;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
  updateNodeValue: (id: string, value: number) => void;
  addChildNode: (parentId: string) => void;
  removeNode: (id: string) => void;
}

export const useNodeStore = create<NodeStore>((set, get) => ({
  nodes: new Map([
    ['root', { id: 'root', value: 5, left: null, right: null }]
  ]),
  selectedNode: null,

  setSelectedNode: (node) => set({ selectedNode: node }),

  updateNodeValue: (id, value) => set((state) => {
    const nodes = new Map(state.nodes);
    const node = nodes.get(id);
    if (node) {
      nodes.set(id, { ...node, value });
    }
    return { nodes };
  }),

  addChildNode: (parentId) => set((state) => {
    const nodes = new Map(state.nodes);
    const parent = nodes.get(parentId);
    
    if (parent) {
      const newNodeId = uuidv4();
      const newNode = { id: newNodeId, value: 0, left: null, right: null };
      
      nodes.set(newNodeId, newNode);
      
      if (!parent.left) {
        nodes.set(parentId, { ...parent, left: newNode });
      } else if (!parent.right) {
        nodes.set(parentId, { ...parent, right: newNode });
      }
    }
    
    return { nodes };
  }),

  removeNode: (id) => set((state) => {
    const nodes = new Map(state.nodes);
    
    // Find parent node
    let parentNode: TreeNode | null = null;
    for (const node of nodes.values()) {
      if (node.left?.id === id || node.right?.id === id) {
        parentNode = node;
        break;
      }
    }
    
    if (parentNode) {
      if (parentNode.left?.id === id) {
        nodes.set(parentNode.id, { ...parentNode, left: null });
      } else if (parentNode.right?.id === id) {
        nodes.set(parentNode.id, { ...parentNode, right: null });
      }
      nodes.delete(id);
    }
    
    return { nodes, selectedNode: null };
  })
}));
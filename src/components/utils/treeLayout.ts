import { TreeNode } from '../types';

interface NodePosition {
  x: number;
  y: number;
  z: number;
}

export function calculateNodePosition(
  node: TreeNode,
  level: number = 0,
  index: number = 0,
  spacing: number = 2
): NodePosition {
  return {
    x: index * spacing,
    y: -level * spacing,
    z: 0
  };
}

export function layoutTree(root: TreeNode): Map<string, NodePosition> {
  const positions = new Map<string, NodePosition>();
  let currentIndex = 0;

  function traverse(node: TreeNode | null, level: number = 0) {
    if (!node) return;

    positions.set(node.id, calculateNodePosition(node, level, currentIndex));
    currentIndex++;

    if (node.left) traverse(node.left, level + 1);
    if (node.right) traverse(node.right, level + 1);
  }

  traverse(root);
  return positions;
}
export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

export interface GraphNode {
  id: string;
  value: number;
  edges: string[];
}

export interface SortingStep {
  array: number[];
  comparing: [number, number];
  swapping?: [number, number];
}

export interface TraversalStep {
  node: TreeNode;
  type: 'pre' | 'in' | 'post';
}

export interface DijkstraStep {
  distances: Map<string, number>;
  visited: Set<string>;
  current: string;
}
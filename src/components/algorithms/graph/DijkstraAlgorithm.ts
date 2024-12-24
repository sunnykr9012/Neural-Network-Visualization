import { GraphNode } from '../types';

export interface DijkstraStep {
  distances: Map<string, number>;
  visited: Set<string>;
  current: string;
}

export function* dijkstra(
  graph: Map<string, GraphNode>,
  start: string
): Generator<DijkstraStep> {
  const distances = new Map<string, number>();
  const visited = new Set<string>();

  // Initialize distances
  graph.forEach((_, nodeId) => {
    distances.set(nodeId, nodeId === start ? 0 : Infinity);
  });

  while (visited.size < graph.size) {
    // Find closest unvisited node
    let minDistance = Infinity;
    let current = '';
    
    distances.forEach((dist, node) => {
      if (!visited.has(node) && dist < minDistance) {
        minDistance = dist;
        current = node;
      }
    });

    if (minDistance === Infinity) break;
    
    visited.add(current);
    const currentNode = graph.get(current);
    
    if (currentNode) {
      currentNode.edges.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          const newDist = distances.get(current)! + 1; // Using 1 as edge weight
          if (newDist < distances.get(neighbor)!) {
            distances.set(neighbor, newDist);
          }
        }
      });
    }

    yield { distances: new Map(distances), visited: new Set(visited), current };
  }
}
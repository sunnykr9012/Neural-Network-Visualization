import { Neuron } from '../types';

export type ActivationFunction = 'relu' | 'sigmoid' | 'tanh';

export function calculateNeuronOutput(
  inputs: number[],
  weights: number[],
  bias: number,
  activation: ActivationFunction
): number {
  const sum = inputs.reduce((acc, input, i) => acc + input * weights[i], 0) + bias;
  
  switch (activation) {
    case 'relu':
      return Math.max(0, sum);
    case 'sigmoid':
      return 1 / (1 + Math.exp(-sum));
    case 'tanh':
      return Math.tanh(sum);
    default:
      return sum;
  }
}

export function propagateSignal(
  neurons: Map<string, Neuron>,
  startId: string,
  callback: (sourceId: string, targetId: string) => void
) {
  const visited = new Set<string>();
  
  function traverse(neuronId: string) {
    if (visited.has(neuronId)) return;
    visited.add(neuronId);
    
    const neuron = neurons.get(neuronId);
    if (!neuron) return;
    
    neuron.connections.forEach(targetId => {
      callback(neuronId, targetId);
      traverse(targetId);
    });
  }
  
  traverse(startId);
}
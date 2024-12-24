import { Vector3 } from 'three';

export interface Neuron {
  id: string;
  position: [number, number, number];
  connections: string[];
  selected?: boolean;
}

export interface Connection {
  source: [number, number, number];
  target: [number, number, number];
}

export interface NeuronStore {
  neurons: Map<string, Neuron>;
  selectedNeuron: string | null;
  setSelectedNeuron: (id: string | null) => void;
  updateNeuronPosition: (id: string, position: Vector3) => void;
}
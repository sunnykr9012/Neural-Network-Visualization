import { create } from 'zustand';
import { Vector3 } from 'three';
import { NeuronStore } from '../types';
import { generateNetwork } from '../utils/networkGenerator';
import { propagateSignal } from '../algorithms/NetworkOperations';

interface Signal {
  sourceId: string;
  targetId: string;
  progress: number;
}

const initialNeurons = generateNetwork();
const neuronsMap = new Map(initialNeurons.map(n => [n.id, n]));

export const useNeuronStore = create<NeuronStore>((set, get) => ({
  neurons: neuronsMap,
  selectedNeuron: null,
  activeSignals: new Map<string, Signal>(),
  
  setSelectedNeuron: (id) => {
    set({ selectedNeuron: id });
    if (id) {
      const { neurons } = get();
      propagateSignal(neurons, id, (sourceId, targetId) => {
        const signalId = `${sourceId}-${targetId}`;
        get().addSignal(signalId, sourceId, targetId);
      });
    }
  },
  
  updateNeuronPosition: (id, position) => 
    set((state) => {
      const neurons = new Map(state.neurons);
      const neuron = neurons.get(id);
      if (neuron) {
        neurons.set(id, {
          ...neuron,
          position: [position.x, position.y, position.z]
        });
      }
      return { neurons };
    }),
    
  addSignal: (id: string, sourceId: string, targetId: string) =>
    set((state) => ({
      activeSignals: new Map(state.activeSignals).set(id, {
        sourceId,
        targetId,
        progress: 0
      })
    })),
    
  updateSignals: () =>
    set((state) => {
      const newSignals = new Map(state.activeSignals);
      newSignals.forEach((signal, id) => {
        if (signal.progress >= 1) {
          newSignals.delete(id);
        } else {
          newSignals.set(id, {
            ...signal,
            progress: signal.progress + 0.02
          });
        }
      });
      return { activeSignals: newSignals };
    })
}));
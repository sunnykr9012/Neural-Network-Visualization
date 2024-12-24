import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Neuron } from './Neuron';
import { Connection } from './Connection';
import { SignalEffect } from './effects/SignalEffect';
import { useNeuronStore } from './store/neuronStore';

export function NeuralNetwork() {
  const groupRef = useRef<Group>(null);
  const { neurons, selectedNeuron, activeSignals, updateSignals } = useNeuronStore();

  useFrame((state) => {
    if (groupRef.current && !selectedNeuron) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    updateSignals();
  });

  return (
    <group ref={groupRef}>
      {Array.from(neurons.values()).map((neuron) => (
        <group key={neuron.id}>
          <Neuron
            id={neuron.id}
            position={neuron.position}
            selected={neuron.id === selectedNeuron}
          />
          
          {neuron.connections.map((targetId) => {
            const targetNeuron = neurons.get(targetId);
            if (!targetNeuron) return null;
            
            return (
              <Connection
                key={`${neuron.id}-${targetId}`}
                start={neuron.position}
                end={targetNeuron.position}
              />
            );
          })}
        </group>
      ))}
      
      {Array.from(activeSignals.values()).map((signal) => {
        const source = neurons.get(signal.sourceId);
        const target = neurons.get(signal.targetId);
        if (!source || !target) return null;
        
        return (
          <SignalEffect
            key={`${signal.sourceId}-${signal.targetId}`}
            start={source.position}
            end={target.position}
            progress={signal.progress}
          />
        );
      })}
    </group>
  );
}
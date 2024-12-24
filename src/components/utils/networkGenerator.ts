import { Neuron } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateNetwork = (): Neuron[] => {
  const layers = [4, 6, 6, 2];
  const neurons: Neuron[] = [];
  const neuronIds: string[] = [];

  layers.forEach((layerSize, layerIndex) => {
    const layerZ = (layerIndex - (layers.length - 1) / 2) * 2;
    
    for (let i = 0; i < layerSize; i++) {
      const y = (i - (layerSize - 1) / 2) * 1.5;
      const id = uuidv4();
      neuronIds.push(id);
      
      neurons.push({
        id,
        position: [0, y, layerZ],
        connections: []
      });
    }
  });

  // Add connections after all neurons are created
  let currentIndex = 0;
  layers.forEach((layerSize, layerIndex) => {
    if (layerIndex < layers.length - 1) {
      for (let i = 0; i < layerSize; i++) {
        const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((a, b) => a + b, 0);
        for (let j = 0; j < layers[layerIndex + 1]; j++) {
          neurons[currentIndex].connections.push(neuronIds[nextLayerStart + j]);
        }
        currentIndex++;
      }
    }
  });

  return neurons;
};
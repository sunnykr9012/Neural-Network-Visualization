export type SortingAlgorithm = 'bubble' | 'quick' | 'merge';

export interface SortingStep {
  array: number[];
  comparing: [number, number];
  swapping?: [number, number];
}

export function* bubbleSort(array: number[]): Generator<SortingStep> {
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { array: [...arr], comparing: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { array: [...arr], comparing: [j, j + 1], swapping: [j, j + 1] };
      }
    }
  }
  return { array: arr, comparing: [-1, -1] };
}
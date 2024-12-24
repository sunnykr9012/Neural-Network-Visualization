export interface QuickSortStep {
  array: number[];
  pivot: number;
  comparing: [number, number];
  swapping?: [number, number];
}

export function* quickSort(
  array: number[],
  start = 0,
  end = array.length - 1
): Generator<QuickSortStep> {
  if (start >= end) return;

  const pivot = array[end];
  let i = start - 1;

  for (let j = start; j < end; j++) {
    yield { array: [...array], pivot, comparing: [j, end] };
    
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      if (i !== j) {
        yield { array: [...array], pivot, comparing: [j, end], swapping: [i, j] };
      }
    }
  }

  [array[i + 1], array[end]] = [array[end], array[i + 1]];
  yield { array: [...array], pivot, comparing: [i + 1, end], swapping: [i + 1, end] };

  yield* quickSort(array, start, i);
  yield* quickSort(array, i + 2, end);
}
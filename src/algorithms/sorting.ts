import { ExecutionStep } from '../types';

export function generateBubbleSortSteps(initialArray: number[]): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];
  const sortedSet = new Set<number>();

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 2, cpp: 2, python: 2 },
    variables: { n },
    explanation: `Initialize Bubble Sort on ${n} elements.`,
  });

  if (n <= 1) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: n === 1 ? [0] : [],
      activeCodeLine: { java: 15, cpp: 13, python: 10 },
      variables: { n },
      explanation: 'Array is trivially sorted.',
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from(sortedSet),
      activeCodeLine: { java: 3, cpp: 3, python: 3 },
      variables: { n, i, swapped: 'false' },
      explanation: `Pass ${i + 1}: scan indices 0 through ${n - i - 1}.`,
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 6, cpp: 6, python: 6 },
        variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1], swapped: String(swapped) },
        explanation: `Compare arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]}).`,
      });

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          array: [...arr],
          activeIndices: [],
          swappingIndices: [j, j + 1],
          sortedIndices: Array.from(sortedSet),
          activeCodeLine: { java: 8, cpp: 7, python: 7 },
          variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1], swapped: 'true' },
          explanation: `Swap indices ${j} and ${j + 1} (${arr[j + 1]} ↔ ${arr[j]}).`,
        });
      }
    }

    sortedSet.add(n - 1 - i);

    if (!swapped) {
      for (let k = 0; k < n; k++) sortedSet.add(k);
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 13, cpp: 11, python: 10 },
        variables: { i, swapped: 'false' },
        explanation: `No swaps occurred during pass ${i + 1}; array is sorted early.`,
      });
      return steps;
    }
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from(sortedSet),
    activeCodeLine: { java: 15, cpp: 13, python: 10 },
    variables: { n },
    explanation: 'Bubble Sort complete. All elements are in sorted order.',
  });

  return steps;
}

export function generateSelectionSortSteps(initialArray: number[]): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];
  const sortedSet = new Set<number>();

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 2, cpp: 2, python: 2 },
    variables: { n },
    explanation: `Initialize Selection Sort on ${n} elements.`,
  });

  if (n <= 1) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: n === 1 ? [0] : [],
      activeCodeLine: { java: 16, cpp: 14, python: 9 },
      variables: { n },
      explanation: 'Array is trivially sorted.',
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      array: [...arr],
      activeIndices: [minIdx],
      swappingIndices: [],
      sortedIndices: Array.from(sortedSet),
      activeCodeLine: { java: 4, cpp: 4, python: 4 },
      variables: { i, minIdx, 'arr[minIdx]': arr[minIdx] },
      explanation: `Start pass at i = ${i}; assume minimum is arr[${minIdx}] = ${arr[minIdx]}.`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, minIdx],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 6, cpp: 6, python: 6 },
        variables: { i, j, minIdx, 'arr[j]': arr[j], 'arr[minIdx]': arr[minIdx] },
        explanation: `Compare arr[${j}] (${arr[j]}) < current min arr[${minIdx}] (${arr[minIdx]}).`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          activeIndices: [minIdx],
          swappingIndices: [],
          sortedIndices: Array.from(sortedSet),
          activeCodeLine: { java: 7, cpp: 7, python: 7 },
          variables: { i, j, minIdx, 'arr[minIdx]': arr[minIdx] },
          explanation: `New minimum found at index ${minIdx} (${arr[minIdx]}).`,
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
      sortedSet.add(i);

      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [i, minIdx],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 12, cpp: 11, python: 9 },
        variables: { i, minIdx, 'arr[i]': arr[i], 'arr[minIdx]': arr[minIdx] },
        explanation: `Swap minimum arr[${minIdx}] into position ${i} (${arr[minIdx]} ↔ ${arr[i]}).`,
      });
    } else {
      sortedSet.add(i);
      steps.push({
        array: [...arr],
        activeIndices: [i],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 10, cpp: 10, python: 8 },
        variables: { i, minIdx },
        explanation: `Index ${i} (${arr[i]}) is already the minimum; no swap needed.`,
      });
    }
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from(sortedSet),
    activeCodeLine: { java: 16, cpp: 14, python: 9 },
    variables: { n },
    explanation: 'Selection Sort complete. All elements are sorted.',
  });

  return steps;
}

export function generateInsertionSortSteps(initialArray: number[]): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: n > 0 ? [0] : [],
    activeCodeLine: { java: 2, cpp: 2, python: 2 },
    variables: { n },
    explanation: `Initialize Insertion Sort on ${n} elements. Index 0 starts as a 1-element sorted prefix.`,
  });

  if (n <= 1) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: n === 1 ? [0] : [],
      activeCodeLine: { java: 12, cpp: 12, python: 9 },
      variables: { n },
      explanation: 'Array is trivially sorted.',
    });
    return steps;
  }

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    const prefixSorted = Array.from({ length: i }, (_, idx) => idx);

    steps.push({
      array: [...arr],
      activeIndices: [i],
      swappingIndices: [],
      sortedIndices: prefixSorted,
      activeCodeLine: { java: 4, cpp: 4, python: 4 },
      variables: { i, j, key },
      explanation: `Select key = arr[${i}] (${key}) to insert into sorted prefix [0..${i - 1}].`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: prefixSorted,
        activeCodeLine: { java: 6, cpp: 6, python: 6 },
        variables: { i, j, key, 'arr[j]': arr[j] },
        explanation: `arr[${j}] (${arr[j]}) > key (${key}); shift ${arr[j]} right to index ${j + 1}.`,
      });

      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [j, j + 1],
        sortedIndices: prefixSorted,
        activeCodeLine: { java: 7, cpp: 7, python: 7 },
        variables: { i, j, key, 'arr[j+1]': arr[j + 1] },
        explanation: `Shifted ${arr[j + 1]} from index ${j} to ${j + 1}.`,
      });
      j--;
    }

    arr[j + 1] = key;
    const newPrefixSorted = Array.from({ length: i + 1 }, (_, idx) => idx);

    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [j + 1],
      sortedIndices: newPrefixSorted,
      activeCodeLine: { java: 10, cpp: 10, python: 9 },
      variables: { i, j, key, insertIdx: j + 1 },
      explanation: `Insert key (${key}) at index ${j + 1}. Prefix [0..${i}] is now sorted.`,
    });
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    activeCodeLine: { java: 12, cpp: 12, python: 9 },
    variables: { n },
    explanation: 'Insertion Sort complete. All elements are sorted.',
  });

  return steps;
}

export function generateMergeSortSteps(initialArray: number[]): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 1, cpp: 1, python: 1 },
    variables: { l: 0, r: Math.max(0, n - 1), n },
    explanation: `Initialize Merge Sort over range [0..${Math.max(0, n - 1)}].`,
  });

  if (n <= 1) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: n === 1 ? [0] : [],
      activeCodeLine: { java: 2, cpp: 2, python: 2 },
      variables: { l: 0, r: 0 },
      explanation: 'Base case reached: array is sorted.',
    });
    return steps;
  }

  function mergeSortHelper(l: number, r: number) {
    if (l >= r) {
      return;
    }
    const mid = l + Math.floor((r - l) / 2);

    steps.push({
      array: [...arr],
      activeIndices: Array.from({ length: r - l + 1 }, (_, k) => l + k),
      swappingIndices: [],
      sortedIndices: [],
      pivotOrMidIndex: mid,
      activeCodeLine: { java: 3, cpp: 3, python: 3 },
      variables: { l, mid, r },
      explanation: `Split range [${l}..${r}] at midpoint mid = ${mid}.`,
    });

    mergeSortHelper(l, mid);
    mergeSortHelper(mid + 1, r);

    steps.push({
      array: [...arr],
      activeIndices: Array.from({ length: r - l + 1 }, (_, k) => l + k),
      swappingIndices: [],
      sortedIndices: [],
      pivotOrMidIndex: mid,
      activeCodeLine: { java: 6, cpp: 6, python: 6 },
      variables: { l, mid, r },
      explanation: `Merge sorted subarrays [${l}..${mid}] and [${mid + 1}..${r}].`,
    });

    const temp: number[] = [];
    let i = l;
    let j = mid + 1;

    while (i <= mid && j <= r) {
      steps.push({
        array: [...arr],
        activeIndices: [i, j],
        swappingIndices: [],
        sortedIndices: [],
        pivotOrMidIndex: mid,
        activeCodeLine: { java: 11, cpp: 11, python: 10 },
        variables: { l, mid, r, i, j, 'arr[i]': arr[i], 'arr[j]': arr[j] },
        explanation: `Compare arr[${i}] (${arr[i]}) ≤ arr[${j}] (${arr[j]}).`,
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        steps.push({
          array: [...arr],
          activeIndices: [i],
          swappingIndices: [],
          sortedIndices: [],
          activeCodeLine: { java: 12, cpp: 12, python: 12 },
          variables: { i, j, picked: arr[i], tempLen: temp.length },
          explanation: `Buffer arr[${i}] (${arr[i]}) into temp[${temp.length - 1}].`,
        });
        i++;
      } else {
        temp.push(arr[j]);
        steps.push({
          array: [...arr],
          activeIndices: [j],
          swappingIndices: [],
          sortedIndices: [],
          activeCodeLine: { java: 13, cpp: 13, python: 14 },
          variables: { i, j, picked: arr[j], tempLen: temp.length },
          explanation: `Buffer arr[${j}] (${arr[j]}) into temp[${temp.length - 1}].`,
        });
        j++;
      }
    }

    while (i <= mid) {
      temp.push(arr[i]);
      steps.push({
        array: [...arr],
        activeIndices: [i],
        swappingIndices: [],
        sortedIndices: [],
        activeCodeLine: { java: 15, cpp: 15, python: 15 },
        variables: { i, picked: arr[i], tempLen: temp.length },
        explanation: `Drain remaining left element arr[${i}] (${arr[i]}) into temp.`,
      });
      i++;
    }

    while (j <= r) {
      temp.push(arr[j]);
      steps.push({
        array: [...arr],
        activeIndices: [j],
        swappingIndices: [],
        sortedIndices: [],
        activeCodeLine: { java: 16, cpp: 16, python: 16 },
        variables: { j, picked: arr[j], tempLen: temp.length },
        explanation: `Drain remaining right element arr[${j}] (${arr[j]}) into temp.`,
      });
      j++;
    }

    const isFullMerge = l === 0 && r === n - 1;
    for (let p = 0; p < temp.length; p++) {
      arr[l + p] = temp[p];
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [l + p],
        sortedIndices: isFullMerge ? Array.from({ length: p + 1 }, (_, k) => k) : [],
        activeCodeLine: { java: 17, cpp: 17, python: 17 },
        variables: { p, targetIdx: l + p, value: temp[p] },
        explanation: `Write merged value ${temp[p]} back to arr[${l + p}].`,
      });
    }
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    activeCodeLine: { java: 7, cpp: 7, python: 6 },
    variables: { n },
    explanation: 'Merge Sort complete. All subarrays merged into sorted order.',
  });

  return steps;
}

export function generateQuickSortSteps(initialArray: number[]): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];
  const sortedSet = new Set<number>();

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 1, cpp: 1, python: 1 },
    variables: { low: 0, high: Math.max(0, n - 1), n },
    explanation: `Initialize Quick Sort over range [0..${Math.max(0, n - 1)}].`,
  });

  if (n <= 1) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: n === 1 ? [0] : [],
      activeCodeLine: { java: 2, cpp: 2, python: 2 },
      variables: { low: 0, high: 0 },
      explanation: 'Base case reached: array is sorted.',
    });
    return steps;
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from(sortedSet),
      pivotOrMidIndex: high,
      activeCodeLine: { java: 9, cpp: 9, python: 7 },
      variables: { low, high, pivot, i },
      explanation: `Partition [${low}..${high}] using pivot arr[${high}] = ${pivot}.`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        pivotOrMidIndex: high,
        activeCodeLine: { java: 12, cpp: 12, python: 10 },
        variables: { low, high, pivot, i, j, 'arr[j]': arr[j] },
        explanation: `Compare arr[${j}] (${arr[j]}) ≤ pivot (${pivot}).`,
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: [...arr],
            activeIndices: [],
            swappingIndices: [i, j],
            sortedIndices: Array.from(sortedSet),
            pivotOrMidIndex: high,
            activeCodeLine: { java: 14, cpp: 14, python: 12 },
            variables: { i, j, pivot, 'arr[i]': arr[i], 'arr[j]': arr[j] },
            explanation: `Increment i = ${i} and swap arr[${i}] ↔ arr[${j}] (${arr[j]} ↔ ${arr[i]}).`,
          });
        } else {
          steps.push({
            array: [...arr],
            activeIndices: [i],
            swappingIndices: [],
            sortedIndices: Array.from(sortedSet),
            pivotOrMidIndex: high,
            activeCodeLine: { java: 14, cpp: 14, python: 12 },
            variables: { i, j, pivot, 'arr[i]': arr[i] },
            explanation: `Increment i = ${i}; arr[${i}] (${arr[i]}) stays in left partition.`,
          });
        }
      }
    }

    const pi = i + 1;
    if (pi !== high) {
      const temp = arr[pi];
      arr[pi] = arr[high];
      arr[high] = temp;
    }
    sortedSet.add(pi);

    steps.push({
      array: [...arr],
      activeIndices: [],
      swappingIndices: pi !== high ? [pi, high] : [],
      sortedIndices: Array.from(sortedSet),
      pivotOrMidIndex: pi,
      activeCodeLine: { java: 17, cpp: 17, python: 13 },
      variables: { pi, pivot: arr[pi], high },
      explanation: `Place pivot ${arr[pi]} at final index ${pi}.`,
    });

    return pi;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      steps.push({
        array: [...arr],
        activeIndices: Array.from({ length: high - low + 1 }, (_, k) => low + k),
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 3, cpp: 3, python: 3 },
        variables: { low, high },
        explanation: `Call partition on subarray [${low}..${high}].`,
      });

      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high && low >= 0 && low < n) {
      sortedSet.add(low);
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from(sortedSet),
        activeCodeLine: { java: 2, cpp: 2, python: 2 },
        variables: { low, high },
        explanation: `Single element at index ${low} (${arr[low]}) is in final position.`,
      });
    }
  }

  quickSortHelper(0, n - 1);

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from(sortedSet),
    activeCodeLine: { java: 7, cpp: 7, python: 5 },
    variables: { n },
    explanation: 'Quick Sort complete. All elements are sorted.',
  });

  return steps;
}

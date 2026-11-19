import { ExecutionStep } from '../types';

export function generateLinearSearchSteps(
  initialArray: number[],
  target: number
): ExecutionStep[] {
  const arr = [...initialArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 2, cpp: 2, python: 2 },
    variables: { target, n },
    explanation: `Begin Linear Search for target = ${target} across ${n} elements.`,
  });

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...arr],
      activeIndices: [i],
      swappingIndices: [],
      sortedIndices: [],
      activeCodeLine: { java: 3, cpp: 3, python: 3 },
      variables: { target, i, 'arr[i]': arr[i] },
      explanation: `Check index ${i}: does arr[${i}] (${arr[i]}) equal target (${target})?`,
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [],
        sortedIndices: [i],
        activeCodeLine: { java: 4, cpp: 4, python: 4 },
        variables: { target, i, foundAt: i },
        explanation: `Match found! Target ${target} located at index ${i}.`,
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 7, cpp: 7, python: 5 },
    variables: { target, result: -1 },
    explanation: `Target ${target} is not present in the array. Return -1.`,
  });

  return steps;
}

export function generateBinarySearchSteps(
  sortedArray: number[],
  target: number
): ExecutionStep[] {
  const arr = [...sortedArray];
  const n = arr.length;
  const steps: ExecutionStep[] = [];

  let left = 0;
  let right = n - 1;

  steps.push({
    array: [...arr],
    activeIndices: n > 0 ? [left, right] : [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 2, cpp: 2, python: 2 },
    variables: { target, left, right },
    explanation: `Initialize Binary Search for target = ${target} over sorted range [${left}..${right}].`,
  });

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    steps.push({
      array: [...arr],
      activeIndices: [left, right],
      swappingIndices: [],
      sortedIndices: [],
      pivotOrMidIndex: mid,
      activeCodeLine: { java: 4, cpp: 4, python: 4 },
      variables: { target, left, right, mid, 'arr[mid]': arr[mid] },
      explanation: `Compute midpoint mid = ${mid} with value arr[${mid}] = ${arr[mid]}.`,
    });

    steps.push({
      array: [...arr],
      activeIndices: [mid],
      swappingIndices: [],
      sortedIndices: [],
      pivotOrMidIndex: mid,
      activeCodeLine: { java: 5, cpp: 5, python: 5 },
      variables: { target, left, right, mid, 'arr[mid]': arr[mid] },
      explanation: `Compare arr[${mid}] (${arr[mid]}) with target (${target}).`,
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        activeIndices: [],
        swappingIndices: [],
        sortedIndices: [mid],
        activeCodeLine: { java: 6, cpp: 6, python: 6 },
        variables: { target, mid, foundAt: mid },
        explanation: `Match found! Target ${target} located at index ${mid}.`,
      });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...arr],
        activeIndices: left <= right ? [left, right] : [],
        swappingIndices: [],
        sortedIndices: [],
        pivotOrMidIndex: mid,
        activeCodeLine: { java: 8, cpp: 8, python: 8 },
        variables: { target, left, right, mid },
        explanation: `arr[${mid}] (${arr[mid]}) < ${target}; narrow search to right half [${left}..${right}].`,
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...arr],
        activeIndices: left <= right ? [left, right] : [],
        swappingIndices: [],
        sortedIndices: [],
        pivotOrMidIndex: mid,
        activeCodeLine: { java: 10, cpp: 10, python: 10 },
        variables: { target, left, right, mid },
        explanation: `arr[${mid}] (${arr[mid]}) > ${target}; narrow search to left half [${left}..${right}].`,
      });
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    activeCodeLine: { java: 13, cpp: 13, python: 11 },
    variables: { target, left, right, result: -1 },
    explanation: `Search interval exhausted (left > right). Target ${target} not found; return -1.`,
  });

  return steps;
}

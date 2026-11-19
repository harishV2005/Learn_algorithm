import { AlgorithmId, ExecutionStep } from '../types';
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateSelectionSortSteps,
} from './sorting';
import { generateBinarySearchSteps, generateLinearSearchSteps } from './searching';

export function isArraySortedAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

export function generateAlgorithmSteps(
  algorithmId: AlgorithmId,
  inputArray: number[],
  target: number
): { steps: ExecutionStep[]; effectiveArray: number[]; wasAutoSorted: boolean } {
  const safeArray = inputArray.length > 0 ? [...inputArray] : [29, 10, 14, 37, 13, 22, 8];

  if (algorithmId === 'binary') {
    const sorted = isArraySortedAscending(safeArray);
    const effectiveArray = sorted ? [...safeArray] : [...safeArray].sort((a, b) => a - b);
    return {
      steps: generateBinarySearchSteps(effectiveArray, target),
      effectiveArray,
      wasAutoSorted: !sorted,
    };
  }

  switch (algorithmId) {
    case 'bubble':
      return {
        steps: generateBubbleSortSteps(safeArray),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
    case 'selection':
      return {
        steps: generateSelectionSortSteps(safeArray),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
    case 'insertion':
      return {
        steps: generateInsertionSortSteps(safeArray),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
    case 'merge':
      return {
        steps: generateMergeSortSteps(safeArray),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
    case 'quick':
      return {
        steps: generateQuickSortSteps(safeArray),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
    case 'linear':
      return {
        steps: generateLinearSearchSteps(safeArray, target),
        effectiveArray: safeArray,
        wasAutoSorted: false,
      };
  }
}

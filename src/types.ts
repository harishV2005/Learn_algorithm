export type AlgorithmId =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'linear'
  | 'binary';

export type AlgorithmCategory = 'sorting' | 'searching';

export type Language = 'java' | 'cpp' | 'python';

export type PlaybackSpeed = 0.5 | 1 | 2 | 4;

export interface ExecutionStep {
  array: number[];
  activeIndices: number[];      // Indices currently being compared
  swappingIndices: number[];    // Indices currently swapping/overwriting
  sortedIndices: number[];      // Indices confirmed in final sorted position or found target
  pivotOrMidIndex?: number;     // For Quick Sort pivot or Binary Search mid
  activeCodeLine: {
    java: number;
    cpp: number;
    python: number;
  };
  variables: Record<string, string | number>;
  explanation: string;
}

export interface AlgorithmDefinition {
  id: AlgorithmId;
  name: string;
  shortName: string;
  category: AlgorithmCategory;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  summary: string;
  code: {
    java: string[];
    cpp: string[];
    python: string[];
  };
}

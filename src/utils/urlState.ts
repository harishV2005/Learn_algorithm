import { ALGORITHM_ORDER } from '../data/codeTemplates';
import { AlgorithmId } from '../types';

export interface UrlHashState {
  algorithmId: AlgorithmId;
  array: number[];
  target: number;
}

export const DEFAULT_ARRAY = [29, 10, 14, 37, 13, 22, 8];
export const DEFAULT_TARGET = 14;
export const DEFAULT_ALGORITHM: AlgorithmId = 'bubble';

export function encodeUrlHash(state: UrlHashState): string {
  const alg = ALGORITHM_ORDER.includes(state.algorithmId)
    ? state.algorithmId
    : DEFAULT_ALGORITHM;
  const arr = state.array.join(',');
  const target = Math.trunc(state.target);
  return `#alg=${encodeURIComponent(alg)}&arr=${arr}&target=${target}`;
}

export function parseUrlHash(hashString: string): UrlHashState {
  const clean = hashString.replace(/^#/, '').trim();
  if (!clean) {
    return {
      algorithmId: DEFAULT_ALGORITHM,
      array: [...DEFAULT_ARRAY],
      target: DEFAULT_TARGET,
    };
  }

  const params = new URLSearchParams(clean);

  const rawAlg = params.get('alg');
  const algorithmId: AlgorithmId =
    rawAlg && ALGORITHM_ORDER.includes(rawAlg as AlgorithmId)
      ? (rawAlg as AlgorithmId)
      : DEFAULT_ALGORITHM;

  let array = [...DEFAULT_ARRAY];
  const rawArr = params.get('arr');
  if (rawArr) {
    const parsed = rawArr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n) && Number.isInteger(n))
      .map((n) => Math.max(-999, Math.min(999, n)));

    if (parsed.length >= 2) {
      array = parsed.slice(0, 20);
    }
  }

  let target = DEFAULT_TARGET;
  const rawTarget = params.get('target');
  if (rawTarget !== null && rawTarget.trim() !== '') {
    const parsedTarget = Number(rawTarget.trim());
    if (Number.isFinite(parsedTarget) && Number.isInteger(parsedTarget)) {
      target = Math.max(-999, Math.min(999, parsedTarget));
    }
  }

  return {
    algorithmId,
    array,
    target,
  };
}

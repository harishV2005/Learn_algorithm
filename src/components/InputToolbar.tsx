import React from 'react';
import { Play, Shuffle, AlertTriangle, Info } from 'lucide-react';
import { AlgorithmCategory, AlgorithmId } from '../types';

interface InputToolbarProps {
  algorithmId: AlgorithmId;
  category: AlgorithmCategory;
  arrayInput: string;
  targetInput: string;
  onArrayInputChange: (val: string) => void;
  onTargetInputChange: (val: string) => void;
  onLoadAndRun: () => void;
  onRandomize: () => void;
  validationNotice: string | null;
  wasAutoSorted: boolean;
}

export const InputToolbar: React.FC<InputToolbarProps> = ({
  algorithmId,
  category,
  arrayInput,
  targetInput,
  onArrayInputChange,
  onTargetInputChange,
  onLoadAndRun,
  onRandomize,
  validationNotice,
  wasAutoSorted,
}) => {
  const showTargetInput = category === 'searching';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoadAndRun();
  };

  return (
    <section
      aria-label="Dataset configuration"
      className="bg-[#FAF9F5] border-b border-[#1C1C1E]"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row lg:items-end gap-3"
        >
          {/* Array Input */}
          <div className="flex-1 min-w-0">
            <label
              htmlFor="array-input"
              className="block font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#46464A] mb-1"
            >
              Dataset Array (2–20 Integers, Comma-Separated)
            </label>
            <input
              id="array-input"
              type="text"
              value={arrayInput}
              onChange={(e) => onArrayInputChange(e.target.value)}
              placeholder="29, 10, 14, 37, 13, 22, 8"
              spellCheck={false}
              autoComplete="off"
              className="w-full h-10 px-3 bg-white border border-[#1C1C1E] rounded-[4px] font-mono text-sm text-[#1C1C1E] placeholder:text-[#77767B] focus:outline-2 focus:outline-[#F59E0B] focus:outline-offset-0"
            />
          </div>

          {/* Conditional Target Value Input for Searching */}
          {showTargetInput && (
            <div className="w-full sm:w-44 shrink-0">
              <label
                htmlFor="target-input"
                className="block font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#46464A] mb-1"
              >
                Target Value
              </label>
              <input
                id="target-input"
                type="number"
                value={targetInput}
                onChange={(e) => onTargetInputChange(e.target.value)}
                placeholder="14"
                className="w-full h-10 px-3 bg-white border border-[#1C1C1E] rounded-[4px] font-mono text-sm tabular-nums text-[#1C1C1E] placeholder:text-[#77767B] focus:outline-2 focus:outline-[#F59E0B] focus:outline-offset-0"
              />
            </div>
          )}

          {/* Action Keycaps */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="submit"
              className="h-10 px-4 bg-[#1C1C1E] hover:bg-[#2E2E32] active:translate-y-[1px] text-white border border-[#1C1C1E] rounded-[4px] text-xs font-semibold tracking-tight inline-flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Load &amp; Auto-Run</span>
            </button>

            <button
              type="button"
              onClick={onRandomize}
              className="h-10 px-4 bg-white hover:bg-[#F7F6F2] active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-semibold tracking-tight inline-flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-2"
            >
              <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Randomize</span>
            </button>
          </div>
        </form>

        {/* Notices: Binary Search Auto-Sort or Input Validation */}
        {(wasAutoSorted && algorithmId === 'binary') || validationNotice ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {wasAutoSorted && algorithmId === 'binary' && (
              <div
                role="status"
                className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded-[4px] text-xs text-[#1C1C1E]"
              >
                <Info className="w-3.5 h-3.5 text-[#B45309] shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-semibold">Binary Search Auto-Sorted:</strong>{' '}
                  Input array was unsorted and has been sorted ascending for valid binary search execution.
                </span>
              </div>
            )}

            {validationNotice && (
              <div
                role="alert"
                className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-[#EF4444] rounded-[4px] text-xs text-[#1C1C1E]"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" aria-hidden="true" />
                <span>{validationNotice}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

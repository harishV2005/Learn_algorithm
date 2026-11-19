import React from 'react';
import { AlgorithmDefinition, ExecutionStep } from '../types';

interface VisualizationCanvasProps {
  algorithm: AlgorithmDefinition;
  step: ExecutionStep;
  currentStepIndex: number;
  totalSteps: number;
  targetValue?: number;
}

const LEGEND_ITEMS = [
  { label: 'Default', color: '#D6D3CD', border: '#A8A29E' },
  { label: 'Comparing', color: '#F59E0B', border: '#B45309' },
  { label: 'Swapping', color: '#EF4444', border: '#B91C1C' },
  { label: 'Sorted / Found', color: '#10B981', border: '#047857' },
  { label: 'Mid / Pivot', color: '#3B82F6', border: '#1D4ED8' },
];

export const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({
  algorithm,
  step,
  currentStepIndex,
  totalSteps,
  targetValue,
}) => {
  const { array, activeIndices, swappingIndices, sortedIndices, pivotOrMidIndex } = step;

  const minVal = Math.min(...array);
  const maxVal = Math.max(...array);

  const computeBarHeightPercent = (val: number): number => {
    if (array.length === 0) return 20;
    if (minVal === maxVal) return 60;
    if (minVal >= 0) {
      // Scale cleanly between 16% and 94%
      return 16 + (val / Math.max(1, maxVal)) * 78;
    }
    // Handle negative numbers gracefully
    return 16 + ((val - minVal) / (maxVal - minVal)) * 78;
  };

  const getBarVisualState = (idx: number) => {
    const isSwapping = swappingIndices.includes(idx);
    const isSortedOrFound = sortedIndices.includes(idx);
    const isPivotOrMid = pivotOrMidIndex === idx;
    const isComparing = activeIndices.includes(idx);

    if (isSwapping) {
      return {
        bg: '#EF4444',
        border: '#1C1C1E',
        tag: 'SWAP',
        tagColor: 'text-[#B91C1C]',
      };
    }
    if (isSortedOrFound) {
      return {
        bg: '#10B981',
        border: '#1C1C1E',
        tag: algorithm.category === 'searching' ? 'FOUND' : undefined,
        tagColor: 'text-[#047857]',
      };
    }
    if (isPivotOrMid) {
      return {
        bg: '#3B82F6',
        border: '#1C1C1E',
        tag: algorithm.id === 'quick' ? 'PIVOT' : 'MID',
        tagColor: 'text-[#1D4ED8]',
      };
    }
    if (isComparing) {
      return {
        bg: '#F59E0B',
        border: '#1C1C1E',
        tag: 'CMP',
        tagColor: 'text-[#B45309]',
      };
    }
    return {
      bg: '#D6D3CD',
      border: '#A8A29E',
      tag: undefined,
      tagColor: '',
    };
  };

  const isSearchNotFound =
    algorithm.category === 'searching' &&
    currentStepIndex === totalSteps - 1 &&
    sortedIndices.length === 0 &&
    step.variables.result === -1;

  const isSearchFound =
    algorithm.category === 'searching' && sortedIndices.length > 0;

  return (
    <div className="bg-white border border-[#1C1C1E] rounded-[4px] flex flex-col overflow-hidden">
      {/* Panel Header */}
      <div className="px-4 py-2.5 border-b border-[#1C1C1E] flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1C1C1E] whitespace-nowrap">
            {algorithm.name}
          </h2>
          <span className="text-[#D6D3CD]" aria-hidden="true">|</span>
          <span className="font-mono text-xs tabular-nums text-[#46464A] whitespace-nowrap">
            STEP {String(currentStepIndex + 1).padStart(2, '0')} /{' '}
            {String(totalSteps).padStart(2, '0')}
          </span>
          {algorithm.category === 'searching' && targetValue !== undefined && (
            <>
              <span className="text-[#D6D3CD]" aria-hidden="true">|</span>
              <span className="font-mono text-xs tabular-nums text-[#1C1C1E] whitespace-nowrap">
                TARGET = <strong>{targetValue}</strong>
              </span>
            </>
          )}
        </div>

        {/* State Color Legend */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-[2px] border shrink-0"
                style={{
                  backgroundColor: item.color,
                  borderColor: item.border,
                }}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.04em] text-[#46464A] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dot-Grid Visualization Stage */}
      <div className="dot-grid-canvas relative px-4 sm:px-6 pt-8 pb-5 min-h-[290px] sm:min-h-[330px] flex flex-col justify-end">
        {/* Search Outcome Indicator */}
        {(isSearchFound || isSearchNotFound) && (
          <div className="absolute top-3 right-4">
            {isSearchFound ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#10B981] rounded-[4px] font-mono text-[11px] font-semibold text-[#047857] tabular-nums">
                FOUND AT INDEX {sortedIndices[0]}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#EF4444] rounded-[4px] font-mono text-[11px] font-semibold text-[#B91C1C] tabular-nums">
                NOT FOUND (-1)
              </span>
            )}
          </div>
        )}

        {/* Bar Array Container */}
        <div
          className="w-full flex items-end justify-center gap-1.5 sm:gap-2.5 h-[220px] sm:h-[250px] border-b border-[#1C1C1E] pb-0"
          role="img"
          aria-label={`Array state at step ${currentStepIndex + 1}: ${array.join(', ')}`}
        >
          {array.map((value, idx) => {
            const heightPct = computeBarHeightPercent(value);
            const visual = getBarVisualState(idx);
            const denseMode = array.length > 14;

            return (
              <div
                key={idx}
                className="flex-1 max-w-[64px] min-w-[14px] h-full flex flex-col justify-end items-center"
              >
                {/* Numeric Value Label */}
                <span
                  className={`font-mono tabular-nums font-semibold text-[#1C1C1E] mb-1.5 select-none ${
                    denseMode ? 'text-[10px]' : 'text-xs sm:text-[13px]'
                  }`}
                >
                  {value}
                </span>

                {/* Vertical Bar */}
                <div
                  className="w-full rounded-t-[4px] border-x border-t transition-all duration-150 ease-out"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: visual.bg,
                    borderColor: visual.border,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Index Axis & Active Marker Row */}
        <div className="w-full flex items-start justify-center gap-1.5 sm:gap-2.5 pt-2">
          {array.map((_, idx) => {
            const visual = getBarVisualState(idx);
            const denseMode = array.length > 14;

            return (
              <div
                key={idx}
                className="flex-1 max-w-[64px] min-w-[14px] flex flex-col items-center"
              >
                <span
                  className={`font-mono tabular-nums text-[#605E5A] select-none ${
                    denseMode ? 'text-[10px]' : 'text-[11px]'
                  }`}
                >
                  {idx}
                </span>
                <span
                  className={`h-3.5 font-mono text-[9px] font-bold tracking-[0.06em] uppercase ${visual.tagColor}`}
                >
                  {visual.tag ?? ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ExecutionStep } from '../types';

interface MicroLogPanelProps {
  step: ExecutionStep;
  currentStepIndex: number;
}

export const MicroLogPanel: React.FC<MicroLogPanelProps> = ({
  step,
  currentStepIndex,
}) => {
  const variableEntries = Object.entries(step.variables);

  return (
    <div className="bg-white border border-[#1C1C1E] rounded-[4px] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 border-b border-[#1C1C1E] flex items-center justify-between gap-4 bg-white">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#46464A]">
          Execution Micro-Log
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#605E5A] tabular-nums">
          Snapshot #{currentStepIndex + 1}
        </span>
      </div>

      {/* Explanation & Live Variable Pills */}
      <div className="p-4 flex flex-col gap-3">
        <p className="text-[15px] leading-[22px] font-medium text-[#1C1C1E]">
          {step.explanation}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E5E3DC]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#605E5A] mr-1">
            Registers
          </span>
          {variableEntries.length > 0 ? (
            variableEntries.map(([key, val]) => (
              <div
                key={key}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#F7F6F2] border border-[#D6D3CD] rounded-[4px] font-mono text-xs tabular-nums"
              >
                <span className="text-[#605E5A]">{key}</span>
                <span className="text-[#A8A29E]">=</span>
                <span className="font-semibold text-[#1C1C1E]">{String(val)}</span>
              </div>
            ))
          ) : (
            <span className="font-mono text-xs text-[#77767B]">None</span>
          )}
        </div>
      </div>
    </div>
  );
};

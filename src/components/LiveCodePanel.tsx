import React from 'react';
import { AlgorithmDefinition, ExecutionStep, Language } from '../types';

interface LiveCodePanelProps {
  algorithm: AlgorithmDefinition;
  step: ExecutionStep;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'python', label: 'Python' },
];

export const LiveCodePanel: React.FC<LiveCodePanelProps> = ({
  algorithm,
  step,
  language,
  onSelectLanguage,
}) => {
  const lines = algorithm.code[language];
  const activeLine = step.activeCodeLine[language];

  return (
    <aside
      aria-label="Live code inspector"
      className="bg-white border border-[#1C1C1E] rounded-[4px] flex flex-col overflow-hidden h-full"
    >
      {/* Header with Language Segmented Control */}
      <div className="px-4 py-2 border-b border-[#1C1C1E] flex items-center justify-between gap-3 bg-white">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1C1C1E] whitespace-nowrap">
          Live Code Sync
        </span>

        <div
          role="tablist"
          aria-label="Programming language"
          className="inline-flex border border-[#1C1C1E] rounded-[4px] overflow-hidden bg-white"
        >
          {LANGUAGES.map((lang, idx) => {
            const selected = language === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onSelectLanguage(lang.id)}
                className={`px-3 py-1 font-mono text-xs font-medium whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-[-2px] ${
                  idx > 0 ? 'border-l border-[#D6D3CD]' : ''
                } ${
                  selected
                    ? 'bg-[#1C1C1E] text-white'
                    : 'bg-white text-[#1C1C1E] hover:bg-[#F7F6F2]'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Line-Numbered Code Surface */}
      <div className="flex-1 overflow-x-auto bg-white py-2">
        <div className="min-w-full inline-block">
          {lines.map((lineText, idx) => {
            const lineNumber = idx + 1;
            const isActive = lineNumber === activeLine;

            return (
              <div
                key={`${language}-${lineNumber}`}
                className={`flex items-center justify-between pr-3 font-mono text-[12.5px] leading-[1.7] transition-colors ${
                  isActive
                    ? 'bg-[#FEF3C7] border-l-[3px] border-l-[#F59E0B] text-[#1C1C1E] font-semibold'
                    : 'border-l-[3px] border-l-transparent text-[#2E2E32] hover:bg-[#FAF9F5]'
                }`}
              >
                <div className="flex items-center min-w-0">
                  {/* Muted Line Number Gutter */}
                  <span
                    className={`w-10 shrink-0 text-right pr-3 select-none tabular-nums border-r ${
                      isActive
                        ? 'text-[#92400E] border-[#F59E0B]/40'
                        : 'text-[#77767B] border-[#E5E3DC]'
                    }`}
                  >
                    {lineNumber}
                  </span>

                  {/* Source Line */}
                  <pre className="pl-3.5 pr-4 whitespace-pre font-mono">
                    {lineText}
                  </pre>
                </div>

                {/* Right-Aligned ACTIVE Badge */}
                {isActive && (
                  <span className="ml-2 shrink-0 px-1.5 py-0.5 bg-[#1C1C1E] text-[#FEF3C7] font-mono text-[9px] font-bold tracking-[0.08em] uppercase rounded-[2px] select-none">
                    ACTIVE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Summary Footer */}
      <div className="px-4 py-3 border-t border-[#1C1C1E] bg-[#FAF9F5]">
        <p className="text-xs leading-[18px] text-[#46464A]">{algorithm.summary}</p>
      </div>
    </aside>
  );
};

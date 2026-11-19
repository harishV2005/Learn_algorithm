import React, { useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { ALGORITHM_ORDER, ALGORITHMS } from '../data/codeTemplates';
import { AlgorithmId } from '../types';

interface HeaderProps {
  selectedAlgorithm: AlgorithmId;
  onSelectAlgorithm: (id: AlgorithmId) => void;
  onCopyShareLink: () => Promise<boolean>;
}

export const Header: React.FC<HeaderProps> = ({
  selectedAlgorithm,
  onSelectAlgorithm,
  onCopyShareLink,
}) => {
  const [copied, setCopied] = useState(false);

  const activeDef = ALGORITHMS[selectedAlgorithm];
  const sortingIds = ALGORITHM_ORDER.filter(
    (id) => ALGORITHMS[id].category === 'sorting'
  );
  const searchingIds = ALGORITHM_ORDER.filter(
    (id) => ALGORITHMS[id].category === 'searching'
  );

  const handleCopyClick = async () => {
    const ok = await onCopyShareLink();
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-white border-b border-[#1C1C1E]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 bg-[#1C1C1E] rounded-[4px] flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="7" width="3" height="6" fill="#FFFFFF" />
                <rect x="5.5" y="3" width="3" height="10" fill="#F59E0B" />
                <rect x="10" y="1" width="3" height="12" fill="#10B981" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-[-0.02em] text-[#1C1C1E] whitespace-nowrap">
              TraceLab
            </span>
          </div>

          {/* Mobile/Tablet complexity readout + Copy Share Link */}
          <div className="flex xl:hidden items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] tabular-nums text-[#605E5A]">
              <span>AVG {activeDef.timeComplexity.average}</span>
              <span aria-hidden="true">·</span>
              <span>SPACE {activeDef.spaceComplexity}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyClick}
              className="h-8 px-3 bg-white hover:bg-[#F7F6F2] active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                  <span>Copied Link</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Share Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Algorithm Segmented Selector */}
        <nav
          aria-label="Algorithm selection"
          className="flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center border border-[#1C1C1E] rounded-[4px] overflow-hidden bg-white">
            <span className="px-2.5 py-1.5 bg-[#F7F6F2] border-r border-[#D6D3CD] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-[#605E5A] whitespace-nowrap select-none">
              Sort
            </span>
            {sortingIds.map((id, idx) => {
              const def = ALGORITHMS[id];
              const isSelected = id === selectedAlgorithm;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectAlgorithm(id)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-[-2px] ${
                    idx > 0 ? 'border-l border-[#D6D3CD]' : ''
                  } ${
                    isSelected
                      ? 'bg-[#1C1C1E] text-white'
                      : 'bg-white text-[#1C1C1E] hover:bg-[#F7F6F2]'
                  }`}
                >
                  {def.shortName}
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center border border-[#1C1C1E] rounded-[4px] overflow-hidden bg-white">
            <span className="px-2.5 py-1.5 bg-[#F7F6F2] border-r border-[#D6D3CD] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-[#605E5A] whitespace-nowrap select-none">
              Search
            </span>
            {searchingIds.map((id, idx) => {
              const def = ALGORITHMS[id];
              const isSelected = id === selectedAlgorithm;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectAlgorithm(id)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-[-2px] ${
                    idx > 0 ? 'border-l border-[#D6D3CD]' : ''
                  } ${
                    isSelected
                      ? 'bg-[#1C1C1E] text-white'
                      : 'bg-white text-[#1C1C1E] hover:bg-[#F7F6F2]'
                  }`}
                >
                  {def.shortName}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Desktop Complexity Telemetry + Copy Share Link */}
        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5 font-mono text-xs tabular-nums text-[#46464A] whitespace-nowrap">
            <span className="hidden 2xl:inline">
              BEST <strong className="text-[#1C1C1E] font-semibold">{activeDef.timeComplexity.best}</strong>
            </span>
            <span className="hidden 2xl:inline text-[#D6D3CD]" aria-hidden="true">/</span>
            <span>
              AVG <strong className="text-[#1C1C1E] font-semibold">{activeDef.timeComplexity.average}</strong>
            </span>
            <span className="text-[#D6D3CD]" aria-hidden="true">/</span>
            <span>
              SPACE <strong className="text-[#1C1C1E] font-semibold">{activeDef.spaceComplexity}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyClick}
            className="h-8 px-3 bg-white hover:bg-[#F7F6F2] active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                <span>Copied Link</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

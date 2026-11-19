import React from 'react';
import {
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { PlaybackSpeed } from '../types';

interface TransportControlsProps {
  isPlaying: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speed: PlaybackSpeed;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSeekStep: (stepIndex: number) => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2, 4];

export const TransportControls: React.FC<TransportControlsProps> = ({
  isPlaying,
  currentStepIndex,
  totalSteps,
  speed,
  onTogglePlay,
  onStepBack,
  onStepForward,
  onReset,
  onSeekStep,
  onSpeedChange,
}) => {
  const isAtStart = currentStepIndex <= 0;
  const isAtEnd = currentStepIndex >= totalSteps - 1;

  return (
    <div className="bg-white border border-[#1C1C1E] rounded-[4px] px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Transport Keycaps */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReset}
          title="Reset to step 0"
          aria-label="Reset"
          className="h-9 px-3 bg-[#F7F6F2] hover:bg-[#E9E8E4] active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden md:inline">Reset</span>
        </button>

        <button
          type="button"
          onClick={onStepBack}
          disabled={isAtStart}
          title="Step Back"
          aria-label="Step Back"
          className="h-9 px-3 bg-white hover:bg-[#F7F6F2] disabled:opacity-40 disabled:cursor-not-allowed active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
        >
          <SkipBack className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="h-9 px-4 bg-[#1C1C1E] hover:bg-[#2E2E32] active:translate-y-[1px] text-white border border-[#1C1C1E] rounded-[4px] text-xs font-semibold inline-flex items-center justify-center gap-2 min-w-[92px] whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-2"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>{isAtEnd ? 'Replay' : 'Play'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onStepForward}
          disabled={isAtEnd}
          title="Step Forward"
          aria-label="Step Forward"
          className="h-9 px-3 bg-white hover:bg-[#F7F6F2] disabled:opacity-40 disabled:cursor-not-allowed active:translate-y-[1px] text-[#1C1C1E] border border-[#1C1C1E] rounded-[4px] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
        >
          <span className="hidden sm:inline">Step</span>
          <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="flex-1 flex items-center gap-3 min-w-[120px] px-1">
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => onSeekStep(Number(e.target.value))}
          aria-label="Execution timeline scrubber"
          className="w-full h-1.5 bg-[#D6D3CD] rounded-none appearance-none cursor-pointer accent-[#1C1C1E]"
        />
        <span className="font-mono text-[11px] tabular-nums text-[#605E5A] whitespace-nowrap shrink-0">
          {currentStepIndex}/{Math.max(0, totalSteps - 1)}
        </span>
      </div>

      {/* Speed Selector Segmented Control */}
      <div className="flex items-center gap-2 shrink-0 justify-end">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#605E5A] whitespace-nowrap">
          Speed
        </span>
        <div
          role="group"
          aria-label="Playback speed"
          className="inline-flex border border-[#1C1C1E] rounded-[4px] overflow-hidden bg-white"
        >
          {SPEEDS.map((s, idx) => {
            const active = speed === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSpeedChange(s)}
                className={`h-8 px-2.5 font-mono text-xs tabular-nums font-medium whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#F59E0B] focus-visible:outline-offset-[-2px] ${
                  idx > 0 ? 'border-l border-[#D6D3CD]' : ''
                } ${
                  active
                    ? 'bg-[#1C1C1E] text-white'
                    : 'bg-white text-[#1C1C1E] hover:bg-[#F7F6F2]'
                }`}
              >
                {s}x
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

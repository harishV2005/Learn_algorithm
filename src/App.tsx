import { useCallback, useEffect, useMemo, useState } from 'react';
import { generateAlgorithmSteps } from './algorithms';
import { Header } from './components/Header';
import { InputToolbar } from './components/InputToolbar';
import { LiveCodePanel } from './components/LiveCodePanel';
import { MicroLogPanel } from './components/MicroLogPanel';
import { TransportControls } from './components/TransportControls';
import { VisualizationCanvas } from './components/VisualizationCanvas';
import { ALGORITHMS } from './data/codeTemplates';
import { AlgorithmId, ExecutionStep, Language, PlaybackSpeed } from './types';
import {
  DEFAULT_TARGET,
  encodeUrlHash,
  parseUrlHash,
} from './utils/urlState';

const SPEED_INTERVAL_MS: Record<PlaybackSpeed, number> = {
  0.5: 1200,
  1: 600,
  2: 300,
  4: 120,
};

function parseArrayInput(raw: string): {
  values: number[];
  notice: string | null;
  valid: boolean;
} {
  const tokens = raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (tokens.length === 0) {
    return {
      values: [],
      notice: 'Enter at least 2 comma-separated integers (e.g. 29, 10, 14, 37).',
      valid: false,
    };
  }

  const parsed: number[] = [];
  let ignoredCount = 0;

  for (const token of tokens) {
    const num = Number(token);
    if (Number.isFinite(num) && Number.isInteger(num)) {
      parsed.push(Math.max(-999, Math.min(999, num)));
    } else {
      ignoredCount++;
    }
  }

  if (parsed.length < 2) {
    return {
      values: [],
      notice: 'Dataset requires at least 2 valid integers to execute.',
      valid: false,
    };
  }

  let notice: string | null = null;
  let finalValues = parsed;

  if (parsed.length > 20) {
    finalValues = parsed.slice(0, 20);
    notice = 'Dataset clamped to 20 elements maximum.';
  } else if (ignoredCount > 0) {
    notice = `Ignored ${ignoredCount} non-integer token${ignoredCount > 1 ? 's' : ''}.`;
  }

  return {
    values: finalValues,
    notice,
    valid: true,
  };
}

export default function App() {
  const initialHashState = useMemo(() => {
    if (typeof window === 'undefined') {
      return parseUrlHash('');
    }
    return parseUrlHash(window.location.hash);
  }, []);

  const [algorithmId, setAlgorithmId] = useState<AlgorithmId>(
    initialHashState.algorithmId
  );
  const [language, setLanguage] = useState<Language>('java');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const [arrayInput, setArrayInput] = useState<string>(
    initialHashState.array.join(', ')
  );
  const [targetInput, setTargetInput] = useState<string>(
    String(initialHashState.target)
  );

  const [activeDataset, setActiveDataset] = useState<number[]>(
    initialHashState.array
  );
  const [activeTarget, setActiveTarget] = useState<number>(
    initialHashState.target
  );
  const [validationNotice, setValidationNotice] = useState<string | null>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const execution = useMemo(() => {
    return generateAlgorithmSteps(algorithmId, activeDataset, activeTarget);
  }, [algorithmId, activeDataset, activeTarget]);

  const steps: ExecutionStep[] = execution.steps;
  const safeStepIndex = Math.min(currentStepIndex, Math.max(0, steps.length - 1));
  const currentStep = steps[safeStepIndex];
  const algorithmDef = ALGORITHMS[algorithmId];

  // Sync active algorithm, array, and target into the URL hash
  useEffect(() => {
    const nextHash = encodeUrlHash({
      algorithmId,
      array: activeDataset,
      target: activeTarget,
    });
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [algorithmId, activeDataset, activeTarget]);

  // React to manual URL hash edits or history navigation
  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseUrlHash(window.location.hash);
      setAlgorithmId(parsed.algorithmId);
      setActiveDataset(parsed.array);
      setActiveTarget(parsed.target);
      setArrayInput(parsed.array.join(', '));
      setTargetInput(String(parsed.target));
      setValidationNotice(null);
      setCurrentStepIndex(0);
      setIsPlaying(true);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Auto-play interval engine
  useEffect(() => {
    if (!isPlaying) return;

    if (safeStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, SPEED_INTERVAL_MS[speed]);

    return () => window.clearTimeout(timer);
  }, [isPlaying, safeStepIndex, steps.length, speed]);

  const handleSelectAlgorithm = useCallback((nextId: AlgorithmId) => {
    setAlgorithmId(nextId);
    setValidationNotice(null);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, []);

  const handleLoadAndRun = useCallback(() => {
    const result = parseArrayInput(arrayInput);
    if (!result.valid) {
      setValidationNotice(result.notice);
      return;
    }

    const parsedTarget = Number(targetInput.trim());
    const nextTarget =
      Number.isFinite(parsedTarget) && targetInput.trim() !== ''
        ? Math.max(-999, Math.min(999, Math.trunc(parsedTarget)))
        : DEFAULT_TARGET;

    setValidationNotice(result.notice);
    setActiveDataset(result.values);
    setActiveTarget(nextTarget);
    setArrayInput(result.values.join(', '));
    setTargetInput(String(nextTarget));
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [arrayInput, targetInput]);

  const handleRandomize = useCallback(() => {
    const randomValues = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 95) + 5
    );
    const randomTarget =
      randomValues[Math.floor(Math.random() * randomValues.length)];

    setValidationNotice(null);
    setArrayInput(randomValues.join(', '));
    setActiveDataset(randomValues);

    if (algorithmDef.category === 'searching') {
      setTargetInput(String(randomTarget));
      setActiveTarget(randomTarget);
    }

    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [algorithmDef.category]);

  const handleCopyShareLink = useCallback(async (): Promise<boolean> => {
    const parsedInput = parseArrayInput(arrayInput);
    const shareArray = parsedInput.valid ? parsedInput.values : activeDataset;
    const parsedTarget = Number(targetInput.trim());
    const shareTarget =
      Number.isFinite(parsedTarget) && targetInput.trim() !== ''
        ? Math.max(-999, Math.min(999, Math.trunc(parsedTarget)))
        : activeTarget;

    const nextHash = encodeUrlHash({
      algorithmId,
      array: shareArray,
      target: shareTarget,
    });
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}${nextHash}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      }
    } catch {
      // Fallback below
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }, [algorithmId, arrayInput, activeDataset, targetInput, activeTarget]);

  const handleTogglePlay = useCallback(() => {
    if (safeStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [safeStepIndex, steps.length]);

  const handleStepBack = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleStepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  }, [steps.length]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const handleSeekStep = useCallback(
    (idx: number) => {
      setIsPlaying(false);
      setCurrentStepIndex(Math.max(0, Math.min(steps.length - 1, idx)));
    },
    [steps.length]
  );

  // Keyboard shortcuts when not focused on inputs
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBack();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleTogglePlay, handleStepBack, handleStepForward]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1C1C1E] flex flex-col">
      <Header
        selectedAlgorithm={algorithmId}
        onSelectAlgorithm={handleSelectAlgorithm}
        onCopyShareLink={handleCopyShareLink}
      />

      <InputToolbar
        algorithmId={algorithmId}
        category={algorithmDef.category}
        arrayInput={arrayInput}
        targetInput={targetInput}
        onArrayInputChange={setArrayInput}
        onTargetInputChange={setTargetInput}
        onLoadAndRun={handleLoadAndRun}
        onRandomize={handleRandomize}
        validationNotice={validationNotice}
        wasAutoSorted={execution.wasAutoSorted}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Stage: Canvas + Transport + Micro-Log */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <VisualizationCanvas
              algorithm={algorithmDef}
              step={currentStep}
              currentStepIndex={safeStepIndex}
              totalSteps={steps.length}
              targetValue={
                algorithmDef.category === 'searching' ? activeTarget : undefined
              }
            />

            <TransportControls
              isPlaying={isPlaying}
              currentStepIndex={safeStepIndex}
              totalSteps={steps.length}
              speed={speed}
              onTogglePlay={handleTogglePlay}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              onReset={handleReset}
              onSeekStep={handleSeekStep}
              onSpeedChange={setSpeed}
            />

            <MicroLogPanel step={currentStep} currentStepIndex={safeStepIndex} />
          </div>

          {/* Right Stage: Multi-Language Live Code Inspector */}
          <div className="lg:col-span-5">
            <LiveCodePanel
              algorithm={algorithmDef}
              step={currentStep}
              language={language}
              onSelectLanguage={setLanguage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

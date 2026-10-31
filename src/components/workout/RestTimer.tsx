import React, { useState, useEffect } from 'react';
import { Play, Pause, Plus, SkipForward, Bell } from 'lucide-react';
import { sounds } from '../../utils/sound';
import { useApp } from '../../context/AppContext';

interface RestTimerProps {
  initialSeconds: number;
  onComplete: () => void;
  onSkip: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds,
  onComplete,
  onSkip
}) => {
  const { settings } = useApp();
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(true);

  const total = Math.max(initialSeconds, 1);
  const progressPercent = Math.max(0, Math.min(100, ((total - secondsLeft) / total) * 100));

  useEffect(() => {
    let interval: any = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (settings.soundEnabled) sounds.playChime();
            onComplete();
            return 0;
          }
          if (prev <= 4 && prev > 1 && settings.soundEnabled) {
            sounds.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, onComplete, settings.soundEnabled]);

  const addTime = (secs: number) => {
    setSecondsLeft((prev) => prev + secs);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-teal-500/40 p-4 shadow-lg text-center space-y-3">
      <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
        <Bell className="w-3.5 h-3.5 animate-bounce" />
        <span>Rest Interval — Catch Your Breath</span>
      </div>

      {/* Large countdown display */}
      <div className="relative flex items-center justify-center">
        <div className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-mono">
          {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-teal-500 h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1"
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isActive ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          onClick={() => addTime(15)}
          className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-bold transition flex items-center gap-1 border border-teal-200 dark:border-teal-800"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+15s</span>
        </button>

        <button
          onClick={onSkip}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1"
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
};

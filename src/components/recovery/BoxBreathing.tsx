import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart } from 'lucide-react';
import { sounds } from '../../utils/sound';
import { useApp } from '../../context/AppContext';

export const BoxBreathing: React.FC = () => {
  const { settings } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [countdown, setCountdown] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const phases = [
    { name: 'Breathe In Slowly', color: 'from-teal-400 to-emerald-500', desc: 'Expand your lower abdomen gently' },
    { name: 'Hold Lungs Full', color: 'from-emerald-400 to-sky-500', desc: 'Keep throat and shoulders soft' },
    { name: 'Exhale Smoothly', color: 'from-sky-500 to-blue-600', desc: 'Release all air gently through mouth' },
    { name: 'Hold Lungs Empty', color: 'from-blue-500 to-indigo-500', desc: 'Enjoy the stillness and pause' }
  ];

  useEffect(() => {
    let timer: any = null;
    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Next phase
            setPhaseIndex((currPhase) => {
              const next = (currPhase + 1) % 4;
              if (next === 0) {
                setCompletedCycles((c) => c + 1);
              }
              if (settings.soundEnabled) {
                sounds.playTick();
              }
              return next;
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, settings.soundEnabled]);

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setCountdown(4);
    setCompletedCycles(0);
  };

  const current = phases[phaseIndex];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center flex flex-col items-center justify-between space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200/50">
          Vagus Nerve & Vestibular Rest
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
          Box Breathing Guide (4-4-4-4)
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
          Calms the nervous system, regulates vestibular equilibrium, and relaxes spinal tension.
        </p>
      </div>

      {/* Visual Breathing Bubble */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Soft Animated Expanding Ring */}
        <div
          className={`absolute rounded-full transition-all duration-1000 ease-in-out bg-gradient-to-tr ${current.color} opacity-20`}
          style={{
            width: phaseIndex === 0 ? '100%' : phaseIndex === 1 ? '100%' : phaseIndex === 2 ? '65%' : '65%',
            height: phaseIndex === 0 ? '100%' : phaseIndex === 1 ? '100%' : phaseIndex === 2 ? '65%' : '65%'
          }}
        />

        {/* Center Orb */}
        <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${current.color} shadow-lg shadow-teal-500/20 flex flex-col items-center justify-center text-white transition-all duration-1000 select-none`}>
          <span className="text-4xl font-black font-mono leading-none">
            {countdown}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider mt-1 opacity-90">
            Seconds
          </span>
        </div>
      </div>

      {/* Phase Prompts */}
      <div className="space-y-1">
        <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {current.name}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {current.desc}
        </div>
        {completedCycles > 0 && (
          <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 pt-1">
            Cycles Completed: {completedCycles}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isActive ? 'Pause Breathing' : 'Start Pacing'}</span>
        </button>

        <button
          onClick={handleReset}
          className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

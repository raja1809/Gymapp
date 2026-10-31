import React, { useEffect } from 'react';
import { Exercise } from '../../types';
import { AnimatedExercise } from './AnimatedExercise';
import { X, ShieldCheck, AlertTriangle, Wind, Dumbbell, Clock, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  const { activeProfile, settings } = useApp();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {exercise.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                  {exercise.category}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                  {exercise.defaultSets} Sets × {exercise.defaultReps}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Animated Demonstration Component */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Anatomical Movement Demonstration
            </h3>
            <AnimatedExercise
              exerciseId={exercise.id}
              animationType={exercise.animationType}
              speed={settings.animationSpeed}
              height={260}
            />
          </div>

          {/* Quick Metrics & Equipment Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Target Sets</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {exercise.defaultSets} sets
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Volume / Reps</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {exercise.defaultReps}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Rest Interval</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {exercise.defaultRestSeconds}s
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Equipment</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 capitalize">
                {exercise.equipment.join(', ').replace(/_/g, ' ')}
              </div>
            </div>
          </div>

          {/* Target Muscles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Primary & Supporting Muscles
            </h4>
            <div className="flex flex-wrap gap-2">
              {exercise.targetMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-900/60"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Starting Position */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Starting Position Setup
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {exercise.startingPosition}
            </p>
          </div>

          {/* Step-by-Step Execution */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Step-by-Step Movement Instructions
            </h4>
            <ol className="space-y-2.5">
              {exercise.stepByStep.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold text-xs flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Breathing Instructions */}
          <div className="bg-sky-50 dark:bg-sky-950/40 rounded-2xl p-4 border border-sky-100 dark:border-sky-900/60 flex items-start gap-3">
            <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-sky-900 dark:text-sky-200">
                Breathing Pattern
              </h4>
              <p className="text-xs sm:text-sm text-sky-800 dark:text-sky-300 mt-0.5 leading-relaxed">
                {exercise.breathingInstructions}
              </p>
            </div>
          </div>

          {/* Safety Warnings & Clinical Advice (Special attention for Mom) */}
          <div className="bg-rose-50 dark:bg-rose-950/40 rounded-2xl p-4 border border-rose-100 dark:border-rose-900/60">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Safety & Medical Precautions</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              {exercise.safetyWarnings.map((warn, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/60">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-2">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Common Form Mistakes to Avoid</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              {exercise.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Variations: Easier & Harder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Easier Variation
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {exercise.easierVariation}
              </p>
            </div>

            {exercise.harderVariation && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                  Progression / Harder Variation
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {exercise.harderVariation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Selected Profile: <strong className="text-slate-800 dark:text-slate-200">{activeProfile.name}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition active:scale-95"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Exercise } from '../../types';
import { ShieldCheck, AlertCircle, Dumbbell, Play, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: () => void;
  showCategoryBadge?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onSelect,
  showCategoryBadge = true
}) => {
  const { setSelectedExercise } = useApp();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      setSelectedExercise(exercise);
    }
  };

  // Safety status badge formatting
  const getSafetyBadge = () => {
    if (exercise.safetyStatus === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <ShieldCheck className="w-3 h-3" />
          General Safe
        </span>
      );
    }
    if (exercise.safetyStatus === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <AlertCircle className="w-3 h-3" />
          Verify Back Fit
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
        <ShieldCheck className="w-3 h-3" />
        Physiotherapy Approved
      </span>
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          {getSafetyBadge()}
          {showCategoryBadge && (
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              {exercise.category}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition leading-snug">
          {exercise.name}
        </h3>

        <div className="flex flex-wrap gap-1 mt-2">
          {exercise.targetMuscles.slice(0, 2).map((m, idx) => (
            <span key={idx} className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
              {m}
            </span>
          ))}
          {exercise.targetMuscles.length > 2 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{exercise.targetMuscles.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Dumbbell className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{exercise.defaultSets} sets × {exercise.defaultReps}</span>
        </div>

        <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold group-hover:translate-x-0.5 transition">
          <span>Inspect</span>
          <Info className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};


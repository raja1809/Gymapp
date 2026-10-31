import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, HeartHandshake, CheckCircle2, Flame, Award, Clock, Activity, Zap } from 'lucide-react';

export const StatCards: React.FC = () => {
  const { activeProfile, workoutLogs } = useApp();

  const profileLogs = workoutLogs.filter((l) => l.profileId === activeProfile.id);
  const totalSessions = profileLogs.length;

  // Calculate total minutes this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekLogs = profileLogs.filter((l) => new Date(l.date) >= oneWeekAgo);
  const minutesThisWeek = Math.round(
    thisWeekLogs.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60
  );

  // Completion percentage of 4-day target
  const weeklyCompletionPercent = Math.min(100, Math.round((thisWeekLogs.length / 4) * 100));

  // Mom specific metrics
  if (activeProfile.relationship === 'mom') {
    const ptExercisesCount = activeProfile.physiotherapyExercises.length;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Safety & Protocol Adherence */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Safety Status
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-800 dark:text-slate-100">
            Protected
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            Zero Flexion / Vertigo Safe
          </div>
        </div>

        {/* Sessions Completed */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Sessions
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-800 dark:text-slate-100">
            {totalSessions}
          </div>
          <div className="text-[11px] text-teal-600 font-semibold">
            {weeklyCompletionPercent}% of weekly goal
          </div>
        </div>

        {/* Mobility Time This Week */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Mobility Time
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-800 dark:text-slate-100">
            {minutesThisWeek} min
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">
            Gentle joint nourishment
          </div>
        </div>

        {/* Physiotherapy Adherence */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Prescribed PT
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-800 dark:text-slate-100">
            {ptExercisesCount} Active
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold">
            Doctor prescribed & ready
          </div>
        </div>
      </div>
    );
  }

  // Sister specific metrics (Strength progression, volume, streak, PRs)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Workout Streak */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Current Streak
          </span>
          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-100">
          {totalSessions > 0 ? `${totalSessions} Sessions` : 'Starting Out'}
        </div>
        <div className="text-[11px] text-amber-600 font-semibold">
          {weeklyCompletionPercent}% of 4-day split
        </div>
      </div>

      {/* Exercise Minutes */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Exercise Time
          </span>
          <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-100">
          {minutesThisWeek} min
        </div>
        <div className="text-[11px] text-teal-600 font-semibold">
          This week's volume
        </div>
      </div>

      {/* Target Dumbbells */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Dumbbell Load
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-100">
          {activeProfile.sisterConfig?.targetDumbbellWeightKg || 4} kg Pair
        </div>
        <div className="text-[11px] text-blue-600 font-semibold">
          Progressive Overload Target
        </div>
      </div>

      {/* Phase Readiness */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Phase Status
          </span>
          <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-100">
          Phase 1
        </div>
        <div className="text-[11px] text-purple-600 font-semibold">
          Base Foundation Active
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { useApp } from '../../context/AppContext';
import { WeeklyCalendar } from './WeeklyCalendar';
import { StatCards } from './StatCards';
import { ExerciseCard } from '../exercise/ExerciseCard';
import { EXERCISES } from '../../data/exercises';
import { 
  Play, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Moon, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Info,
  Phone
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    activeProfile, 
    startWorkout, 
    setActiveTab, 
    setSelectedExercise, 
    setShowApkModal 
  } = useApp();

  const todayDow = new Date().getDay();
  const todaySchedule = activeProfile.weeklySchedule.find((d) => d.dayOfWeek === todayDow) || activeProfile.weeklySchedule[1];
  const todayExercises = todaySchedule.exerciseIds.map((id) => EXERCISES[id]).filter(Boolean);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
              {activeProfile.relationship === 'mom' ? 'Physiotherapy & Bone Safety Profile' : 'Strength & Fitness Profile'}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Age {activeProfile.age}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {getGreeting()}, {activeProfile.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {activeProfile.relationship === 'mom'
              ? 'Your movements are customized for bone weakness stability and vertigo management.'
              : 'Consistent progression with resistance bands and convertible dumbbells.'}
          </p>
        </div>

        {/* APK / Mobile Install Banner Button */}
        <button
          onClick={() => setShowApkModal(true)}
          className="self-start sm:self-center px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Install App on Phone</span>
        </button>
      </div>

      {/* TODAY'S PLAN HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-teal-300 border border-white/15">
                Today's Recommended Routine
              </span>
              {todaySchedule.isRestOrRecovery ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300">
                  <Moon className="w-3.5 h-3.5" /> Rest & Recovery Day
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                  <Flame className="w-3.5 h-3.5" /> Active Session
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {todaySchedule.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {todaySchedule.focus}
            </p>

            {/* Session details pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-200">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-teal-400" />
                {activeProfile.relationship === 'mom' ? '20 Minutes' : '35 Minutes'}
              </span>
              <span>•</span>
              <span className="font-medium">
                {todayExercises.length} Exercises Planned
              </span>
              <span>•</span>
              <span className="font-medium text-emerald-400">
                {activeProfile.relationship === 'mom' ? 'Chair & Wall Supported' : 'Symactive Dumbbells & Bands'}
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            {todaySchedule.isRestOrRecovery ? (
              <button
                onClick={() => setActiveTab('recovery')}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Moon className="w-5 h-5 text-indigo-600" />
                <span>Open Guided Recovery</span>
              </button>
            ) : (
              <button
                onClick={() => startWorkout(todaySchedule.dayOfWeek)}
                className="px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-teal-500/25 transition active:scale-95 flex items-center justify-center gap-2.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Today's Workout</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('library')}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center gap-2"
            >
              <span>Browse Exercise Library</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* STATS & METRICS */}
      <StatCards />

      {/* WEEKLY SCHEDULE CALENDAR */}
      <WeeklyCalendar />

      {/* TODAY'S EXERCISES PREVIEW LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Exercises in Today's Queue
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap any exercise to inspect its real animated movement and clinician instructions
            </p>
          </div>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({Object.keys(EXERCISES).length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {todayExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>
      </div>

      {/* MOM SPECIFIC: CLINICIAN PHYSIOTHERAPY CARD */}
      {activeProfile.relationship === 'mom' && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-sky-50 dark:from-teal-950/40 dark:via-emerald-950/40 dark:to-sky-950/40 border border-teal-200/80 dark:border-teal-900/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-teal-950 dark:text-teal-100">
                Doctor-Prescribed Physiotherapy Tracker
              </h4>
              <p className="text-xs text-teal-800 dark:text-teal-300 mt-0.5 max-w-lg leading-relaxed">
                You currently have {activeProfile.physiotherapyExercises.length} doctor-approved exercise prescriptions logged. You can review instructions, sets, and doctor notes anytime.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('physiotherapy')}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex-shrink-0"
          >
            Manage Physiotherapy
          </button>
        </div>
      )}
    </div>
  );
};


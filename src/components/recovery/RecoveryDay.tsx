import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BoxBreathing } from './BoxBreathing';
import { AnimatedExercise } from '../exercise/AnimatedExercise';
import { EXERCISES } from '../../data/exercises';
import { 
  Moon, 
  Footprints, 
  ShieldAlert, 
  Droplets, 
  CheckCircle2, 
  Clock, 
  HeartHandshake, 
  Wind,
  Plus
} from 'lucide-react';

export const RecoveryDay: React.FC = () => {
  const { activeProfile, logWorkoutSession, setSelectedExercise } = useApp();
  const [walkMinutes, setWalkMinutes] = useState<number>(20);
  const [walkLogged, setWalkLogged] = useState<boolean>(false);

  const handleLogWalk = () => {
    logWorkoutSession({
      id: 'session-walk-' + Date.now(),
      profileId: activeProfile.id,
      date: new Date().toISOString(),
      dayNumber: 3,
      dayTitle: 'Comfortable Continuous Walking Session',
      durationSeconds: walkMinutes * 60,
      exercisesCompleted: [
        {
          exerciseId: 'comfortable-walking',
          name: 'Comfortable Continuous Walking',
          setsCompleted: 1,
          targetSets: 1,
          reps: `${walkMinutes} minutes`,
          skipped: false,
          sets: [{ setNumber: 1, reps: `${walkMinutes} min`, completed: true }]
        }
      ],
      difficultyRating: 2,
      symptomsReported: ['None — Felt Comfortable'],
      notes: `Logged ${walkMinutes} minutes of comfortable walking.`
    });
    setWalkLogged(true);
    setTimeout(() => setWalkLogged(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
              Active Rest & Gentle Mobility
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
            Recovery & Mobility Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Rest days allow collagen remodeling, bone adaptation, vestibular balance, and muscular rejuvenation.
          </p>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2 self-start sm:self-center">
          <Droplets className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <span>Hydration Goal: 6–8 glasses of water today</span>
        </div>
      </div>

      {/* MOM RECOVERY CONTRAINDICATIONS ALERT */}
      {activeProfile.relationship === 'mom' && (
        <div className="p-5 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 space-y-2">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            <span>Spine & Vertigo Rest Protocol (Important):</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
            Do NOT attempt aggressive stretching, deep toe touches, loaded forward bending, rapid neck rotations, or unsupported balance testing on rest days. Recovery should be completely gentle, seated or supported, and never forced.
          </p>
        </div>
      )}

      {/* BOX BREATHING PACER WIDGET */}
      <BoxBreathing />

      {/* COMFORTABLE WALKING LOGGER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Comfortable Continuous Walking
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-0.5 leading-relaxed">
                Walking provides safe ground-reaction force to stimulate bone density, promotes synovial fluid circulation, and stabilizes vestibular balance at eye level.
              </p>
            </div>
          </div>

          {/* Quick logger */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <select
              value={walkMinutes}
              onChange={(e) => setWalkMinutes(Number(e.target.value))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none"
            >
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
            </select>

            <button
              onClick={handleLogWalk}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{walkLogged ? 'Logged ✓' : 'Log Walk'}</span>
            </button>
          </div>
        </div>

        {/* Animated Walk Preview */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <AnimatedExercise
            exerciseId="comfortable-walking"
            animationType="walking"
            height={200}
          />
        </div>
      </div>

      {/* GENTLE SEATED MOBILITY CARDS */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Gentle Joint Care Exercises
          </h3>
          <p className="text-xs text-slate-500">
            Approved seated movements with zero spinal flexion and zero balance hazard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shoulder Circles */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Gentle Shoulder Rolls & Circles
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
                Upper Trapezius Relief
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sit tall in your chair. Smoothly roll both shoulders backward 10 times, then forward 10 times. Keep neck soft and breathe comfortably.
            </p>
            <AnimatedExercise
              exerciseId="shoulder-circles-gentle"
              animationType="shoulder-circles"
              height={180}
            />
          </div>

          {/* Ankle Pumps */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Seated Ankle Pumps & Circles
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
                Venous Return & Calf Relief
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Point toes away from you, then flex toes back toward shin. Draw slow circles with toes to maintain ankle mobility without balance risk.
            </p>
            <AnimatedExercise
              exerciseId="ankle-pumps-circles"
              animationType="ankle-pumps"
              height={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


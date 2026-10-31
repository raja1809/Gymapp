import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EXERCISES } from '../../data/exercises';
import { AnimatedExercise } from '../exercise/AnimatedExercise';
import { RestTimer } from './RestTimer';
import { WorkoutSummaryModal } from './WorkoutSummaryModal';
import { Exercise, CompletedExerciseLog } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  X, 
  AlertTriangle, 
  Droplets, 
  RotateCcw, 
  ArrowLeftRight, 
  Info, 
  Clock,
  Dumbbell
} from 'lucide-react';

interface WorkoutPlayerProps {
  dayIndex: number;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ dayIndex }) => {
  const { activeProfile, exitWorkout, logWorkoutSession, settings } = useApp();

  const scheduleDay = activeProfile.weeklySchedule.find((d) => d.dayOfWeek === dayIndex) || activeProfile.weeklySchedule[1];
  const initialExercises: Exercise[] = scheduleDay.exerciseIds
    .map((id) => EXERCISES[id])
    .filter(Boolean);

  const [workoutQueue, setWorkoutQueue] = useState<Exercise[]>(initialExercises);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [exerciseLogs, setExerciseLogs] = useState<CompletedExerciseLog[]>(
    initialExercises.map((e) => ({
      exerciseId: e.id,
      name: e.name,
      setsCompleted: 0,
      targetSets: e.defaultSets,
      reps: e.defaultReps,
      skipped: false,
      sets: Array.from({ length: e.defaultSets }, (_, i) => ({
        setNumber: i + 1,
        reps: e.defaultReps,
        completed: false
      }))
    }))
  );

  const [activeSetIndex, setActiveSetIndex] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showReplaceModal, setShowReplaceModal] = useState<boolean>(false);

  // Overall workout stopwatch timer
  useEffect(() => {
    let interval: any = null;
    if (!isPaused && !isWorkoutComplete) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, isWorkoutComplete]);

  const currentExercise = workoutQueue[currentIdx];
  const currentLog = exerciseLogs[currentIdx];

  if (!currentExercise) {
    return (
      <div className="p-8 text-center">
        <p>No exercises loaded for this session.</p>
        <button onClick={exitWorkout} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Handle checking off a completed set
  const handleToggleSetComplete = (setIdx: number) => {
    const updatedLogs = [...exerciseLogs];
    const log = { ...updatedLogs[currentIdx] };
    const sets = [...log.sets];
    const isNowDone = !sets[setIdx].completed;

    sets[setIdx] = { ...sets[setIdx], completed: isNowDone };
    log.sets = sets;
    log.setsCompleted = sets.filter((s) => s.completed).length;
    updatedLogs[currentIdx] = log;
    setExerciseLogs(updatedLogs);

    if (isNowDone) {
      // Trigger rest timer
      if (setIdx < log.targetSets - 1) {
        setActiveSetIndex(setIdx + 1);
        setIsResting(true);
      } else {
        // All sets for this exercise finished!
        if (currentIdx < workoutQueue.length - 1) {
          setIsResting(true);
        } else {
          // Finished entire workout!
          setIsWorkoutComplete(true);
        }
      }
    }
  };

  const handleNextExercise = () => {
    setIsResting(false);
    if (currentIdx < workoutQueue.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setActiveSetIndex(0);
    } else {
      setIsWorkoutComplete(true);
    }
  };

  const handlePrevExercise = () => {
    setIsResting(false);
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setActiveSetIndex(0);
    }
  };

  const handleSkipExercise = () => {
    const updated = [...exerciseLogs];
    updated[currentIdx].skipped = true;
    updated[currentIdx].skipReason = 'User elected to skip for comfort';
    setExerciseLogs(updated);
    handleNextExercise();
  };

  const handleReplaceExercise = (replacement: Exercise) => {
    const newQueue = [...workoutQueue];
    newQueue[currentIdx] = replacement;
    setWorkoutQueue(newQueue);

    const newLogs = [...exerciseLogs];
    newLogs[currentIdx] = {
      exerciseId: replacement.id,
      name: replacement.name,
      setsCompleted: 0,
      targetSets: replacement.defaultSets,
      reps: replacement.defaultReps,
      skipped: false,
      sets: Array.from({ length: replacement.defaultSets }, (_, i) => ({
        setNumber: i + 1,
        reps: replacement.defaultReps,
        completed: false
      }))
    };
    setExerciseLogs(newLogs);
    setShowReplaceModal(false);
  };

  const handleSaveAndExit = (sessionLog: any) => {
    logWorkoutSession(sessionLog);
    exitWorkout();
  };

  // Format stopwatch seconds
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between pb-8">
      {/* Top Navigation & Status Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition"
            aria-label="Exit Workout"
            title="Stop workout safely"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
              {scheduleDay.dayName} • {scheduleDay.title}
            </div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-100">
              Exercise {currentIdx + 1} of {workoutQueue.length}
            </div>
          </div>
        </div>

        {/* Stopwatch & Hydration Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900/60 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => alert('Hydration Reminder: Take a comfortable sip of water, keep shoulders relaxed!')}
            className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:bg-sky-100 transition"
            title="Water reminder"
          >
            <Droplets className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Active Workout View */}
      <div className="max-w-2xl w-full mx-auto p-4 space-y-4 flex-1">
        {/* Animated Demonstration View */}
        <div className="relative">
          <AnimatedExercise
            exerciseId={currentExercise.id}
            animationType={currentExercise.animationType}
            speed={settings.animationSpeed}
            height={260}
          />
        </div>

        {/* Rest Timer Overlay / Block when between sets */}
        {isResting && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <RestTimer
              initialSeconds={currentExercise.defaultRestSeconds}
              onComplete={() => setIsResting(false)}
              onSkip={() => setIsResting(false)}
            />
          </div>
        )}

        {/* Exercise Header & Replace Control */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {currentExercise.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-500 capitalize">
                {currentExercise.equipment.join(', ').replace(/_/g, ' ')}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                {currentExercise.defaultSets} Sets × {currentExercise.defaultReps}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReplaceModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
            title="Swap this exercise if uncomfortable"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Replace</span>
          </button>
        </div>

        {/* Set Loggers: Interactive Clickable Checkboxes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sets Checklist ({currentLog.setsCompleted} of {currentLog.targetSets} completed)
            </h3>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              Tap set when finished
            </span>
          </div>

          <div className="space-y-2">
            {currentLog.sets.map((set, sIdx) => (
              <div
                key={sIdx}
                onClick={() => handleToggleSetComplete(sIdx)}
                className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition ${
                  set.completed
                    ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 text-teal-900 dark:text-teal-200'
                    : sIdx === activeSetIndex
                    ? 'bg-white dark:bg-slate-800 border-teal-400 ring-2 ring-teal-400/20 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  {set.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-sm font-bold">Set {set.setNumber}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                      Target: {set.reps}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-500">
                  {set.completed ? 'Completed ✓' : sIdx === activeSetIndex ? 'Current Set' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Form Reminder Callout */}
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-3.5 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Key Posture Cue:</strong> {currentExercise.stepByStep[0]} {currentExercise.safetyWarnings[0]}
          </div>
        </div>
      </div>

      {/* Bottom Workout Action Controls */}
      <div className="sticky bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 max-w-2xl w-full mx-auto flex items-center justify-between gap-3">
        <button
          onClick={handlePrevExercise}
          disabled={currentIdx === 0}
          className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={handleSkipExercise}
          className="px-3.5 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          Skip Exercise
        </button>

        <button
          onClick={handleNextExercise}
          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition active:scale-95 flex items-center gap-1.5"
        >
          <span>{currentIdx === workoutQueue.length - 1 ? 'Finish Workout' : 'Next Exercise'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Confirm Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Stop Workout Early?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Never exercise through pain or dizziness. You can safely stop now and review your summary, or discard without saving.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Keep Going
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setIsWorkoutComplete(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
              >
                End & Save Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Replacement Modal */}
      {showReplaceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Swap Exercise
              </h3>
              <button onClick={() => setShowReplaceModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Select a suitable alternative for today's workout:
            </p>
            <div className="space-y-2">
              {Object.values(EXERCISES)
                .filter((e) => e.id !== currentExercise.id)
                .map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => handleReplaceExercise(alt)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:bg-teal-50/50 cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{alt.name}</div>
                      <div className="text-[11px] text-slate-400">{alt.category} • {alt.defaultReps}</div>
                    </div>
                    <span className="text-xs font-bold text-teal-600">Select</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion Summary Modal */}
      {isWorkoutComplete && (
        <WorkoutSummaryModal
          dayTitle={scheduleDay.title}
          dayNumber={scheduleDay.dayOfWeek}
          durationSeconds={elapsedSeconds}
          exerciseLogs={exerciseLogs}
          onSave={handleSaveAndExit}
          onClose={exitWorkout}
        />
      )}
    </div>
  );
};

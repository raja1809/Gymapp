import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WorkoutSessionLog, CompletedExerciseLog } from '../../types';
import { Award, CheckCircle2, Clock, Dumbbell, AlertCircle, Smile, Frown, Meh, ThumbsUp, Flame, Save } from 'lucide-react';
import { sounds } from '../../utils/sound';
import { useApp } from '../../context/AppContext';

interface WorkoutSummaryModalProps {
  dayTitle: string;
  dayNumber: number;
  durationSeconds: number;
  exerciseLogs: CompletedExerciseLog[];
  onSave: (session: WorkoutSessionLog) => void;
  onClose: () => void;
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  dayTitle,
  dayNumber,
  durationSeconds,
  exerciseLogs,
  onSave,
  onClose
}) => {
  const { activeProfile, settings } = useApp();
  const [difficultyRating, setDifficultyRating] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomNotes, setSymptomNotes] = useState<string>('');
  const [workoutNotes, setWorkoutNotes] = useState<string>('');

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (settings.soundEnabled) {
        sounds.playCelebration();
      }
    } catch {
      // Ignored
    }
  }, [settings.soundEnabled]);

  const completedCount = exerciseLogs.filter((e) => !e.skipped).length;
  const skippedCount = exerciseLogs.filter((e) => e.skipped).length;
  const totalSetsDone = exerciseLogs.reduce((acc, curr) => acc + (curr.skipped ? 0 : curr.setsCompleted), 0);

  const symptomOptions = [
    'None — Felt Comfortable',
    'Mild Muscle Fatigue',
    'Mild Lower-Back Stiffness',
    'Transient Lightheadedness',
    'Joint Discomfort',
    'Need More Chair Rest Next Time'
  ];

  const toggleSymptom = (symptom: string) => {
    if (symptom === 'None — Felt Comfortable') {
      setSelectedSymptoms(['None — Felt Comfortable']);
      return;
    }
    const filtered = selectedSymptoms.filter((s) => s !== 'None — Felt Comfortable');
    if (filtered.includes(symptom)) {
      setSelectedSymptoms(filtered.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...filtered, symptom]);
    }
  };

  const handleSave = () => {
    const sessionLog: WorkoutSessionLog = {
      id: 'session-' + Date.now(),
      profileId: activeProfile.id,
      date: new Date().toISOString(),
      dayNumber,
      dayTitle,
      durationSeconds,
      exercisesCompleted: exerciseLogs,
      difficultyRating,
      symptomsReported: selectedSymptoms,
      symptomNotes: symptomNotes.trim() || undefined,
      notes: workoutNotes.trim() || undefined
    };
    onSave(sessionLog);
  };

  const difficultyLevels: { val: 1 | 2 | 3 | 4 | 5; label: string; icon: React.ReactNode; color: string }[] = [
    { val: 1, label: 'Very Easy', icon: <Smile className="w-5 h-5" />, color: 'hover:border-emerald-500' },
    { val: 2, label: 'Easy / Good', icon: <ThumbsUp className="w-5 h-5" />, color: 'hover:border-teal-500' },
    { val: 3, label: 'Moderate', icon: <Meh className="w-5 h-5" />, color: 'hover:border-blue-500' },
    { val: 4, label: 'Challenging', icon: <Flame className="w-5 h-5" />, color: 'hover:border-amber-500' },
    { val: 5, label: 'Very Hard', icon: <Frown className="w-5 h-5" />, color: 'hover:border-rose-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-6 text-white text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8 text-amber-200 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Workout Completed!
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-sm mx-auto">
            Terrific job, {activeProfile.name}! Consistency is the greatest investment in your strength and spinal stability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <Clock className="w-4 h-4 mx-auto text-teal-600 mb-1" />
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {Math.round(durationSeconds / 60)} min
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Total Time</div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {completedCount} of {exerciseLogs.length}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Exercises Done</div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <Dumbbell className="w-4 h-4 mx-auto text-blue-600 mb-1" />
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {totalSetsDone} Sets
              </div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Sets Logged</div>
            </div>
          </div>

          {/* Skipped Notice if any */}
          {skippedCount > 0 && (
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300">
              <span className="font-bold">{skippedCount} exercise(s) were safely skipped or replaced today:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {exerciseLogs.filter(e => e.skipped).map((e, idx) => (
                  <li key={idx}>{e.name} {e.skipReason ? `(${e.skipReason})` : ''}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Difficulty Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              How did this session feel overall? (RPE)
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {difficultyLevels.map((lvl) => (
                <button
                  key={lvl.val}
                  type="button"
                  onClick={() => setDifficultyRating(lvl.val)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                    difficultyRating === lvl.val
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-600 text-teal-800 dark:text-teal-300 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className={difficultyRating === lvl.val ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}>
                    {lvl.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] leading-tight font-semibold">
                    {lvl.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Symptom Checklist */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Symptom & Comfort Check
            </label>
            <div className="grid grid-cols-2 gap-2">
              {symptomOptions.map((sym, idx) => {
                const isSelected = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personal Session Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Personal Notes (Optional)
            </label>
            <textarea
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="e.g. Felt great on sit-to-stands; used 2kg dumbbells on seated curls..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-20"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 transition"
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save to Workout History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

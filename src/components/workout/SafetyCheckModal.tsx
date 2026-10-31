import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, XCircle, AlertCircle, PhoneCall, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SafetyCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const SafetyCheckModal: React.FC<SafetyCheckModalProps> = ({ isOpen, onClose, onProceed }) => {
  const { activeProfile } = useApp();

  const [dizzy, setDizzy] = useState<boolean | null>(null);
  const [worseningBackPain, setWorseningBackPain] = useState<boolean | null>(null);
  const [neurologicalSymptoms, setNeurologicalSymptoms] = useState<boolean | null>(null);
  const [followsRestrictions, setFollowsRestrictions] = useState<boolean | null>(null);

  if (!isOpen) return null;

  // Evaluation
  const hasSafetyRedFlag = dizzy === true || worseningBackPain === true || neurologicalSymptoms === true;
  const isFormComplete = dizzy !== null && worseningBackPain !== null && neurologicalSymptoms !== null && followsRestrictions !== null;
  const canSafelyProceed = isFormComplete && !hasSafetyRedFlag && followsRestrictions === true;

  const handleStartWorkout = () => {
    if (canSafelyProceed) {
      onProceed();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">
                Pre-Workout Safety Check
              </h2>
              <p className="text-xs text-teal-100 mt-0.5">
                Clinical safety triage for {activeProfile.name} before starting
              </p>
            </div>
          </div>
        </div>

        {/* Content Questions */}
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Question 1: Vertigo / Dizziness */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Do you currently feel dizzy, lightheaded, or unsteady on your feet right now?</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDizzy(false)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  dizzy === false
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                No, Feeling Stable
              </button>
              <button
                type="button"
                onClick={() => setDizzy(true)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  dizzy === true
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Yes, Feeling Dizzy
              </button>
            </div>
          </div>

          {/* Question 2: Lower-Back Pain */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Do you have any new or worsening lower-back pain today?</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setWorseningBackPain(false)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  worseningBackPain === false
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                No New Pain
              </button>
              <button
                type="button"
                onClick={() => setWorseningBackPain(true)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  worseningBackPain === true
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Yes, Pain is Worse
              </button>
            </div>
          </div>

          {/* Question 3: Neurological Symptoms */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Are there any new numbness, tingling, or weakness radiating into your legs or feet?</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setNeurologicalSymptoms(false)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  neurologicalSymptoms === false
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                None Present
              </button>
              <button
                type="button"
                onClick={() => setNeurologicalSymptoms(true)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  neurologicalSymptoms === true
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Yes, New Numbness
              </button>
            </div>
          </div>

          {/* Question 4: Follows Guidance */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Does today's session follow your doctor or physiotherapist's current guidance?</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFollowsRestrictions(true)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  followsRestrictions === true
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Yes, Follows Guidance
              </button>
              <button
                type="button"
                onClick={() => setFollowsRestrictions(false)}
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                  followsRestrictions === false
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                Uncertain / Needs Review
              </button>
            </div>
          </div>

          {/* DANGER ALERT IF RED FLAGS DETECTED */}
          {hasSafetyRedFlag && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span>Workout Paused for Your Safety</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
                {dizzy
                  ? 'Active dizziness or unsteadiness significantly increases fall risk. Workouts involving standing or balance should NOT be started today.'
                  : worseningBackPain
                  ? 'Worsening back pain indicates your spine requires rest. Do not perform physical exertion through pain.'
                  : 'New leg numbness or weakness requires medical assessment before continuing exercise.'}
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-rose-950 text-xs text-rose-800 dark:text-rose-300 font-medium">
                <strong>Recommended Alternative:</strong> Rest today, stay hydrated, or try our seated gentle breathing relaxation session on the Recovery page.
              </div>
            </div>
          )}

          {/* URGENT RED FLAG EMERGENCY WARNING CARD */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>When to Seek Immediate Medical Evaluation:</span>
            </div>
            <p>
              If you ever experience loss of bladder or bowel control, sudden severe numbness in the groin area (saddle anesthesia), or progressive inability to lift your foot/walk, seek urgent emergency medical assessment immediately.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel Workout
          </button>

          <button
            type="button"
            disabled={!canSafelyProceed}
            onClick={handleStartWorkout}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 ${
              canSafelyProceed
                ? 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Cleared — Start Workout</span>
          </button>
        </div>
      </div>
    </div>
  );
};


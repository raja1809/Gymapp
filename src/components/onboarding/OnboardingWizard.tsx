import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { 
  Heart, 
  ShieldCheck, 
  Dumbbell, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { 
    profiles, 
    updateProfile, 
    switchProfile, 
    updateSettings, 
    setShowOnboarding 
  } = useApp();

  const [step, setStep] = useState<number>(1); // 1: Welcome, 2: Mom Setup, 3: Sister Setup, 4: Ready
  const [selectedInitialProfile, setSelectedInitialProfile] = useState<'mom' | 'sister'>('mom');

  // Mom Config form states
  const [momAge, setMomAge] = useState<number>(50);
  const [exactBackDiagnosis, setExactBackDiagnosis] = useState<string>(
    profiles.mom?.momConfig?.exactBackDiagnosis || 'Lower-back bone weakness (physiotherapy guidance received)'
  );
  const [hasOsteoporosis, setHasOsteoporosis] = useState<boolean>(
    profiles.mom?.momConfig?.hasOsteoporosisOrSpinalFracture || false
  );
  const [vertigoActive, setVertigoActive] = useState<boolean>(
    profiles.mom?.momConfig?.vertigoActive ?? true
  );
  const [vertigoTriggers, setVertigoTriggers] = useState<string>(
    profiles.mom?.momConfig?.vertigoTriggers.join(', ') || 'Rapid head turning, sudden postural changes'
  );
  const [sessionDurationMom, setSessionDurationMom] = useState<number>(20);

  // Sister Config form states
  const [sisterAge, setSisterAge] = useState<number>(24);
  const [sisterGoals, setSisterGoals] = useState<string[]>([
    'general_fitness',
    'strength',
    'muscle_building'
  ]);
  const [sisterMedicalRestrictions, setSisterMedicalRestrictions] = useState<string>('');

  const handleFinishOnboarding = () => {
    // Save Mom Profile updates
    if (profiles.mom) {
      const updatedMom: UserProfile = {
        ...profiles.mom,
        age: momAge,
        momConfig: {
          ...profiles.mom.momConfig!,
          exactBackDiagnosis,
          hasOsteoporosisOrSpinalFracture: hasOsteoporosis,
          vertigoActive,
          vertigoTriggers: vertigoTriggers.split(',').map((s) => s.trim()).filter(Boolean),
          sessionDuration: sessionDurationMom
        }
      };
      updateProfile(updatedMom);
    }

    // Save Sister Profile updates
    if (profiles.sister) {
      const updatedSister: UserProfile = {
        ...profiles.sister,
        age: sisterAge,
        sisterConfig: {
          ...profiles.sister.sisterConfig!,
          goals: sisterGoals as any,
          medicalRestrictions: sisterMedicalRestrictions
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        }
      };
      updateProfile(updatedSister);
    }

    updateSettings({ hasCompletedOnboarding: true });
    switchProfile(selectedInitialProfile);
    setShowOnboarding(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              FF
            </div>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
              FamilyFit Setup
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <span>Step {step} of 4</span>
            <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden ml-2">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                Welcome to FamilyFit
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                A personalized companion built for home workouts using looped resistance bands and your Amazon Brand Symactive PVC 3-in-1 convertible dumbbells.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>Profile 1: Mom (Age 50)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tailored specifically for lower-back bone weakness & vertigo. Chair-supported, zero loaded spinal flexion, with pre-workout safety screening.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm">
                  <Dumbbell className="w-5 h-5 text-blue-600" />
                  <span>Profile 2: Sister</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tailored for regular home fitness, strength building, volume progression, and progressive overload with convertible dumbbells.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <span>Configure Mom's Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MOM CLINICAL CUSTOMIZATION */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                Safety First
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                Configure Mom's Health Guidelines
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                We do not assume diagnoses based solely on 'weak bones'—please confirm known clinical guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={momAge}
                    onChange={(e) => setMomAge(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Target Session Duration
                  </label>
                  <select
                    value={sessionDurationMom}
                    onChange={(e) => setSessionDurationMom(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={20}>20 Minutes (Recommended)</option>
                    <option value={30}>30 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Exact Back / Bone Diagnosis
                </label>
                <input
                  type="text"
                  value={exactBackDiagnosis}
                  onChange={(e) => setExactBackDiagnosis(e.target.value)}
                  placeholder="e.g. Lower-back bone weakness, lumbar facet tightness"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Osteoporosis or Prior Spinal Fracture?
                  </div>
                  <div className="text-[11px] text-slate-400">
                    If yes, all loaded forward bending and sit-ups are strictly eliminated.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasOsteoporosis}
                  onChange={(e) => setHasOsteoporosis(e.target.checked)}
                  className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Is Vertigo Currently Active / Easily Triggered?
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Enforces eye-level focal cues and removes inverted poses.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={vertigoActive}
                  onChange={(e) => setVertigoActive(e.target.checked)}
                  className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Known Vertigo Triggers
                </label>
                <input
                  type="text"
                  value={vertigoTriggers}
                  onChange={(e) => setVertigoTriggers(e.target.value)}
                  placeholder="e.g. Quick head turning, looking up suddenly, quick standing"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <span>Next: Sister's Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SISTER FITNESS SETUP */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/50">
                Strength & Fitness
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                Configure Sister's Goals
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Personalized progression with dumbbells and resistance bands.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={sisterAge}
                  onChange={(e) => setSisterAge(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Primary Fitness Goals
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'general_fitness', label: 'General Fitness' },
                    { id: 'strength', label: 'Overall Strength' },
                    { id: 'muscle_building', label: 'Muscle Tone & Building' },
                    { id: 'mobility', label: 'Mobility & Posture' },
                    { id: 'weight_management', label: 'Weight Management' }
                  ].map((g) => {
                    const isSelected = sisterGoals.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSisterGoals(sisterGoals.filter((x) => x !== g.id));
                          } else {
                            setSisterGoals([...sisterGoals, g.id]);
                          }
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition text-left ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-900 dark:text-blue-200 shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Medical Restrictions (If any)
                </label>
                <input
                  type="text"
                  value={sisterMedicalRestrictions}
                  onChange={(e) => setSisterMedicalRestrictions(e.target.value)}
                  placeholder="e.g. Mild wrist sprain history (or leave empty)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <span>Review & Finish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SELECTION & LAUNCH */}
        {step === 4 && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Profiles Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Who will be using FamilyFit first right now? You can switch profiles anytime in 1 click.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setSelectedInitialProfile('mom')}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  selectedInitialProfile === 'mom'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center">
                  M
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Mom</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Physiotherapy & Bone Safety</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInitialProfile('sister')}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  selectedInitialProfile === 'sister'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center">
                  S
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Sister</div>
                  <div className="text-[11px] text-blue-600 font-semibold">Home Fitness & Strength</div>
                </div>
              </button>
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full max-w-sm mx-auto py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-lg shadow-teal-600/20 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Launch FamilyFit</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


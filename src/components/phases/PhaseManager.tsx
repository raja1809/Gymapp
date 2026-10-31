import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrainingPhase } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  Sparkles,
  FileCheck2,
  Calendar,
  X
} from 'lucide-react';

export const PhaseManager: React.FC = () => {
  const { activeProfile, updateProfile, workoutLogs } = useApp();
  const [showClinicianUnlockModal, setShowClinicianUnlockModal] = useState<TrainingPhase | null>(null);
  const [clinicianName, setClinicianName] = useState('Dr. Anita (Physiotherapist)');
  const [clinicianNotes, setClinicianNotes] = useState('');

  const completedSessionsCount = workoutLogs.filter((l) => l.profileId === activeProfile.id).length;

  const handleSelectPhase = (phase: TrainingPhase) => {
    // If selecting an unlocked phase
    if (activeProfile.phaseUnlocked[phase]) {
      updateProfile({ ...activeProfile, currentPhase: phase });
    } else {
      // If locked, open clinical unlock dialog for Mom or check criteria
      setShowClinicianUnlockModal(phase);
    }
  };

  const handleConfirmClinicianUnlock = () => {
    if (!showClinicianUnlockModal) return;
    const phaseToUnlock = showClinicianUnlockModal;
    const updatedUnlocked = { ...activeProfile.phaseUnlocked, [phaseToUnlock]: true };

    const approvalKey = phaseToUnlock === 'phase2_intermediate' ? 'intermediateApproved' : 'advancedApproved';
    const dateKey = phaseToUnlock === 'phase2_intermediate' ? 'intermediateApprovalDate' : 'advancedApprovalDate';
    const noteKey = phaseToUnlock === 'phase2_intermediate' ? 'intermediateClinicianNotes' : 'advancedClinicianNotes';

    const updatedProfile = {
      ...activeProfile,
      currentPhase: phaseToUnlock,
      phaseUnlocked: updatedUnlocked,
      phaseClinicianApprovalNotes: {
        ...activeProfile.phaseClinicianApprovalNotes,
        [approvalKey]: true,
        [dateKey]: new Date().toISOString().split('T')[0],
        [noteKey]: clinicianNotes.trim() || `Approved by ${clinicianName}`
      }
    };

    updateProfile(updatedProfile);
    setShowClinicianUnlockModal(null);
  };

  const phases = [
    {
      id: 'phase1_beginner' as TrainingPhase,
      name: 'Phase 1 — Beginner Foundation',
      duration: 'First 4–8 Weeks (or indefinitely)',
      focus: 'Technique, Joint Integrity & Baseline Consistency',
      description: 'Focuses on mastering supported chair mechanics, neutral spinal alignment, comfortable range of motion, and learning equipment safely without pain.',
      criteria: ['Default for all new users', 'Master neutral spine bracing', 'Zero worsening symptoms'],
      sisterSpecs: 'Establish workout habits, light dumbbell adaptation (1–3 kg), foundational bodyweight movement patterns.',
      momSpecs: 'Supported sit-to-stand, supported calf raises, wall push-ups, non-flexion core bracing, comfortable walking.'
    },
    {
      id: 'phase2_intermediate' as TrainingPhase,
      name: 'Phase 2 — Intermediate Stability & Tone',
      duration: '8–12 Weeks (When clinically cleared)',
      focus: 'Gradual Volume Expansion & Muscular Endurance',
      description: 'Increases repetitions, introduces longer holds, and gradually builds functional strength without sacrificing spinal integrity.',
      criteria: [
        'At least 16 completed sessions in Phase 1',
        'Consistently reporting 0 dizziness during sessions',
        activeProfile.relationship === 'mom' ? 'Physiotherapist confirmation of bone load tolerance' : 'Comfort with basic dumbbell loading'
      ],
      sisterSpecs: 'Increase reps (12–15), introduce moderate dumbbell loading (4–6 kg), add 1 set to compound exercises.',
      momSpecs: 'Remain on supported exercises. Subtle progression in repetition hold times. Heavier resistance strictly deferred to clinician guidance.'
    },
    {
      id: 'phase3_advanced' as TrainingPhase,
      name: 'Phase 3 — Advanced Strength & Power',
      duration: 'Long-Term Progressive Training',
      focus: 'Progressive Overload & Peak Stamina',
      description: 'Targeted progressive overload, structured strength stimulus with convertible dumbbells, and maximum muscular engagement.',
      criteria: [
        'At least 32 completed sessions',
        'Demonstrated excellent exercise form under load',
        activeProfile.relationship === 'mom' ? 'Formal Physician / Orthopedic clearance required' : 'Self-reported readiness for higher volume'
      ],
      sisterSpecs: 'Full progressive overload with Symactive 3-in-1 barbell and heavier dumbbells, higher volume, advanced tempo training.',
      momSpecs: 'LOCKED FOR SAFETY. Higher resistance and unsupported balance movements must remain locked unless specifically cleared by physician. Staying in Phase 1 or 2 indefinitely is 100% medically sound.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
            Training Progression Framework
          </span>
          <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
          Phased Training Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
          Phases ensure exercise stress matches physiological readiness. For Mom, safety and bone protection always supersede artificial time-based progression.
        </p>
      </div>

      {/* Mom Clinician Safety Notice Banner */}
      {activeProfile.relationship === 'mom' && (
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Clinical Rule: No Automatic Unlock Based on Elapsed Time</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
            In bone weakness and vertigo conditions, progression is <strong>never automated merely because time has passed</strong>. Mom can remain on the safe Beginner or Intermediate plan indefinitely with exceptional health benefits. Advanced phases require documented clinician approval.
          </p>
        </div>
      )}

      {/* Cards for Phase 1, Phase 2, Phase 3 */}
      <div className="space-y-4">
        {phases.map((phase, idx) => {
          const isCurrent = activeProfile.currentPhase === phase.id;
          const isUnlocked = activeProfile.phaseUnlocked[phase.id];

          return (
            <div
              key={phase.id}
              className={`rounded-3xl border p-6 transition shadow-sm ${
                isCurrent
                  ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-500 ring-2 ring-teal-400/20'
                  : isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-90'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Phase {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {phase.duration}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-teal-600 text-white shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active Phase
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked for Safety
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {phase.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Criteria Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Readiness & Safety Criteria:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                      {phase.criteria.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specific Focus for Current User */}
                  <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                    <strong>Prescription Focus for {activeProfile.name}:</strong>{' '}
                    {activeProfile.relationship === 'mom' ? phase.momSpecs : phase.sisterSpecs}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-2 flex-shrink-0 self-start md:self-center">
                  {isCurrent ? (
                    <div className="px-6 py-2.5 rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 font-bold text-xs flex items-center gap-1.5 justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Current Routine</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => handleSelectPhase(phase.id)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
                    >
                      Switch to this Phase
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPhase(phase.id)}
                      className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Request Clinician Unlock</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clinician Approval Verification Modal */}
      {showClinicianUnlockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-600 font-bold">
                <FileCheck2 className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Confirm Clinician Clearance
                </h3>
              </div>
              <button onClick={() => setShowClinicianUnlockModal(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To safely unlock {showClinicianUnlockModal.replace('_', ' ').toUpperCase()} for {activeProfile.name}, confirm that her doctor or physiotherapist has reviewed her current bone mineral density and balance stability:
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Name / Title of Recommending Clinician
                </label>
                <input
                  type="text"
                  value={clinicianName}
                  onChange={(e) => setClinicianName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Physiotherapist Notes or Approved Modifications
                </label>
                <textarea
                  rows={3}
                  value={clinicianNotes}
                  onChange={(e) => setClinicianNotes(e.target.value)}
                  placeholder="e.g. Cleared for light intermediate band tension; maintain chair support..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowClinicianUnlockModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClinicianUnlock}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Unlock Phase</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


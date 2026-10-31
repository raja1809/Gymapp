import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PhysiotherapyExercise } from '../../types';
import { AddPrescribedExerciseModal } from './AddPrescribedExerciseModal';
import { AnimatedExercise } from '../exercise/AnimatedExercise';
import { 
  HeartHandshake, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Info, 
  FileText,
  UserCheck
} from 'lucide-react';

export const PhysiotherapyPlan: React.FC = () => {
  const { activeProfile, updateProfile } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const handleAddExercise = (newEx: PhysiotherapyExercise) => {
    const updated = [...activeProfile.physiotherapyExercises, newEx];
    updateProfile({ ...activeProfile, physiotherapyExercises: updated });
  };

  const handleDeleteExercise = (id: string) => {
    const updated = activeProfile.physiotherapyExercises.filter((e) => e.id !== id);
    updateProfile({ ...activeProfile, physiotherapyExercises: updated });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
              Clinical Adherence
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
            Physiotherapy Companion
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Dedicated repository for doctor-prescribed therapy, back safety guidelines, and clinical notes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2 self-start sm:self-center flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Prescribed Exercise</span>
        </button>
      </div>

      {/* THREE-TIER SAFETY STATUS EXPLANATION BANNER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>Exercise Safety Classification System</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>General Low-Intensity</span>
            </div>
            <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              Gentle, joint-friendly activities (e.g. supported calf raises, comfortable walking) safe for regular independent practice.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Requires Confirmation</span>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              Requires confirmation that movement mechanics and range of motion are tolerated for her specific back/bone condition.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-900/60 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold text-xs uppercase tracking-wide">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Clinician-Prescribed Only</span>
            </div>
            <p className="text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
              Only perform when specifically recommended by her physiotherapist. Never assumed or automatically generated.
            </p>
          </div>
        </div>
      </div>

      {/* OSTEOPOROSIS & SPINAL FRAGILITY CLINICAL REVIEW FLAGS */}
      <div className="p-5 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 space-y-2">
        <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          <span>Strict Bone Weakness & Osteoporosis Safety Mandate:</span>
        </div>
        <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
          For suspected osteoporosis, osteopenia, or spinal fragility, the following movements are strictly <strong>excluded or flagged for clinician clearance</strong>: loaded forward spinal bending, standard crunches / sit-ups, deep spinal flexion, forceful twisting, high-impact jumping, and unassisted balance drills that increase fall risk.
        </p>
      </div>

      {/* VERTIGO PROTOCOL NOTICE */}
      <div className="p-5 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
          <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <span>Vestibular & Vertigo Safety Standard:</span>
        </div>
        <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          The app will <strong>never automatically prescribe</strong> head rotations, gaze-stabilization drills, or positional maneuvers simply because vertigo was entered. Any vestibular rehabilitation exercise must be individually input here from her treating clinician.
        </p>
      </div>

      {/* ACTIVE PRESCRIBED EXERCISES LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-teal-600" />
            <span>Prescribed Exercises ({activeProfile.physiotherapyExercises.length})</span>
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            Approved by licensed therapists
          </span>
        </div>

        {activeProfile.physiotherapyExercises.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <HeartHandshake className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              No Prescriptions Added Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tap "Add Prescribed Exercise" above to enter your physiotherapist's specific guidance, sets, and precautions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProfile.physiotherapyExercises.map((pt) => {
              const isPreviewing = activePreviewId === pt.id;

              return (
                <div
                  key={pt.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        {pt.prescribedBy || 'Clinician Prescribed'}
                      </span>
                      <button
                        onClick={() => handleDeleteExercise(pt.id)}
                        className="text-slate-400 hover:text-rose-500 transition p-1"
                        title="Delete prescription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {pt.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pt.instructions}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Dosage</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{pt.setsAndReps}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Frequency</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{pt.frequency}</span>
                      </div>
                    </div>

                    {pt.restrictions && (
                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-900 dark:text-amber-300">
                        <strong>Restrictions:</strong> {pt.restrictions}
                      </div>
                    )}

                    {pt.notesFromPhysiotherapist && (
                      <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50 text-xs text-teal-900 dark:text-teal-300 flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-teal-600" />
                        <span><strong>Doctor Notes:</strong> {pt.notesFromPhysiotherapist}</span>
                      </div>
                    )}

                    {/* Expandable Animation Demo */}
                    {isPreviewing && pt.animationType && (
                      <div className="pt-2 animate-in fade-in">
                        <AnimatedExercise
                          exerciseId={pt.id}
                          animationType={pt.animationType}
                          height={200}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setActivePreviewId(isPreviewing ? null : pt.id)}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {isPreviewing ? 'Hide Movement Animation' : 'Show Movement Animation'}
                    </button>
                    <span className="text-[11px] text-slate-400">
                      Prescribed: {pt.datePrescribed || 'Active'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddPrescribedExerciseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddExercise}
      />
    </div>
  );
};


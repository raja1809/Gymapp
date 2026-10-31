import React, { useState } from 'react';
import { PhysiotherapyExercise } from '../../types';
import { X, Plus, HeartHandshake, AlertCircle, CheckCircle } from 'lucide-react';

interface AddPrescribedExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercise: PhysiotherapyExercise) => void;
}

export const AddPrescribedExerciseModal: React.FC<AddPrescribedExerciseModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [setsAndReps, setSetsAndReps] = useState('2 sets of 8–10 reps');
  const [frequency, setFrequency] = useState('3 times per week');
  const [restrictions, setRestrictions] = useState('Zero forward spinal flexion; keep movements pain-free.');
  const [notes, setNotes] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('Dr. Anita (Physiotherapist)');
  const [animationType, setAnimationType] = useState('abdominal-bracing');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newExercise: PhysiotherapyExercise = {
      id: 'pt-' + Date.now(),
      name: name.trim(),
      instructions: instructions.trim(),
      setsAndReps: setsAndReps.trim(),
      frequency: frequency.trim(),
      restrictions: restrictions.trim(),
      notesFromPhysiotherapist: notes.trim(),
      prescribedBy: prescribedBy.trim(),
      datePrescribed: new Date().toISOString().split('T')[0],
      isApproved: true,
      animationType
    };

    onAdd(newExercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5" />
            <h3 className="text-lg font-bold">Add Prescribed Physiotherapy Exercise</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Exercise Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Scapular Retraction or Isometric Wall Press"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Step-by-Step Instructions *
            </label>
            <textarea
              required
              rows={3}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe exact movement posture and technique..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Sets & Reps
              </label>
              <input
                type="text"
                value={setsAndReps}
                onChange={(e) => setSetsAndReps(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Frequency
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Clinical Restrictions & Contraindications
            </label>
            <input
              type="text"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              placeholder="e.g. Avoid loaded spinal flexion, stop if dizzy"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Notes From Physiotherapist / Doctor
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specific therapist cues, precautions, or progression cues..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Prescribed By
              </label>
              <input
                type="text"
                value={prescribedBy}
                onChange={(e) => setPrescribedBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Visual Animation Model
              </label>
              <select
                value={animationType}
                onChange={(e) => setAnimationType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
              >
                <option value="abdominal-bracing">Abdominal Bracing / Supine</option>
                <option value="band-row">Postural Row / Seated</option>
                <option value="wall-push-up">Wall Support / Chest</option>
                <option value="chair-sit-to-stand">Sit to Stand / Functional</option>
                <option value="calf-raises">Supported Calf / Balance</option>
                <option value="box-breathing">Breathing / Vestibular Rest</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Prescription</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


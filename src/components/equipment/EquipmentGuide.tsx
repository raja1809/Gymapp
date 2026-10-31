import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Dumbbell, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';

export const EquipmentGuide: React.FC = () => {
  const { activeProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'dumbbells' | 'bands' | 'chair' | 'mat'>('dumbbells');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
            Safety & Assembly Manual
          </span>
          <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
          Equipment Mastery & Safety Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
          Detailed safety protocols for your Amazon Brand Symactive PVC 3-in-1 Convertible Dumbbell set, looped resistance bands, and sturdy chair support.
        </p>
      </div>

      {/* Equipment Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl max-w-xl">
        <button
          onClick={() => setActiveTab('dumbbells')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'dumbbells'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Symactive 3-in-1</span>
        </button>

        <button
          onClick={() => setActiveTab('bands')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'bands'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Resistance Bands</span>
        </button>

        <button
          onClick={() => setActiveTab('chair')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'chair'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Chair & Support</span>
        </button>

        <button
          onClick={() => setActiveTab('mat')}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'mat'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Exercise Mat</span>
        </button>
      </div>

      {/* SYMACTIVE 3-IN-1 DUMBBELL GUIDE */}
      {activeTab === 'dumbbells' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Amazon Brand Symactive PVC 3-in-1 Convertible Set
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  Versatile modular design configured in seconds as dual dumbbells, barbell, or kettlebells.
                </p>
              </div>
            </div>

            {/* 3 Configurations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  Mode A: Independent Dumbbells
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Pair of Dumbbells
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Slide PVC weight plates equally onto both short bars. Screw star spinlock collars clockwise firmly until snug against plates.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-white dark:bg-slate-800 p-2 rounded-xl">
                  Best for: Biceps curls, lateral raises, seated presses.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Mode B: Barbell Connector
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Foam Padded Barbell
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Thread both short bars into the center foam connecting rod. Ensures balanced bilateral two-handed grip.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-white dark:bg-slate-800 p-2 rounded-xl">
                  Best for: Sister squats, Romanian deadlifts, overhead presses.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Mode C: Kettlebell Handle
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Single or Double Grip Kettlebell
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Attach ergonomic push-up handle base to central pin with desired plate stack.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-white dark:bg-slate-800 p-2 rounded-xl">
                  Best for: Goblet squats, Romanian deadlift pulls.
                </div>
              </div>
            </div>

            {/* Spinlock Inspection Safety Checklist */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>Pre-Lift Spinlock Collar Verification (Mandatory):</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Thread check:</strong> Spin collars completely flush against plates. Shake lightly over the floor before lifting to ensure zero plate rattle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Load balance:</strong> Never load uneven plate weights on opposing sides of the same dumbbell.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Mom's recommendation:</strong> Start with unweighted bar or 1 kg per side. Do not progress dumbbell weight without therapist clearance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* RESISTANCE BANDS GUIDE */}
      {activeTab === 'bands' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Resistance Bands Safety & Anchor Protocols
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  Linear elastic tension protects joints while strengthening upper back posture without heavy spinal compression.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  1. Inspect Before Every Rep
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Stretch the band gently under good lighting. Check for micro-tears, punctures, thinning edges, or dry rot. Discard damaged bands immediately.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  2. Secure Foot & Door Anchors
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When looping under feet, place band directly across midfoot / shoe arches (never at toes where it could slip). When using doors, anchor on the closing side of the frame.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  3. Controlled Eccentric Return
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Resist the band on the way back for 2–3 seconds. Never allow the band to snap your arms or torso forward suddenly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAIR & SUPPORT GUIDE */}
      {activeTab === 'chair' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Sturdy Chair & Wall Safety Standards
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  Crucial for vestibular equilibrium and lower-back bone protection.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Non-Rolling Only:</strong> Never use an office rolling swivel chair or lightweight folding chair. Use a heavy, solid wooden or metal dining chair with rubber feet.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Floor Grip:</strong> Place chair on a non-slip rug or solid floor. Ensure the chair cannot slide backward when descending in sit-to-stand.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Wall Clearance:</strong> For wall push-ups, clear picture frames, hooks, and floor cords. Stand with both feet flat and clean rubber soles.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE MAT GUIDE */}
      {activeTab === 'mat' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Floor Mat Transitions & Spine Cushioning
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  How to safely get down to and up from the floor without straining the lower back or provoking dizziness.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block">The 4-Point Chair Transfer Technique:</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Place hands firmly on the chair seat.</li>
                  <li>Lower one knee to the mat, then the second knee (half-kneeling position).</li>
                  <li>Walk hands down onto the mat, transitioning into all-fours.</li>
                  <li>Roll gently onto your side, then onto your back with knees bent.</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 text-xs text-teal-900 dark:text-teal-300">
                <strong>Firm Bed Alternative for Mom:</strong> If getting down to floor level provokes vertigo or lumbar stiffness, supine exercises (glute bridges, pelvic tilts, abdominal bracing) can be safely performed on a firm mattress or elevated therapy bed!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


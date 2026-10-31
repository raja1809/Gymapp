import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { resetAllData, exportDataAsJSON } from '../../utils/storage';
import { 
  Settings as SettingsIcon, 
  User, 
  Users, 
  Type, 
  Eye, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Download, 
  RotateCcw, 
  Check, 
  Calendar, 
  Clock, 
  Dumbbell,
  ShieldAlert
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    activeProfile, 
    profiles, 
    switchProfile, 
    updateProfile, 
    settings, 
    updateSettings 
  } = useApp();

  const [sessionDuration, setSessionDuration] = useState(
    activeProfile.relationship === 'mom'
      ? activeProfile.momConfig?.sessionDuration || 20
      : activeProfile.sisterConfig?.sessionDuration || 35
  );

  const [savedBanner, setSavedBanner] = useState(false);

  const handleSaveProfileChanges = () => {
    if (activeProfile.relationship === 'mom' && activeProfile.momConfig) {
      updateProfile({
        ...activeProfile,
        momConfig: {
          ...activeProfile.momConfig,
          sessionDuration
        }
      });
    } else if (activeProfile.sisterConfig) {
      updateProfile({
        ...activeProfile,
        sisterConfig: {
          ...activeProfile.sisterConfig,
          sessionDuration
        }
      });
    }
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all profiles and history? This cannot be undone.')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Settings & Customization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Personalize display accessibility, audio preferences, and profile specifics.
          </p>
        </div>

        {savedBanner && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Saved!</span>
          </span>
        )}
      </div>

      {/* Profile Switching Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" />
          <span>Active Family Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(profiles).map((prof) => {
            const isSelected = prof.id === activeProfile.id;
            return (
              <div
                key={prof.id}
                onClick={() => switchProfile(prof.id)}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 ring-2 ring-teal-400/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm ${
                    prof.relationship === 'mom' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {prof.name.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{prof.name}</h4>
                    <p className="text-xs text-slate-500">
                      Age {prof.age} • {prof.relationship === 'mom' ? 'Bone Safety / PT' : 'Strength Program'}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Active
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">Switch</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ACCESSIBILITY & DISPLAY SETTINGS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Type className="w-5 h-5 text-teal-600" />
          <span>Accessibility & Visual Comfort</span>
        </h3>

        {/* Text Size (Normal, Large, Extra Large - crucial for older adults) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Text Size Scale (Recommended 'Large' or 'Extra Large' for Mom)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'normal' as const, label: 'Standard (16px)' },
              { val: 'large' as const, label: 'Large (18px)' },
              { val: 'xlarge' as const, label: 'Extra Large (20px)' }
            ].map((s) => (
              <button
                key={s.val}
                type="button"
                onClick={() => updateSettings({ textSize: s.val })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
                  settings.textSize === s.val
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode & Reduced Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {settings.darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Color Theme</div>
                <div className="text-[11px] text-slate-400">Dark / Light contrast</div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.darkMode ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {settings.darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-teal-600" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Reduced Motion</div>
                <div className="text-[11px] text-slate-400">Minimizes visual flutter for vertigo</div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                settings.reducedMotion ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {settings.reducedMotion ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Audio / Synthesizer Sound */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-teal-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Sound Effects & Bells</div>
              <div className="text-[11px] text-slate-400">Timer alerts and completion chime</div>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              settings.soundEnabled ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {settings.soundEnabled ? 'On' : 'Muted'}
          </button>
        </div>
      </div>

      {/* PROFILE WORKOUT PREFERENCES */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          <span>Session Duration Target for {activeProfile.name}</span>
        </h3>

        <div className="flex items-center gap-3">
          {[15, 20, 30, 45].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setSessionDuration(mins)}
              className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${
                sessionDuration === mins
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {mins} Minutes
            </button>
          ))}
        </div>

        <button
          onClick={handleSaveProfileChanges}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition active:scale-95"
        >
          Save Preferences
        </button>
      </div>

      {/* DATA BACKUP & RESET */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Data Management & Reset
        </h3>
        <p className="text-xs text-slate-500">
          Export your entire workout logs and profile settings, or reset back to default.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => {
              const json = exportDataAsJSON();
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `FamilyFit_Backup.json`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup (JSON)</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All App Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};


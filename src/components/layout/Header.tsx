import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Moon, Sun, ShieldAlert, Phone, HelpCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeProfile, 
    profiles, 
    switchProfile, 
    settings, 
    updateSettings, 
    setShowApkModal,
    setShowOnboarding
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-teal-500/20">
          FF
        </div>
        <div>
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>FamilyFit</span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
              Pro
            </span>
          </span>
          <span className="text-[10px] text-slate-400 font-semibold block leading-none">
            Home Companion & Physio
          </span>
        </div>
      </div>

      {/* Right Controls: Profile Pill Switcher, Dark mode, APK Install, Guide */}
      <div className="flex items-center gap-2">
        {/* Profile Quick Toggle Button */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
          {Object.values(profiles).map((prof) => {
            const isSelected = prof.id === activeProfile.id;
            return (
              <button
                key={prof.id}
                onClick={() => switchProfile(prof.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
                title={`Switch profile to ${prof.name}`}
              >
                <span className={`w-2 h-2 rounded-full ${prof.relationship === 'mom' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <span>{prof.name}</span>
              </button>
            );
          })}
        </div>

        {/* APK Install Button */}
        <button
          onClick={() => setShowApkModal(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition"
          title="Install as Android App on Phone"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Install APK</span>
        </button>

        {/* Dark Mode Quick Toggle */}
        <button
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {settings.darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>

        {/* Onboarding re-run */}
        <button
          onClick={() => setShowOnboarding(true)}
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition"
          title="Restart Onboarding Setup Wizard"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};


import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Dumbbell, 
  HeartHandshake, 
  Moon, 
  BarChart3, 
  Settings as SettingsIcon 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeProfile } = useApp();

  const mobileTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Today', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'library', label: 'Exercises', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'physiotherapy', label: 'Physio', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'recovery', label: 'Rest', icon: <Moon className="w-5 h-5" /> },
    { id: 'progress', label: 'History', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-2 py-2 flex items-center justify-around pb-safe">
      {mobileTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
              isActive
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-700'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.id === 'physiotherapy' && activeProfile.relationship === 'mom' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
            <span className="text-[10px] mt-1 leading-tight tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};


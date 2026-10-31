import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Dumbbell, 
  HeartHandshake, 
  Layers, 
  Moon, 
  BarChart3, 
  BookOpen, 
  Settings as SettingsIcon,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeProfile } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'library', label: 'Exercise Library', icon: <Dumbbell className="w-5 h-5" /> },
    { 
      id: 'physiotherapy', 
      label: 'Physiotherapy', 
      icon: <HeartHandshake className="w-5 h-5" />,
      badge: activeProfile.relationship === 'mom' ? `${activeProfile.physiotherapyExercises.length} Prescribed` : undefined
    },
    { id: 'phases', label: 'Training Phases', icon: <Layers className="w-5 h-5" /> },
    { id: 'recovery', label: 'Rest & Mobility', icon: <Moon className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress & Logs', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'equipment', label: 'Equipment Manual', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-4 space-y-6 flex-shrink-0 min-h-[calc(100vh-65px)]">
      {/* Profile Card Snippet */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Selected Profile
          </span>
          <span className={`w-2.5 h-2.5 rounded-full ${activeProfile.relationship === 'mom' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
        </div>
        <div className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <span>{activeProfile.name}</span>
          <span className="text-xs font-semibold text-slate-400">(Age {activeProfile.age})</span>
        </div>
        <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
          {activeProfile.relationship === 'mom' ? 'Bone Weakness & Vertigo Safe' : 'Progressive Strength Split'}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Safety Compliance Tag */}
      <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-900/40 text-[11px] text-teal-900 dark:text-teal-300 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
        <span>Clinical Guidance Mode Active</span>
      </div>
    </aside>
  );
};


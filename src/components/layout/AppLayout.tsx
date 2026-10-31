import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Dashboard } from '../dashboard/Dashboard';
import { ExerciseLibrary } from '../exercise/ExerciseLibrary';
import { PhysiotherapyPlan } from '../physiotherapy/PhysiotherapyPlan';
import { PhaseManager } from '../phases/PhaseManager';
import { RecoveryDay } from '../recovery/RecoveryDay';
import { ProgressDashboard } from '../progress/ProgressDashboard';
import { EquipmentGuide } from '../equipment/EquipmentGuide';
import { SettingsModal } from '../settings/SettingsModal';
import { ExerciseDetailModal } from '../exercise/ExerciseDetailModal';
import { WorkoutPlayer } from '../workout/WorkoutPlayer';
import { SafetyCheckModal } from '../workout/SafetyCheckModal';
import { ApkInstallModal } from '../install/ApkInstallModal';
import { OnboardingWizard } from '../onboarding/OnboardingWizard';

export const AppLayout: React.FC = () => {
  const { 
    activeTab, 
    selectedExercise, 
    setSelectedExercise,
    activeWorkoutDayIndex,
    isSafetyCheckOpen,
    setIsSafetyCheckOpen,
    confirmStartWorkoutAfterSafetyCheck,
    showOnboarding
  } = useApp();

  // If in an active workout session, render the full-screen interactive workout player!
  if (activeWorkoutDayIndex !== null) {
    return <WorkoutPlayer dayIndex={activeWorkoutDayIndex} />;
  }

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <ExerciseLibrary />;
      case 'physiotherapy':
        return <PhysiotherapyPlan />;
      case 'phases':
        return <PhaseManager />;
      case 'recovery':
        return <RecoveryDay />;
      case 'progress':
        return <ProgressDashboard />;
      case 'equipment':
        return <EquipmentGuide />;
      case 'settings':
        return <SettingsModal />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-8">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modal: Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* Modal: Pre-workout Safety Check for Mom */}
      <SafetyCheckModal
        isOpen={isSafetyCheckOpen}
        onClose={() => setIsSafetyCheckOpen(false)}
        onProceed={confirmStartWorkoutAfterSafetyCheck}
      />

      {/* Modal: Mobile APK / Install Helper */}
      <ApkInstallModal />

      {/* Wizard: Onboarding */}
      {showOnboarding && <OnboardingWizard />}
    </div>
  );
};


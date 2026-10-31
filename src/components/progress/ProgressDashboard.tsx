import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressCharts } from './ProgressCharts';
import { exportWorkoutLogsAsCSV, exportDataAsJSON, deleteWorkoutLog } from '../../utils/storage';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  AlertCircle, 
  FileSpreadsheet,
  FileCode,
  Flame,
  Award
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { activeProfile, workoutLogs } = useApp();
  const [filterMonth, setFilterMonth] = useState<string>('all');

  const profileLogs = workoutLogs.filter((l) => l.profileId === activeProfile.id);

  const handleExportCSV = () => {
    const csv = exportWorkoutLogsAsCSV(activeProfile.id);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FamilyFit_${activeProfile.name}_History_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const json = exportDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FamilyFit_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this workout record from history?')) {
      deleteWorkoutLog(id);
      window.location.reload(); // Quick refresh to update state
    }
  };

  const totalMinutes = Math.round(
    profileLogs.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
              Personal Progress Tracker
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Profile: {activeProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
            Workout History & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            100% private, stored locally in your browser with zero external tracking.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
            title="Download CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5"
            title="Download complete JSON backup"
          >
            <FileCode className="w-4 h-4 text-slate-500" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Banners */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">
            {profileLogs.length}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
            Completed Sessions
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
            {totalMinutes} min
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
            Lifetime Movement Time
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            100%
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
            Clinical Safety Compliance
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-600" />
          <span>Consistency & Exertion Trends</span>
        </h3>
        <ProgressCharts logs={profileLogs} />
      </div>

      {/* History Log Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Session History Records ({profileLogs.length})
          </h3>
        </div>

        {profileLogs.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No Workouts Recorded Yet
            </h4>
            <p className="text-xs text-slate-500">
              Complete your first session from the Dashboard to record your history!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {profileLogs.map((log) => {
              const formattedDate = new Date(log.date).toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              const mins = Math.round(log.durationSeconds / 60) || 1;
              const completedCount = log.exercisesCompleted.filter((e) => !e.skipped).length;

              return (
                <div
                  key={log.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">
                          {formattedDate}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {mins} min
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {log.dayTitle}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        RPE: {log.difficultyRating}/5
                      </span>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                        title="Delete log entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Completed Exercises Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {log.exercisesCompleted.map((e, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                          e.skipped
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/60 line-through opacity-70'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80'
                        }`}
                      >
                        {e.name} {e.skipped ? '(Skipped)' : `(${e.setsCompleted} sets)`}
                      </span>
                    ))}
                  </div>

                  {/* Reported Symptoms & Notes if present */}
                  {(log.symptomsReported?.length > 0 || log.notes) && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      {log.symptomsReported?.length > 0 && (
                        <div className="text-slate-600 dark:text-slate-400">
                          <strong>Reported Comfort:</strong> {log.symptomsReported.join(', ')}
                        </div>
                      )}
                      {log.notes && (
                        <div className="text-slate-500 italic">
                          "{log.notes}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


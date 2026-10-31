import React from 'react';
import { WorkoutSessionLog } from '../../types';

interface ProgressChartsProps {
  logs: WorkoutSessionLog[];
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-400">
        No completed workouts logged yet. Finish your first workout to see visual analytics!
      </div>
    );
  }

  // Take the last 7 sessions for the chart
  const recentLogs = [...logs].reverse().slice(-7);

  // 1. Duration Chart Data (max minutes)
  const maxDuration = Math.max(...recentLogs.map((l) => Math.round(l.durationSeconds / 60)), 30);
  // 2. Difficulty Rating Data (1 to 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Session Duration Chart (SVG Bar Chart) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Session Duration (Minutes)
          </h4>
          <span className="text-xs font-bold text-teal-600">
            Last {recentLogs.length} Sessions
          </span>
        </div>

        <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2">
          {recentLogs.map((log, idx) => {
            const mins = Math.round(log.durationSeconds / 60) || 1;
            const heightPercent = Math.max(15, (mins / maxDuration) * 100);
            const dateLabel = new Date(log.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 opacity-0 group-hover:opacity-100 transition">
                  {mins}m
                </span>
                <div
                  className="w-full max-w-[28px] bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-lg transition-all duration-500 hover:brightness-110"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                  {dateLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty (RPE) Trend (SVG Line Chart) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Perceived Exertion (1 = Easy, 5 = Max)
          </h4>
          <span className="text-xs font-bold text-blue-600">
            Comfort Consistency
          </span>
        </div>

        <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2">
          {recentLogs.map((log, idx) => {
            const rating = log.difficultyRating || 3;
            const heightPercent = (rating / 5) * 85;
            const dateLabel = new Date(log.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
            const colors = ['#10b981', '#14b8a6', '#0284c7', '#f59e0b', '#f43f5e'];
            const barColor = colors[rating - 1] || '#14b8a6';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition">
                  RPE {rating}
                </span>
                <div
                  className="w-full max-w-[28px] rounded-t-lg transition-all duration-500 hover:scale-105"
                  style={{ height: `${heightPercent}%`, backgroundColor: barColor }}
                />
                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                  {dateLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


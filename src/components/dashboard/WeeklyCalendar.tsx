import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, CircleDashed, Moon, Dumbbell, Sparkles } from 'lucide-react';

export const WeeklyCalendar: React.FC = () => {
  const { activeProfile, workoutLogs, startWorkout } = useApp();

  // Current day of week (0 = Sunday, 1 = Monday, ...)
  const todayDow = new Date().getDay();

  // Check which days have been completed in the current week
  const isDayCompleted = (dow: number) => {
    return workoutLogs.some((log) => {
      const logDate = new Date(log.date);
      return logDate.getDay() === dow && log.profileId === activeProfile.id;
    });
  };

  const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Weekly Split & Schedule</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50">
              4-Day Active Plan
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Balanced training and restorative recovery intervals
          </p>
        </div>
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
        {activeProfile.weeklySchedule.map((day) => {
          const isToday = day.dayOfWeek === todayDow;
          const completed = isDayCompleted(day.dayOfWeek);

          return (
            <div
              key={day.dayOfWeek}
              onClick={() => {
                if (!day.isRestOrRecovery) {
                  startWorkout(day.dayOfWeek);
                }
              }}
              className={`relative p-3.5 rounded-2xl border transition flex flex-col justify-between select-none ${
                isToday
                  ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-2 ring-teal-400/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'
              } ${
                day.isRestOrRecovery
                  ? 'opacity-85'
                  : 'cursor-pointer hover:border-teal-400 hover:shadow-sm'
              }`}
            >
              {/* Day Name & Badge */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase tracking-wider ${isToday ? 'text-teal-700 dark:text-teal-300' : 'text-slate-500'}`}>
                  {dayAbbreviations[day.dayOfWeek]}
                </span>
                {isToday && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-teal-600 text-white leading-none">
                    Today
                  </span>
                )}
              </div>

              {/* Status Icon */}
              <div className="my-2.5">
                {completed ? (
                  <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Done</span>
                  </div>
                ) : day.isRestOrRecovery ? (
                  <div className="flex items-center gap-1 text-slate-400 font-semibold text-xs">
                    <Moon className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                    <span>Recovery</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-teal-600 font-bold text-xs">
                    <Dumbbell className="w-4 h-4 flex-shrink-0" />
                    <span>Workout</span>
                  </div>
                )}
              </div>

              {/* Focus Summary */}
              <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
                {day.isRestOrRecovery ? 'Mobility & Rest' : day.title.split('—')[1] || day.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


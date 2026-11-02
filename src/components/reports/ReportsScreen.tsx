import React from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { AnimeMascot } from '../AnimeMascot';
import { ASSETS } from '../../utils/assets';
import { BarChart2, Award, CheckCircle2, Target, CheckSquare, Sparkles, Download, Calendar } from 'lucide-react';

export const ReportsScreen: React.FC = () => {
  const { activities, habits, goals, categories, theme, exportData } = useTaskTime();
  const themeConfig = THEMES[theme];

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const activityCompletionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  const totalHabits = habits.length;
  const activeHabitsWithStreak = habits.filter(h => h.streak > 0).length;

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TaskTime_Analytics_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* HEADER BANNER */}
      <div 
        className="p-6 rounded-3xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-bold text-pink-700">
            <Sparkles className="w-3.5 h-3.5" /> Productivity Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: themeConfig.text }}>
            Growth & Reports Centre
          </h1>
          <p className="text-sm opacity-80 max-w-md">Real analytics based entirely on your personal activity records and habit consistency.</p>
        </div>
        <div className="z-10 bg-white/80 p-3 rounded-2xl border shadow-xs" style={{ borderColor: themeConfig.border }}>
          <AnimeMascot src={ASSETS.cat1} size={110} name="Miyu" role="Analytics Expert" />
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Activity Summary */}
        <div className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Scheduled</h3>
            <Calendar className="w-5 h-5 text-pink-500" />
          </div>
          <div className="text-3xl font-extrabold" style={{ color: themeConfig.accent }}>{activities.length}</div>
          <p className="text-xs opacity-70">Total activities scheduled.</p>
        </div>

        {/* Activity Completion */}
        <div className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Activities Rate</h3>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{activityCompletionRate}%</div>
          <p className="text-xs opacity-70">{completedActivities} completed, {totalActivities - completedActivities} pending.</p>
        </div>

        {/* Habits Consistency */}
        <div className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Active Streaks</h3>
            <CheckSquare className="w-5 h-5 text-pink-500" />
          </div>
          <div className="text-3xl font-extrabold text-pink-600">{activeHabitsWithStreak} / {totalHabits}</div>
          <p className="text-xs opacity-70">Habits currently maintaining a winning streak.</p>
        </div>

        {/* Goals Progress */}
        <div className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Goals Achieved</h3>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-extrabold text-purple-600">{completedGoals} / {totalGoals}</div>
          <p className="text-xs opacity-70">Major milestones accomplished.</p>
        </div>
      </div>

      {/* CATEGORY DISTRIBUTION BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-white border shadow-sm space-y-4" style={{ borderColor: themeConfig.border }}>
        <h3 className="text-base font-bold flex items-center gap-2">
          <BarChart2 className="w-5 h-5" style={{ color: themeConfig.accent }} /> Category Activity Distribution
        </h3>
        <div className="space-y-3">
          {categories.map(cat => {
            const catCount = activities.filter(a => a.categoryId === cat.id).length;
            const percentage = totalActivities > 0 ? Math.round((catCount / totalActivities) * 100) : 0;
            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span>{catCount} activities ({percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-300" style={{ width: `${percentage}%`, backgroundColor: cat.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPORT REPORT BUTTON */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleExport}
          className="px-6 py-3.5 rounded-2xl font-bold text-white text-xs shadow-md flex items-center gap-2 transition-all hover:opacity-95"
          style={{ backgroundColor: themeConfig.accent }}
        >
          <Download className="w-4 h-4" /> EXPORT FULL ANALYTICS BACKUP (JSON)
        </button>
      </div>
    </div>
  );
};

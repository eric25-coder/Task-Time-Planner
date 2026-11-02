import React, { useState } from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { AnimeMascot } from '../AnimeMascot';
import { ASSETS } from '../../utils/assets';
import { CategoryIcon } from '../../utils/categoryIcons';
import { CheckSquare, Plus, CheckCircle2, Circle, Flame, Sparkles, Trash2 } from 'lucide-react';
import { CategoryId, HabitFrequency } from '../../types';

export const HabitsScreen: React.FC = () => {
  const { habits, categories, theme, addHabit, deleteHabit, toggleHabitDate } = useTaskTime();
  const themeConfig = THEMES[theme];

  const todayStr = new Date().toISOString().split('T')[0];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0]?.id || 'personal_dev');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [targetValue, setTargetValue] = useState(1);
  const [unit, setUnit] = useState('times');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name: name.trim(),
      description: description.trim(),
      categoryId,
      icon: 'Sparkles',
      color: '#E88BB5',
      frequency,
      targetValue: Number(targetValue) || 1,
      unit,
      startDate: todayStr,
      paused: false
    });
    setName('');
    setDescription('');
    setShowModal(false);
  };

  const totalActive = habits.filter(h => !h.paused).length;
  const completedToday = habits.filter(h => h.completedDates.includes(todayStr)).length;
  const bestStreakOverall = habits.reduce((max, h) => Math.max(max, h.bestStreak), 0);

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* HEADER & MASCOT BANNER */}
      <div 
        className="p-6 rounded-3xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-bold text-pink-700">
            <Sparkles className="w-3.5 h-3.5" /> Habit Tracker Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: themeConfig.text }}>
            Build Consistency Every Day
          </h1>
          <p className="text-sm opacity-80 max-w-md">Small habits repeated daily compound into extraordinary life achievements.</p>
        </div>
        <div className="z-10 bg-white/80 p-3 rounded-2xl border shadow-xs" style={{ borderColor: themeConfig.border }}>
          <AnimeMascot src={ASSETS.cat3} size={100} name="Koko" role="Habit Coach" />
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-white border shadow-xs text-center" style={{ borderColor: themeConfig.border }}>
          <div className="text-2xl font-extrabold" style={{ color: themeConfig.accent }}>{totalActive}</div>
          <div className="text-xs opacity-70 font-medium">Active Habits</div>
        </div>
        <div className="p-4 rounded-3xl bg-white border shadow-xs text-center" style={{ borderColor: themeConfig.border }}>
          <div className="text-2xl font-extrabold text-emerald-600">{completedToday} / {totalActive}</div>
          <div className="text-xs opacity-70 font-medium">Completed Today</div>
        </div>
        <div className="p-4 rounded-3xl bg-white border shadow-xs text-center" style={{ borderColor: themeConfig.border }}>
          <div className="text-2xl font-extrabold text-amber-600 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 fill-amber-400 text-amber-500" /> {bestStreakOverall}d
          </div>
          <div className="text-xs opacity-70 font-medium">Best Streak</div>
        </div>
      </div>

      {/* CREATE HABIT BUTTON */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Your Daily Routines</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl font-bold text-white text-xs shadow-md flex items-center gap-2 transition-all hover:opacity-95"
          style={{ backgroundColor: themeConfig.accent }}
        >
          <Plus className="w-4 h-4" /> CREATE HABIT
        </button>
      </div>

      {/* HABITS LIST */}
      {habits.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-dashed p-6 space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex justify-center">
            <AnimeMascot src={ASSETS.cat3} size={100} name="Koko" />
          </div>
          <p className="text-sm font-medium opacity-70">No habits created yet. Click '+ CREATE HABIT' to start your consistency journey!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map(habit => {
            const isDoneToday = habit.completedDates.includes(todayStr);
            const cat = categories.find(c => c.id === habit.categoryId);
            return (
              <div
                key={habit.id}
                className={`p-4 rounded-3xl bg-white border shadow-sm transition-all flex items-center justify-between gap-4 ${
                  isDoneToday ? 'bg-emerald-50/40' : ''
                }`}
                style={{ borderColor: themeConfig.border }}
              >
                <div className="flex items-center space-x-3">
                  <button onClick={() => toggleHabitDate(habit.id, todayStr)}>
                    {isDoneToday ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-100" />
                    ) : (
                      <Circle className="w-7 h-7 text-gray-400 hover:text-pink-500 transition-colors" />
                    )}
                  </button>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5" style={{ backgroundColor: `${cat?.color || '#E88BB5'}20`, color: cat?.color || '#E88BB5' }}>
                        <CategoryIcon iconName={cat?.iconName} className="w-3.5 h-3.5" />
                        {cat?.name || 'Habit'}
                      </span>
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {habit.streak} day streak
                      </span>
                    </div>
                    <div className={`text-base font-bold ${isDoneToday ? 'line-through opacity-60' : ''}`}>
                      {habit.name}
                    </div>
                    {habit.description && <div className="text-xs opacity-70">{habit.description}</div>}
                  </div>
                </div>

                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-xs"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE HABIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 bg-white" style={{ borderColor: themeConfig.border }}>
            <h3 className="text-xl font-bold">Create New Habit</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70">Habit Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Read 15 pages of a book"
                  required
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Category</label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full p-3 rounded-2xl border text-sm bg-white"
                  style={{ borderColor: themeConfig.border }}
                >
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Frequency</label>
                <select
                  value={frequency}
                  onChange={e => setFrequency(e.target.value as any)}
                  className="w-full p-3 rounded-2xl border text-sm bg-white"
                  style={{ borderColor: themeConfig.border }}
                >
                  <option value="daily">Every Day</option>
                  <option value="weekdays">Weekdays (Mon-Fri)</option>
                  <option value="weekends">Weekends</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Description / Motivation</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Why is this habit important to you?"
                  rows={2}
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-2xl border font-semibold text-xs"
                  style={{ borderColor: themeConfig.border }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl font-bold text-white text-xs shadow-md"
                  style={{ backgroundColor: themeConfig.accent }}
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

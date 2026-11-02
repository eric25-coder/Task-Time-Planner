import React, { useState } from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { MOTIVATIONAL_QUOTES } from '../../data/quotes';
import { AnimeMascot } from '../AnimeMascot';
import { ASSETS } from '../../utils/assets';
import { 
  Calendar as CalendarIcon, Plus, CheckCircle2, Circle, Clock, 
  Sparkles, ChevronRight, RefreshCw, Heart, AlertCircle, ArrowRight, Flower2
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const { 
    user, selectedDate, setSelectedDate, theme, categories, 
    activities, addActivity, toggleActivityComplete, deleteActivity,
    habits, toggleHabitDate, goals, setActiveTab, setActiveCategoryWorkspace 
  } = useTaskTime();

  const themeConfig = THEMES[theme];

  // Random quote state
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));
  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  // Activity creation modal state
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.id || 'education');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:00');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newGoalText, setNewGoalText] = useState('');

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addActivity({
      title: newTitle.trim(),
      description: newDesc.trim(),
      categoryId: newCategory,
      activityType: 'General',
      date: selectedDate,
      startTime: newStartTime,
      endTime: newEndTime,
      priority: newPriority,
      goal: newGoalText ? { description: newGoalText, targetAmount: 1, unit: 'task', actualAmount: 0 } : undefined,
      recurrence: 'none',
      subtasks: [],
      status: 'upcoming'
    });
    setNewTitle('');
    setNewDesc('');
    setNewGoalText('');
    setShowAddActivityModal(false);
  };

  // Date strip generation (Yesterday, Today, and next 5 days)
  const generateDateStrip = () => {
    const dates = [];
    const today = new Date();
    for (let i = -1; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      dates.push({ dateStr, dayName, dayNum, fullDate: d });
    }
    return dates;
  };

  const dateStrip = generateDateStrip();

  // Filter activities for selected date
  const selectedDateActivities = activities.filter(a => a.date === selectedDate);
  const completedCount = selectedDateActivities.filter(a => a.status === 'completed').length;
  const pendingCount = selectedDateActivities.filter(a => a.status === 'upcoming' || a.status === 'ongoing').length;

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* MOTIVATIONAL BANNER */}
      <div 
        className="p-5 rounded-3xl border shadow-md flex items-center justify-between gap-4 relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: themeConfig.accent }}>
            <Sparkles className="w-4 h-4 animate-spin" /> Daily Motivation
          </div>
          <p className="text-sm md:text-base font-semibold italic" style={{ color: themeConfig.text }}>
            "{currentQuote.text}"
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs opacity-70 font-medium">— {currentQuote.author}</span>
            <button
              onClick={handleNextQuote}
              className="px-3 py-1 rounded-full bg-white/80 border text-xs font-bold shadow-xs hover:bg-white flex items-center gap-1 transition-all"
              style={{ borderColor: themeConfig.border }}
            >
              <RefreshCw className="w-3 h-3" /> Another Quote
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-shrink-0">
          <AnimeMascot src={ASSETS.bg2} size={110} />
        </div>
      </div>

      {/* CATEGORY WORKSPACES QUICK BAR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Category Workspaces</h3>
          <button onClick={() => setActiveTab('activities')} className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-0.5">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryWorkspace(cat.id)}
              className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border shadow-xs hover:scale-102 transition-all"
              style={{ borderColor: themeConfig.border }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs font-bold" style={{ color: themeConfig.text }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DATE STRIP SELECTOR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4" /> Integrated Schedule
          </h3>
          <span className="text-xs font-semibold opacity-70">Selected: {selectedDate}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dateStrip.map(item => {
            const isSelected = item.dateStr === selectedDate;
            return (
              <button
                key={item.dateStr}
                onClick={() => setSelectedDate(item.dateStr)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[64px] border transition-all ${
                  isSelected 
                    ? 'bg-white shadow-md ring-2 scale-105 font-bold' 
                    : 'bg-white/50 hover:bg-white/80 opacity-80'
                }`}
                style={{ borderColor: isSelected ? themeConfig.accent : themeConfig.border }}
              >
                <span className="text-[10px] uppercase opacity-70">{item.dayName}</span>
                <span className="text-lg font-extrabold my-0.5">{item.dayNum}</span>
                {item.dateStr === new Date().toISOString().split('T')[0] && (
                  <span className="text-[9px] px-1.5 rounded-full bg-pink-100 text-pink-700 font-bold">Today</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DAILY PLANNING & TIMELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Your Day</h2>
            <p className="text-xs opacity-70">Plan & manage activities for {selectedDate}</p>
          </div>
          <button
            onClick={() => setShowAddActivityModal(true)}
            className="px-4 py-2.5 rounded-2xl font-bold text-white text-xs shadow-md flex items-center gap-1.5 transition-all hover:opacity-95"
            style={{ backgroundColor: themeConfig.accent }}
          >
            <Plus className="w-4 h-4" /> ADD ACTIVITY
          </button>
        </div>



        {/* Timeline list */}
        {selectedDateActivities.length === 0 ? (
          <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6 space-y-3" style={{ borderColor: themeConfig.border }}>
            <div className="flex justify-center">
              <AnimeMascot src={ASSETS.cat4} size={90} />
            </div>
            <p className="text-sm font-medium opacity-70">No activities scheduled for {selectedDate}. Click '+ ADD ACTIVITY' to begin planning your day!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDateActivities.map(act => {
              const cat = categories.find(c => c.id === act.categoryId);
              const isDone = act.status === 'completed';
              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-3xl border shadow-sm transition-all flex items-start justify-between gap-3 relative overflow-hidden ${
                    isDone ? 'opacity-75 bg-slate-50' : ''
                  }`}
                  style={{ 
                    backgroundColor: isDone ? '#FFFFFF' : `${cat?.color || '#E88BB5'}15`, 
                    borderColor: cat?.color || themeConfig.border 
                  }}
                >
                  {!isDone && (
                    <Flower2 className="absolute -top-1 -right-1 w-10 h-10 opacity-30" style={{ color: cat?.color || themeConfig.accent }} />
                  )
                  }
                  <div className="flex items-start space-x-3">
                    <button onClick={() => toggleActivityComplete(act.id)} className="mt-1">
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-pink-500 transition-colors" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full`} style={{ backgroundColor: `${cat?.color || '#E88BB5'}20`, color: cat?.color || '#E88BB5' }}>
                          {cat?.name || 'General'}
                        </span>
                        <span className="text-[11px] font-semibold opacity-70 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {act.startTime} - {act.endTime}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          act.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          act.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {act.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className={`text-base font-bold ${isDone ? 'line-through opacity-60' : ''}`} style={{ color: themeConfig.text }}>
                        {act.title}
                      </div>
                      {act.description && <div className="text-xs opacity-75">{act.description}</div>}
                      {act.goal && (
                        <div className="text-xs text-pink-600 font-semibold flex items-center gap-1 pt-1">
                          <Target className="w-3.5 h-3.5" /> Goal: {act.goal.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteActivity(act.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-all z-10"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>



      {/* ADD ACTIVITY MODAL */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-4 bg-white max-h-[90vh] overflow-y-auto" style={{ borderColor: themeConfig.border }}>
            <h3 className="text-xl font-bold">Add Activity for {selectedDate}</h3>
            <form onSubmit={handleCreateActivity} className="space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70">Activity Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Study Java Chapters 3 & 4"
                  required
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold opacity-70">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm bg-white"
                    style={{ borderColor: themeConfig.border }}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold opacity-70">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full p-3 rounded-2xl border text-sm bg-white"
                    style={{ borderColor: themeConfig.border }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold opacity-70">Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={e => setNewStartTime(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm"
                    style={{ borderColor: themeConfig.border }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold opacity-70">End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={e => setNewEndTime(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm"
                    style={{ borderColor: themeConfig.border }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Description & Notes</label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Add details, materials, or location..."
                  rows={2}
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Goal (Optional)</label>
                <input
                  type="text"
                  value={newGoalText}
                  onChange={e => setNewGoalText(e.target.value)}
                  placeholder="e.g. Complete 2 chapters"
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
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
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

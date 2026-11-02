import React, { useState } from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { AnimeMascot } from '../AnimeMascot';
import { ASSETS } from '../../utils/assets';
import { Target, Plus, CheckCircle2, Circle, Calendar, Sparkles, Trash2 } from 'lucide-react';
import { CategoryId, Priority } from '../../types';

export const GoalsScreen: React.FC = () => {
  const { goals, categories, theme, addGoal, deleteGoal, toggleGoalMilestone } = useTaskTime();
  const themeConfig = THEMES[theme];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0]?.id || 'personal_dev');
  const [targetValue, setTargetValue] = useState(100);
  const [unit, setUnit] = useState('%');
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>('high');
  const [milestoneInput, setMilestoneInput] = useState('');
  const [milestones, setMilestones] = useState<string[]>([]);

  const addMilestoneItem = () => {
    if (milestoneInput.trim()) {
      setMilestones([...milestones, milestoneInput.trim()]);
      setMilestoneInput('');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGoal({
      title: title.trim(),
      description: description.trim(),
      categoryId,
      targetValue: Number(targetValue) || 100,
      unit,
      deadline,
      priority,
      status: 'active',
      milestones: milestones.map((m, idx) => ({ id: `m_${idx}_${Date.now()}`, title: m, completed: false }))
    });

    setTitle('');
    setDescription('');
    setMilestones([]);
    setShowModal(false);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* HEADER BANNER */}
      <div 
        className="p-6 rounded-3xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-bold text-purple-700">
            <Sparkles className="w-3.5 h-3.5" /> Achievement & Goals Centre
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: themeConfig.text }}>
            Plan, Grow & Achieve
          </h1>
          <p className="text-sm opacity-80 max-w-md">Break down ambitious life goals into actionable milestones and track your progress.</p>
        </div>
        <div className="z-10 bg-white/80 p-3 rounded-2xl border shadow-xs" style={{ borderColor: themeConfig.border }}>
          <AnimeMascot src={ASSETS.cat4} size={110} name="Aria" role="Goal Master" />
        </div>
      </div>

      {/* CREATE BUTTON */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Active Goals & Milestones</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl font-bold text-white text-xs shadow-md flex items-center gap-2 transition-all hover:opacity-95"
          style={{ backgroundColor: themeConfig.accent }}
        >
          <Plus className="w-4 h-4" /> CREATE GOAL
        </button>
      </div>

      {/* GOALS LIST */}
      {goals.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-dashed p-6 space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex justify-center">
            <AnimeMascot src={ASSETS.cat4} size={100} name="Aria" />
          </div>
          <p className="text-sm font-medium opacity-70">No goals created yet. Click '+ CREATE GOAL' to define your next big milestone!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map(goal => {
            const cat = categories.find(c => c.id === goal.categoryId);
            const progress = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
            return (
              <div
                key={goal.id}
                className="p-5 rounded-3xl bg-white border shadow-sm space-y-4"
                style={{ borderColor: themeConfig.border }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${cat?.color || '#E88BB5'}20`, color: cat?.color || '#E88BB5' }}>
                        {cat?.name || 'Goal'}
                      </span>
                      <span className="text-xs font-semibold opacity-70 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Deadline: {goal.deadline}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{goal.title}</h3>
                    {goal.description && <p className="text-xs opacity-75">{goal.description}</p>}
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Progress: {goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div className="space-y-2 pt-2 border-t" style={{ borderColor: themeConfig.border }}>
                    <div className="text-xs font-bold opacity-80">Milestones Checklist:</div>
                    <div className="space-y-1.5">
                      {goal.milestones.map(m => (
                        <div
                          key={m.id}
                          onClick={() => toggleGoalMilestone(goal.id, m.id)}
                          className="p-2.5 rounded-xl bg-slate-50 border flex items-center gap-2.5 cursor-pointer hover:bg-slate-100 transition-all"
                          style={{ borderColor: themeConfig.border }}
                        >
                          {m.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-gray-400" />}
                          <span className={`text-xs font-semibold ${m.completed ? 'line-through opacity-50' : ''}`}>{m.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE GOAL MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-4 bg-white max-h-[90vh] overflow-y-auto" style={{ borderColor: themeConfig.border }}>
            <h3 className="text-xl font-bold">Create New Goal</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70">Goal Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Master Full-Stack Web Development"
                  required
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  <label className="text-xs font-semibold opacity-70">Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm"
                    style={{ borderColor: themeConfig.border }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your goal..."
                  rows={2}
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              {/* Milestones creator */}
              <div className="space-y-2">
                <label className="text-xs font-semibold opacity-70">Milestones</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={milestoneInput}
                    onChange={e => setMilestoneInput(e.target.value)}
                    placeholder="Add milestone step..."
                    className="flex-1 p-2.5 rounded-xl border text-xs"
                    style={{ borderColor: themeConfig.border }}
                  />
                  <button
                    type="button"
                    onClick={addMilestoneItem}
                    className="px-4 py-2.5 rounded-xl font-bold text-white text-xs"
                    style={{ backgroundColor: themeConfig.accent }}
                  >
                    Add
                  </button>
                </div>
                {milestones.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {milestones.map((m, idx) => (
                      <div key={idx} className="text-xs bg-slate-50 px-3 py-1.5 rounded-lg flex justify-between">
                        <span>• {m}</span>
                        <button type="button" onClick={() => setMilestones(milestones.filter((_, i) => i !== idx))} className="text-red-500 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                )}
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
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

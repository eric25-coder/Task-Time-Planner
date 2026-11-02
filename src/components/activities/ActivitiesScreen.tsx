import React, { useState } from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { AnimeMascot } from '../AnimeMascot';
import { ASSETS } from '../../utils/assets';
import { CategoryIcon } from '../../utils/categoryIcons';
import { 
  Search, Filter, Plus, Calendar, Clock, CheckCircle2, Circle, 
  Trash2, Edit, Target, Sparkles, Check, Flame
} from 'lucide-react';
import { ActivityStatus, Priority, CategoryId } from '../../types';

export const ActivitiesScreen: React.FC = () => {
  const { 
    activities, categories, theme, addActivity, updateActivity, deleteActivity, toggleActivityComplete 
  } = useTaskTime();

  const themeConfig = THEMES[theme];

  // Filtering & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryId | 'all'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<ActivityStatus | 'all'>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<Priority | 'all'>('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>(categories[0]?.id || 'education');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [priority, setPriority] = useState<Priority>('medium');
  const [goalDesc, setGoalDesc] = useState('');

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCategoryId(categories[0]?.id || 'education');
    setDate(new Date().toISOString().split('T')[0]);
    setStartTime('09:00');
    setEndTime('10:00');
    setPriority('medium');
    setGoalDesc('');
    setShowModal(true);
  };

  const openEditModal = (act: any) => {
    setEditingId(act.id);
    setTitle(act.title);
    setDescription(act.description || '');
    setCategoryId(act.categoryId);
    setDate(act.date);
    setStartTime(act.startTime);
    setEndTime(act.endTime);
    setPriority(act.priority);
    setGoalDesc(act.goal?.description || '');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const activityData = {
      title: title.trim(),
      description: description.trim(),
      categoryId,
      activityType: 'General',
      date,
      startTime,
      endTime,
      priority,
      goal: goalDesc ? { description: goalDesc, targetAmount: 1, unit: 'task', actualAmount: 0 } : undefined,
      recurrence: 'none' as const,
      subtasks: [],
      status: 'upcoming' as const
    };

    if (editingId) {
      updateActivity(editingId, activityData);
    } else {
      addActivity(activityData);
    }
    setShowModal(false);
  };

  // Filter logic
  const filteredActivities = activities.filter(act => {
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          act.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || act.categoryId === selectedCategoryFilter;
    const matchesStatus = selectedStatusFilter === 'all' || act.status === selectedStatusFilter;
    const matchesPriority = selectedPriorityFilter === 'all' || act.priority === selectedPriorityFilter;
    return matchesSearch && matchesCat && matchesStatus && matchesPriority;
  });

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* HEADER & CREATE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600">
            <Sparkles className="w-4 h-4" /> Comprehensive Management
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Activities Centre</h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl font-bold text-white text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:opacity-95"
          style={{ backgroundColor: themeConfig.accent }}
        >
          <Plus className="w-5 h-5" /> CREATE ACTIVITY
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div 
        className="p-4 rounded-3xl border shadow-sm space-y-3 bg-white"
        style={{ borderColor: themeConfig.border }}
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search activities by title or notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm"
            style={{ borderColor: themeConfig.border }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={e => setSelectedCategoryFilter(e.target.value as any)}
            className="p-2.5 rounded-2xl border text-xs font-medium bg-white"
            style={{ borderColor: themeConfig.border }}
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={e => setSelectedStatusFilter(e.target.value as any)}
            className="p-2.5 rounded-2xl border text-xs font-medium bg-white"
            style={{ borderColor: themeConfig.border }}
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriorityFilter}
            onChange={e => setSelectedPriorityFilter(e.target.value as any)}
            className="p-2.5 rounded-2xl border text-xs font-medium bg-white"
            style={{ borderColor: themeConfig.border }}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent Priority</option>
          </select>
        </div>
      </div>

      {/* ACTIVITIES LIST */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-16 bg-white/40 rounded-3xl border border-dashed p-6 space-y-3" style={{ borderColor: themeConfig.border }}>
          <div className="flex justify-center">
          <AnimeMascot src={ASSETS.cat2} size={100} name="Mimi" />
          </div>
          <p className="text-sm font-medium opacity-70">No activities match your current filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map(act => {
            const cat = categories.find(c => c.id === act.categoryId);
            const isDone = act.status === 'completed';
            return (
              <div
                key={act.id}
                className={`p-4 rounded-3xl bg-white border shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isDone ? 'opacity-75 bg-slate-50' : ''
                }`}
                style={{ borderColor: themeConfig.border }}
              >
                <div className="flex items-start space-x-3">
                  <button onClick={() => toggleActivityComplete(act.id)} className="mt-1">
                    {isDone ? <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" /> : <Circle className="w-6 h-6 text-gray-400 hover:text-pink-500" />}
                  </button>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5" style={{ backgroundColor: `${cat?.color || '#E88BB5'}20`, color: cat?.color || '#E88BB5' }}>
                        <CategoryIcon iconName={cat?.iconName} className="w-3.5 h-3.5" />
                        {cat?.name || 'General'}
                      </span>
                      {act.recurrence === 'daily' && (
                        <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                           <Flame className="w-3 h-3" /> {act.streak || 0}d streak
                        </div>
                      )}
                      <span className="text-[11px] font-semibold opacity-70 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {act.date}
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
                    <div className={`text-base font-bold ${isDone ? 'line-through opacity-60' : ''}`}>
                      {act.title}
                    </div>
                    {act.description && <div className="text-xs opacity-75">{act.description}</div>}
                    {act.goal && (
                      <div className="text-xs text-pink-600 font-semibold flex items-center gap-1 pt-0.5">
                        <Target className="w-3.5 h-3.5" /> Goal: {act.goal.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => openEditModal(act)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-bold flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => deleteActivity(act.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-4 bg-white max-h-[90vh] overflow-y-auto" style={{ borderColor: themeConfig.border }}>
            <h3 className="text-xl font-bold">{editingId ? 'Edit Activity' : 'Create New Activity'}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70">Activity Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Complete Project Proposal"
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
                  <label className="text-xs font-semibold opacity-70">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
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

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold opacity-70">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm"
                    style={{ borderColor: themeConfig.border }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold opacity-70">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full p-3 rounded-2xl border text-sm"
                    style={{ borderColor: themeConfig.border }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold opacity-70">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
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
                  placeholder="Activity details..."
                  rows={2}
                  className="w-full p-3 rounded-2xl border text-sm"
                  style={{ borderColor: themeConfig.border }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">Goal (Optional)</label>
                <input
                  type="text"
                  value={goalDesc}
                  onChange={e => setGoalDesc(e.target.value)}
                  placeholder="e.g. Finish 3 sections"
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
                  {editingId ? 'Save Changes' : 'Create Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

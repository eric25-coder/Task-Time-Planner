import React, { useState } from 'react';
import { useTaskTime } from '../../context/TaskTimeContext';
import { THEMES } from '../../utils/themeStyles';
import { AnimeMascot } from '../AnimeMascot';
import { 
  ArrowLeft, Plus, BookOpen, HeartHandshake, Dumbbell, Briefcase, 
  TrendingUp, Home, Users, Sparkles, Plane, CalendarCheck, CheckCircle2, Circle, Clock, Check
} from 'lucide-react';

export const WorkspaceContainer: React.FC = () => {
  const { 
    activeCategoryWorkspace, 
    setActiveCategoryWorkspace, 
    categories, 
    theme,
    academicUnits, addAcademicUnit, addAcademicTopic, updateTopicUnderstanding,
    religiousEvents, addReligiousEvent,
    fitnessWorkouts, addFitnessWorkout,
    householdChores, addHouseholdChore, toggleHouseholdChore,
    readingBooks, addReadingBook, updateReadingProgress,
    meetings, addMeeting
  } = useTaskTime();

  const themeConfig = THEMES[theme];
  const category = categories.find(c => c.id === activeCategoryWorkspace);

  // Form states for workspace additions
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  if (!category) return null;

  const handleWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category.id === 'education') {
      addAcademicUnit({
        name: formData.name || 'New Unit',
        code: formData.code || 'EDU101',
        institution: formData.institution || 'University',
        semester: formData.semester || 'Semester 1',
        academicYear: formData.academicYear || '2026',
        lecturer: formData.lecturer || '',
        description: formData.description || '',
        archived: false
      });
    } else if (category.id === 'religious') {
      addReligiousEvent({
        title: formData.title || 'Prayer Meeting',
        date: formData.date || new Date().toISOString().split('T')[0],
        startTime: formData.startTime || '10:00',
        endTime: formData.endTime || '11:30',
        venue: formData.venue || 'Sanctuary',
        eventType: formData.eventType || 'Service',
        leader: formData.leader || '',
        checklist: [
          { id: '1', title: 'Prepare venue', completed: false },
          { id: '2', title: 'Coordinate readings', completed: false }
        ]
      });
    } else if (category.id === 'fitness') {
      addFitnessWorkout({
        title: formData.title || 'Morning Workout',
        date: formData.date || new Date().toISOString().split('T')[0],
        durationMinutes: Number(formData.durationMinutes) || 45,
        exercises: [
          { name: formData.exerciseName || 'Push-ups', sets: 3, reps: 15 }
        ]
      });
    } else if (category.id === 'household') {
      addHouseholdChore({
        title: formData.title || 'Living Room Cleaning',
        room: formData.room || 'Living Room',
        frequency: formData.frequency || 'weekly',
        nextDue: formData.nextDue || new Date().toISOString().split('T')[0],
        completed: false
      });
    } else if (category.id === 'reading') {
      addReadingBook({
        title: formData.title || 'Clean Code',
        author: formData.author || 'Robert C. Martin',
        totalPages: Number(formData.totalPages) || 400,
        currentPage: 0,
        status: 'reading'
      });
    } else if (category.id === 'meetings') {
      addMeeting({
        title: formData.title || 'Team Sync',
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.time || '14:00',
        participants: ['Team'],
        agenda: ['Review weekly progress'],
        actionItems: [{ id: '1', title: 'Send meeting minutes', completed: false }]
      });
    }
    setShowAddModal(false);
    setFormData({});
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Back button & Workspace Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveCategoryWorkspace(null)}
          className="px-4 py-2 rounded-2xl bg-white/80 border hover:bg-white flex items-center gap-2 shadow-xs font-semibold text-xs transition-all"
          style={{ borderColor: themeConfig.border }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-2xl font-bold text-white text-xs shadow-md flex items-center gap-1.5 transition-all hover:opacity-95"
          style={{ backgroundColor: themeConfig.accent }}
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Workspace Banner */}
      <div 
        className="p-6 rounded-3xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-xs font-bold" style={{ color: category.color }}>
            <Sparkles className="w-3.5 h-3.5" /> Workspace
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: themeConfig.text }}>
            {category.name} Workspace
          </h1>
          <p className="text-sm opacity-80 max-w-lg">{category.description}</p>
        </div>
        <div className="z-10 bg-white/80 p-3 rounded-2xl border shadow-xs" style={{ borderColor: themeConfig.border }}>
          <AnimeMascot src={category.imagePath} size={100} />
        </div>
      </div>

      {/* WORKSPACE SPECIFIC CONTENT */}
      {category.id === 'education' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Academic Units & Topic Tracker</h2>
          {academicUnits.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6" style={{ borderColor: themeConfig.border }}>
              <p className="text-sm opacity-70">No academic units created yet. Click '+ Add Item' to start organizing your studies!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {academicUnits.map(unit => (
                <div key={unit.id} className="p-5 rounded-3xl bg-white border shadow-sm space-y-4" style={{ borderColor: themeConfig.border }}>
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: themeConfig.border }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 font-bold">{unit.code}</span>
                        <h3 className="text-base font-bold">{unit.name}</h3>
                      </div>
                      <p className="text-xs opacity-70 mt-0.5">{unit.institution} • {unit.semester} {unit.academicYear}</p>
                    </div>
                    <button
                      onClick={() => {
                        const topicName = prompt('Enter new revision topic name:');
                        if (topicName) addAcademicTopic(unit.id, { name: topicName, estimatedHours: 2 });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-600 text-xs font-bold border border-pink-200 hover:bg-pink-100 transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Topic
                    </button>
                  </div>
                  {/* Topics list */}
                  <div className="space-y-2">
                    {unit.topics.length === 0 ? (
                      <div className="text-xs opacity-60 italic">No topics added to this unit yet.</div>
                    ) : (
                      unit.topics.map(top => (
                        <div key={top.id} className="p-3 rounded-2xl bg-slate-50 border flex items-center justify-between" style={{ borderColor: themeConfig.border }}>
                          <div>
                            <div className="text-sm font-bold">{top.name}</div>
                            <div className="text-[10px] opacity-70">Estimated: {top.estimatedHours} hrs</div>
                          </div>
                          {/* Understanding Status Selector */}
                          <div className="flex gap-1.5">
                            {(['understood', 'partially', 'not_understood', 'not_studied'] as const).map(status => {
                              const labels: Record<string, string> = { understood: 'Understood', partially: 'Partial', not_understood: 'Confused', not_studied: 'Unstudied' };
                              const colors: Record<string, string> = { understood: 'bg-emerald-100 text-emerald-700', partially: 'bg-amber-100 text-amber-700', not_understood: 'bg-rose-100 text-rose-700', not_studied: 'bg-slate-200 text-slate-700' };
                              const isSelected = top.understanding === status;
                              return (
                                <button
                                  key={status}
                                  onClick={() => updateTopicUnderstanding(unit.id, top.id, status)}
                                  className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${colors[status]} ${isSelected ? 'ring-2 ring-offset-1 ring-pink-400' : 'opacity-50 hover:opacity-100'}`}
                                >
                                  {labels[status]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {category.id === 'religious' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Religious Services & Responsibilities</h2>
          {religiousEvents.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6" style={{ borderColor: themeConfig.border }}>
              <p className="text-sm opacity-70">No religious events recorded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {religiousEvents.map(ev => (
                <div key={ev.id} className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">{ev.eventType}</span>
                    <span className="text-xs opacity-70">📅 {ev.date}</span>
                  </div>
                  <h3 className="text-base font-bold">{ev.title}</h3>
                  <div className="text-xs opacity-70">🕒 {ev.startTime} - {ev.endTime} • 📍 {ev.venue}</div>
                  <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: themeConfig.border }}>
                    <div className="text-xs font-bold opacity-80">Preparation Checklist:</div>
                    {ev.checklist.map(item => (
                      <div key={item.id} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {category.id === 'fitness' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Fitness Workouts & Training</h2>
          {fitnessWorkouts.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6" style={{ borderColor: themeConfig.border }}>
              <p className="text-sm opacity-70">No workout sessions logged yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fitnessWorkouts.map(w => (
                <div key={w.id} className="p-5 rounded-3xl bg-white border shadow-sm space-y-3" style={{ borderColor: themeConfig.border }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">{w.title}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">{w.durationMinutes} mins</span>
                  </div>
                  <div className="text-xs opacity-70">📅 {w.date}</div>
                  <div className="space-y-1 pt-2 border-t" style={{ borderColor: themeConfig.border }}>
                    <div className="text-xs font-bold">Exercises:</div>
                    {w.exercises.map((ex, idx) => (
                      <div key={idx} className="text-xs bg-slate-50 p-2 rounded-xl flex justify-between">
                        <span className="font-semibold">{ex.name}</span>
                        <span>{ex.sets} sets × {ex.reps} reps</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {category.id === 'household' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Household Chores & Room Management</h2>
          {householdChores.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6" style={{ borderColor: themeConfig.border }}>
              <p className="text-sm opacity-70">No household chores added yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {householdChores.map(chore => (
                <div key={chore.id} className="p-4 rounded-2xl bg-white border flex items-center justify-between shadow-xs" style={{ borderColor: themeConfig.border }}>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleHouseholdChore(chore.id)}>
                      {chore.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6 text-gray-400" />}
                    </button>
                    <div>
                      <div className={`text-sm font-bold ${chore.completed ? 'line-through opacity-50' : ''}`}>{chore.title}</div>
                      <div className="text-xs opacity-70">🏠 {chore.room} • Frequency: {chore.frequency}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 font-bold">Due: {chore.nextDue}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {category.id === 'reading' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Personal Library & Reading Tracker</h2>
          {readingBooks.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-3xl border border-dashed p-6" style={{ borderColor: themeConfig.border }}>
              <p className="text-sm opacity-70">No books added to your reading library yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {readingBooks.map(book => {
                const percent = Math.round((book.currentPage / book.totalPages) * 100);
                return (
                  <div key={book.id} className="p-5 rounded-3xl bg-white border shadow-sm space-y-4" style={{ borderColor: themeConfig.border }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold">{book.title}</h3>
                        <p className="text-xs opacity-70">by {book.author}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 uppercase">
                        {book.status}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Progress: {book.currentPage} / {book.totalPages} pages</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newPage = prompt(`Update current page (Total ${book.totalPages}):`, String(book.currentPage));
                        if (newPage !== null) updateReadingProgress(book.id, Number(newPage));
                      }}
                      className="w-full py-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-100 transition-all"
                    >
                      Update Page Progress
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ADD ITEM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 bg-white" style={{ borderColor: themeConfig.border }}>
            <h3 className="text-lg font-bold">Add {category.name} Item</h3>
            <form onSubmit={handleWorkspaceSubmit} className="space-y-3">
              {category.id === 'education' && (
                <>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Unit Name</label>
                    <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Advanced Data Structures" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Unit Code</label>
                    <input type="text" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="e.g. CS301" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                </>
              )}

              {category.id === 'religious' && (
                <>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Event Title</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Youth Fellowship" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Venue</label>
                    <input type="text" value={formData.venue || ''} onChange={e => setFormData({ ...formData, venue: e.target.value })} placeholder="e.g. Main Chapel" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                </>
              )}

              {category.id === 'fitness' && (
                <>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Workout Title</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Upper Body Strength" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Duration (Minutes)</label>
                    <input type="number" value={formData.durationMinutes || ''} onChange={e => setFormData({ ...formData, durationMinutes: e.target.value })} placeholder="45" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                </>
              )}

              {category.id === 'household' && (
                <>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Chore Title</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Vacuum Carpet" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Room</label>
                    <input type="text" value={formData.room || ''} onChange={e => setFormData({ ...formData, room: e.target.value })} placeholder="e.g. Living Room" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                </>
              )}

              {category.id === 'reading' && (
                <>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Book Title</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Atomic Habits" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Author</label>
                    <input type="text" value={formData.author || ''} onChange={e => setFormData({ ...formData, author: e.target.value })} placeholder="e.g. James Clear" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold opacity-70">Total Pages</label>
                    <input type="number" value={formData.totalPages || ''} onChange={e => setFormData({ ...formData, totalPages: e.target.value })} placeholder="320" required className="w-full p-2.5 rounded-xl border text-sm" />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border font-semibold text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl font-bold text-white text-xs" style={{ backgroundColor: themeConfig.accent }}>Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

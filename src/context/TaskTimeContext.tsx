import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppState, 
  ThemeType, 
  CategoryId, 
  ActivityItem, 
  HabitItem, 
  GoalItem, 
  AcademicUnit, 
  ReligiousEvent, 
  FitnessWorkout, 
  HouseholdChore, 
  ReadingBook, 
  MeetingItem 
} from '../types';
import { INITIAL_CATEGORIES } from '../data/categories';

interface TaskTimeContextType extends AppState {
  setTheme: (theme: ThemeType) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  updateUser: (name: string, avatarMascot: string, quoteFrequency: 'every_open' | 'once_day' | 'disabled') => void;
  setSelectedDate: (date: string) => void;
  setActiveTab: (tab: AppState['activeTab']) => void;
  setActiveCategoryWorkspace: (catId: CategoryId | null) => void;
  
  // Activities actions
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  updateActivity: (id: string, updates: Partial<ActivityItem>) => void;
  deleteActivity: (id: string) => void;
  toggleActivityComplete: (id: string) => void;
  
  // Habits actions
  addHabit: (habit: Omit<HabitItem, 'id' | 'streak' | 'bestStreak' | 'completedDates'>) => void;
  updateHabit: (id: string, updates: Partial<HabitItem>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitDate: (habitId: string, dateStr: string) => void;
  
  // Goals actions
  addGoal: (goal: Omit<GoalItem, 'id' | 'createdAt' | 'currentValue'>) => void;
  updateGoal: (id: string, updates: Partial<GoalItem>) => void;
  deleteGoal: (id: string) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;

  // Workspace specific actions
  addAcademicUnit: (unit: Omit<AcademicUnit, 'id' | 'topics'>) => void;
  addAcademicTopic: (unitId: string, topic: any) => void;
  updateTopicUnderstanding: (unitId: string, topicId: string, understanding: any) => void;

  addReligiousEvent: (event: Omit<ReligiousEvent, 'id'>) => void;
  addFitnessWorkout: (workout: Omit<FitnessWorkout, 'id'>) => void;
  addHouseholdChore: (chore: Omit<HouseholdChore, 'id'>) => void;
  toggleHouseholdChore: (id: string) => void;
  addReadingBook: (book: Omit<ReadingBook, 'id'>) => void;
  updateReadingProgress: (id: string, currentPage: number) => void;
  addMeeting: (meeting: Omit<MeetingItem, 'id'>) => void;

  // Backup / Restore
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  resetAllData: () => void;
}

const STORAGE_KEY = 'tasktime_app_state_v1';

const getTodayStr = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const DEFAULT_STATE: AppState = {
  onboardingCompleted: false,
  theme: 'blossom',
  user: {
    name: 'Miyu',
    avatarMascot: 'Mimi',
    quoteFrequency: 'every_open',
    favoriteQuoteIds: []
  },
  selectedDate: getTodayStr(),
  activeTab: 'home',
  activeCategoryWorkspace: null,
  categories: INITIAL_CATEGORIES,
  activities: [],
  habits: [],
  goals: [],
  academicUnits: [],
  religiousEvents: [],
  fitnessWorkouts: [],
  householdChores: [],
  readingBooks: [],
  meetings: []
};

const TaskTimeContext = createContext<TaskTimeContextType | undefined>(undefined);

export const TaskTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load saved state from localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [state]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Reminder checker
  const activitiesRef = React.useRef(state.activities);
  useEffect(() => {
    activitiesRef.current = state.activities;
  }, [state.activities]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHourMinute = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const todayStr = getTodayStr();

      activitiesRef.current.forEach(act => {
        // Streak reset if missed daily task
        if (act.recurrence === 'daily' && act.lastCompletedDate && act.status === 'upcoming') {
           const yesterday = new Date();
           yesterday.setDate(yesterday.getDate() - 1);
           const yesterdayStr = yesterday.toISOString().split('T')[0];
           if (act.lastCompletedDate < yesterdayStr && act.streak && act.streak > 0) {
               updateActivity(act.id, { streak: 0 });
           }
        }

        if (
          act.date === todayStr &&
          act.startTime === currentHourMinute &&
          !act.reminderFired &&
          act.status === 'upcoming'
        ) {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('TaskTime Reminder', {
              body: `Time for: ${act.title}`,
            });
          }
          // Mark as fired
          updateActivity(act.id, { reminderFired: true });
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const setTheme = (theme: ThemeType) => setState(prev => ({ ...prev, theme }));
  const setOnboardingCompleted = (onboardingCompleted: boolean) => setState(prev => ({ ...prev, onboardingCompleted }));
  const updateUser = (name: string, avatarMascot: string, quoteFrequency: 'every_open' | 'once_day' | 'disabled') => {
    setState(prev => ({ ...prev, user: { ...prev.user, name, avatarMascot, quoteFrequency } }));
  };
  const setSelectedDate = (selectedDate: string) => setState(prev => ({ ...prev, selectedDate }));
  const setActiveTab = (activeTab: AppState['activeTab']) => setState(prev => ({ ...prev, activeTab }));
  const setActiveCategoryWorkspace = (activeCategoryWorkspace: CategoryId | null) => setState(prev => ({ ...prev, activeCategoryWorkspace }));

  // Activities
  const addActivity = (activity: Omit<ActivityItem, 'id'>) => {
    const newAct: ActivityItem = { ...activity, id: 'act_' + Date.now() + Math.random().toString(36).substr(2, 5) };
    setState(prev => ({ ...prev, activities: [newAct, ...prev.activities] }));
  };
  const updateActivity = (id: string, updates: Partial<ActivityItem>) => {
    setState(prev => ({
      ...prev,
      activities: prev.activities.map(a => a.id === id ? { ...a, ...updates } : a)
    }));
  };
  const deleteActivity = (id: string) => {
    setState(prev => ({ ...prev, activities: prev.activities.filter(a => a.id !== id) }));
  };
  const toggleActivityComplete = (id: string) => {
    setState(prev => ({
      ...prev,
      activities: prev.activities.map(a => {
        if (a.id === id) {
          const isDone = a.status === 'completed';
          const nextStatus = isDone ? 'upcoming' : 'completed';
          const today = getTodayStr();

          // Streak logic for daily tasks
          let newStreak = a.streak || 0;
          let newBest = a.bestStreak || 0;
          let lastCompleted = a.lastCompletedDate;

          if (a.recurrence === 'daily') {
            if (!isDone) {
              // Completing
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];

              if (lastCompleted === yesterdayStr) {
                newStreak++;
              } else {
                newStreak = 1;
              }
              if (newStreak > newBest) newBest = newStreak;
              lastCompleted = today;
            } else {
              // Undoing
              newStreak = 0;
              lastCompleted = undefined;
            }
          }

          return {
            ...a,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
            streak: newStreak,
            bestStreak: newBest,
            lastCompletedDate: lastCompleted
          };
        }
        return a;
      })
    }));
  };

  // Habits
  const addHabit = (habit: Omit<HabitItem, 'id' | 'streak' | 'bestStreak' | 'completedDates'>) => {
    const newHabit: HabitItem = {
      ...habit,
      id: 'hab_' + Date.now() + Math.random().toString(36).substr(2, 5),
      streak: 0,
      bestStreak: 0,
      completedDates: []
    };
    setState(prev => ({ ...prev, habits: [newHabit, ...prev.habits] }));
  };
  const updateHabit = (id: string, updates: Partial<HabitItem>) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h => h.id === id ? { ...h, ...updates } : h)
    }));
  };
  const deleteHabit = (id: string) => {
    setState(prev => ({ ...prev, habits: prev.habits.filter(h => h.id !== id) }));
  };
  const toggleHabitDate = (habitId: string, dateStr: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h => {
        if (h.id !== habitId) return h;
        const exists = h.completedDates.includes(dateStr);
        const newDates = exists
          ? h.completedDates.filter(d => d !== dateStr)
          : [...h.completedDates, dateStr];
        
        // Recalculate streak
        const sorted = [...newDates].sort();
        let currentStreak = 0;
        let best = h.bestStreak;
        const today = getTodayStr();
        // Simple streak logic
        if (newDates.includes(today)) {
          currentStreak = 1;
          let checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - 1);
          while (newDates.includes(checkDate.toISOString().split('T')[0])) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          }
        }
        if (currentStreak > best) best = currentStreak;

        return {
          ...h,
          completedDates: newDates,
          streak: currentStreak,
          bestStreak: best
        };
      })
    }));
  };

  // Goals
  const addGoal = (goal: Omit<GoalItem, 'id' | 'createdAt' | 'currentValue'>) => {
    const newGoal: GoalItem = {
      ...goal,
      id: 'goal_' + Date.now() + Math.random().toString(36).substr(2, 5),
      currentValue: 0,
      createdAt: getTodayStr(),
      status: 'active'
    };
    setState(prev => ({ ...prev, goals: [newGoal, ...prev.goals] }));
  };
  const updateGoal = (id: string, updates: Partial<GoalItem>) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, ...updates } : g)
    }));
  };
  const deleteGoal = (id: string) => {
    setState(prev => ({ ...prev, goals: prev.goals.filter(g => g.id !== id) }));
  };
  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g => {
        if (g.id !== goalId) return g;
        const updatedMilestones = g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const total = updatedMilestones.length;
        const newCurrent = total > 0 ? Math.round((completedCount / total) * g.targetValue) : g.currentValue;
        return {
          ...g,
          milestones: updatedMilestones,
          currentValue: newCurrent,
          status: newCurrent >= g.targetValue ? 'completed' : 'active'
        };
      })
    }));
  };

  // Workspace actions
  const addAcademicUnit = (unit: Omit<AcademicUnit, 'id' | 'topics'>) => {
    const newUnit: AcademicUnit = {
      ...unit,
      id: 'unit_' + Date.now(),
      topics: []
    };
    setState(prev => ({ ...prev, academicUnits: [...prev.academicUnits, newUnit] }));
  };
  const addAcademicTopic = (unitId: string, topic: any) => {
    const newTopic = { ...topic, id: 'top_' + Date.now(), understanding: 'not_studied' as const, actualHours: 0 };
    setState(prev => ({
      ...prev,
      academicUnits: prev.academicUnits.map(u => u.id === unitId ? { ...u, topics: [...u.topics, newTopic] } : u)
    }));
  };
  const updateTopicUnderstanding = (unitId: string, topicId: string, understanding: any) => {
    setState(prev => ({
      ...prev,
      academicUnits: prev.academicUnits.map(u => {
        if (u.id !== unitId) return u;
        return {
          ...u,
          topics: u.topics.map(t => t.id === topicId ? { ...t, understanding, lastRevisionDate: getTodayStr() } : t)
        };
      })
    }));
  };

  const addReligiousEvent = (event: Omit<ReligiousEvent, 'id'>) => {
    const newItem = { ...event, id: 'rel_' + Date.now() };
    setState(prev => ({ ...prev, religiousEvents: [newItem, ...prev.religiousEvents] }));
  };
  const addFitnessWorkout = (workout: Omit<FitnessWorkout, 'id'>) => {
    const newItem = { ...workout, id: 'fit_' + Date.now() };
    setState(prev => ({ ...prev, fitnessWorkouts: [newItem, ...prev.fitnessWorkouts] }));
  };
  const addHouseholdChore = (chore: Omit<HouseholdChore, 'id'>) => {
    const newItem = { ...chore, id: 'chore_' + Date.now() };
    setState(prev => ({ ...prev, householdChores: [newItem, ...prev.householdChores] }));
  };
  const toggleHouseholdChore = (id: string) => {
    setState(prev => ({
      ...prev,
      householdChores: prev.householdChores.map(c => c.id === id ? { ...c, completed: !c.completed, lastCompleted: !c.completed ? getTodayStr() : c.lastCompleted } : c)
    }));
  };
  const addReadingBook = (book: Omit<ReadingBook, 'id'>) => {
    const newItem = { ...book, id: 'book_' + Date.now() };
    setState(prev => ({ ...prev, readingBooks: [newItem, ...prev.readingBooks] }));
  };
  const updateReadingProgress = (id: string, currentPage: number) => {
    setState(prev => ({
      ...prev,
      readingBooks: prev.readingBooks.map(b => b.id === id ? { ...b, currentPage, status: currentPage >= b.totalPages ? 'completed' : b.status } : b)
    }));
  };
  const addMeeting = (meeting: Omit<MeetingItem, 'id'>) => {
    const newItem = { ...meeting, id: 'meet_' + Date.now() };
    setState(prev => ({ ...prev, meetings: [newItem, ...prev.meetings] }));
  };

  const exportData = () => JSON.stringify(state, null, 2);
  const importData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      setState({ ...DEFAULT_STATE, ...parsed });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const resetAllData = () => setState(DEFAULT_STATE);

  return (
    <TaskTimeContext.Provider value={{
      ...state,
      setTheme,
      setOnboardingCompleted,
      updateUser,
      setSelectedDate,
      setActiveTab,
      setActiveCategoryWorkspace,
      addActivity,
      updateActivity,
      deleteActivity,
      toggleActivityComplete,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleHabitDate,
      addGoal,
      updateGoal,
      deleteGoal,
      toggleGoalMilestone,
      addAcademicUnit,
      addAcademicTopic,
      updateTopicUnderstanding,
      addReligiousEvent,
      addFitnessWorkout,
      addHouseholdChore,
      toggleHouseholdChore,
      addReadingBook,
      updateReadingProgress,
      addMeeting,
      exportData,
      importData,
      resetAllData
    }}>
      {children}
    </TaskTimeContext.Provider>
  );
};

export const useTaskTime = () => {
  const context = useContext(TaskTimeContext);
  if (!context) throw new Error('useTaskTime must be used within a TaskTimeProvider');
  return context;
};

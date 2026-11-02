export type ThemeType = 'blossom' | 'sky' | 'nature';

export type CategoryId = 
  | 'education' 
  | 'religious' 
  | 'fitness' 
  | 'work' 
  | 'business' 
  | 'household' 
  | 'reading' 
  | 'family' 
  | 'personal_dev' 
  | 'travel' 
  | 'meetings' 
  | string;

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  color: string;
  imagePath: string;
}

export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed' | 'overdue' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ActivityGoal {
  description: string;
  targetAmount: number;
  unit: string;
  actualAmount: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  activityType: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  priority: Priority;
  goal?: ActivityGoal;
  responsiblePerson?: string;
  location?: string;
  reminder?: boolean;
  reminderTime?: string;
  recurrence: Recurrence;
  subtasks: SubTask[];
  status: ActivityStatus;
  notes?: string;
  completedAt?: string;
  reminderFired?: boolean;
}

export type HabitFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';

export interface HabitItem {
  id: string;
  name: string;
  description: string;
  categoryId: CategoryId;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  customDays?: number[]; // 0-6 (Sun-Sat)
  targetValue: number;
  unit: string;
  reminderTime?: string;
  motivation?: string;
  startDate: string;
  paused: boolean;
  streak: number;
  bestStreak: number;
  completedDates: string[]; // Array of YYYY-MM-DD
}

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: Priority;
  milestones: GoalMilestone[];
  status: 'active' | 'completed' | 'abandoned';
  createdAt: string;
}

export type TopicUnderstanding = 'understood' | 'partially' | 'not_understood' | 'not_studied';

export interface AcademicTopic {
  id: string;
  unitId: string;
  name: string;
  learningObjectives?: string;
  notes?: string;
  understanding: TopicUnderstanding;
  estimatedHours: number;
  actualHours: number;
  lastRevisionDate?: string;
}

export interface AcademicUnit {
  id: string;
  name: string;
  code: string;
  institution: string;
  semester: string;
  academicYear: string;
  lecturer?: string;
  description: string;
  archived: boolean;
  topics: AcademicTopic[];
}

export interface ReligiousEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  eventType: string;
  leader?: string;
  checklist: SubTask[];
  notes?: string;
}

export interface FitnessWorkout {
  id: string;
  title: string;
  date: string;
  durationMinutes: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weightKg?: number;
    distanceKm?: number;
  }[];
  notes?: string;
}

export interface HouseholdChore {
  id: string;
  title: string;
  room: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  assignedTo?: string;
  lastCompleted?: string;
  nextDue: string;
  completed: boolean;
}

export interface ReadingBook {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: 'to_read' | 'reading' | 'completed';
  rating?: number;
  notes?: string;
}

export interface MeetingItem {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  agenda: string[];
  minutes?: string;
  actionItems: SubTask[];
}

export interface UserProfile {
  name: string;
  avatarMascot: string;
  quoteFrequency: 'every_open' | 'once_day' | 'disabled';
  lastQuoteDate?: string;
  favoriteQuoteIds: number[];
}

export interface AppState {
  onboardingCompleted: boolean;
  theme: ThemeType;
  user: UserProfile;
  selectedDate: string; // YYYY-MM-DD
  activeTab: 'home' | 'activities' | 'habits' | 'goals' | 'reports';
  activeCategoryWorkspace: CategoryId | null;
  categories: CategoryDefinition[];
  activities: ActivityItem[];
  habits: HabitItem[];
  goals: GoalItem[];
  academicUnits: AcademicUnit[];
  religiousEvents: ReligiousEvent[];
  fitnessWorkouts: FitnessWorkout[];
  householdChores: HouseholdChore[];
  readingBooks: ReadingBook[];
  meetings: MeetingItem[];
}

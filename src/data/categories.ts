import { CategoryDefinition } from '../types';
import { ASSETS } from '../utils/assets';

export const INITIAL_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'education',
    name: 'Education / School',
    description: 'Academic units, lecture notes, revision topics and exam prep.',
    iconName: 'GraduationCap',
    color: '#E88BB5',
    imagePath: ASSETS.cat1
  },
  {
    id: 'religious',
    name: 'Religious Activities',
    description: 'Services, prayers, study sessions, and community duties.',
    iconName: 'HeartHandshake',
    color: '#C8B5E8',
    imagePath: ASSETS.cat2
  },
  {
    id: 'fitness',
    name: 'Fitness / Sports',
    description: 'Workout plans, running, strength training, and endurance.',
    iconName: 'Dumbbell',
    color: '#79AFE0',
    imagePath: ASSETS.cat3
  },
  {
    id: 'work',
    name: 'Work / Employment',
    description: 'Projects, deliverables, tasks, and professional milestones.',
    iconName: 'Briefcase',
    color: '#91B7A0',
    imagePath: ASSETS.cat4
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Venture planning, sales targets, marketing and appointments.',
    iconName: 'TrendingUp',
    color: '#D99576',
    imagePath: ASSETS.cat1
  },
  {
    id: 'household',
    name: 'Household',
    description: 'Room cleaning schedules, shopping lists, and home maintenance.',
    iconName: 'Home',
    color: '#E8A4B8',
    imagePath: ASSETS.cat2
  },
  {
    id: 'reading',
    name: 'Reading / Research',
    description: 'Personal library, book chapters, page tracking, and notes.',
    iconName: 'BookOpen',
    color: '#B9B0E8',
    imagePath: ASSETS.cat3
  },
  {
    id: 'family',
    name: 'Family / Social',
    description: 'Birthdays, anniversaries, family events, and gatherings.',
    iconName: 'Users',
    color: '#F4B6C2',
    imagePath: ASSETS.cat4
  },
  {
    id: 'personal_dev',
    name: 'Personal Development',
    description: 'Skill building, reflection, habits, and self-growth.',
    iconName: 'Sparkles',
    color: '#88D498',
    imagePath: ASSETS.cat1
  },
  {
    id: 'travel',
    name: 'Travel / Events',
    description: 'Trip planning, itineraries, transport, and budgets.',
    iconName: 'Plane',
    color: '#65CBE9',
    imagePath: ASSETS.cat2
  },
  {
    id: 'meetings',
    name: 'Meetings / Conferences',
    description: 'Agendas, discussion points, meeting minutes, and actions.',
    iconName: 'CalendarCheck',
    color: '#B48EAD',
    imagePath: ASSETS.cat3
  }
];

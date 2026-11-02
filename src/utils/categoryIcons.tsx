import React from 'react';
import { 
  GraduationCap, 
  HeartHandshake, 
  Dumbbell, 
  Briefcase, 
  TrendingUp, 
  Home, 
  BookOpen, 
  Users, 
  Sparkles, 
  Plane, 
  CalendarCheck,
  Tag
} from 'lucide-react';

interface CategoryIconProps {
  iconName?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = 'w-3.5 h-3.5' }) => {
  switch (iconName) {
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Plane':
      return <Plane className={className} />;
    case 'CalendarCheck':
      return <CalendarCheck className={className} />;
    default:
      return <Tag className={className} />;
  }
};

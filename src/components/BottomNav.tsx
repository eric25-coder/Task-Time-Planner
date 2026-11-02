import React from 'react';
import { useTaskTime } from '../context/TaskTimeContext';
import { THEMES } from '../utils/themeStyles';
import { Home, Calendar, CheckSquare, Target, BarChart2 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, theme, setActiveCategoryWorkspace } = useTaskTime();
  const themeConfig = THEMES[theme];

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'reports', label: 'Reports', icon: BarChart2 }
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setActiveCategoryWorkspace(null); // Return to main tab view when clicking bottom nav
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-lg transition-colors"
      style={{ backgroundColor: `${themeConfig.cards}E6`, borderColor: themeConfig.border }}
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
              isActive 
                ? 'bg-white shadow-sm scale-105 font-bold' 
                : 'opacity-70 hover:opacity-100 hover:bg-white/40'
            }`}
            style={{ color: isActive ? themeConfig.accent : themeConfig.text }}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

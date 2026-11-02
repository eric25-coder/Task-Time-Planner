/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TaskTimeProvider, useTaskTime } from './context/TaskTimeContext';
import { THEMES } from './utils/themeStyles';
import { Onboarding } from './components/Onboarding';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeDashboard } from './components/home/HomeDashboard';
import { ActivitiesScreen } from './components/activities/ActivitiesScreen';
import { HabitsScreen } from './components/habits/HabitsScreen';
import { GoalsScreen } from './components/goals/GoalsScreen';
import { ReportsScreen } from './components/reports/ReportsScreen';
import { WorkspaceContainer } from './components/workspaces/WorkspaceContainer';

import { App as CapApp } from '@capacitor/app';

const MainAppContent: React.FC = () => {
  const { onboardingCompleted, theme, activeTab, setActiveTab, activeCategoryWorkspace, setActiveCategoryWorkspace } = useTaskTime();
  const themeConfig = THEMES[theme];

  React.useEffect(() => {
    const listener = CapApp.addListener('backButton', () => {
      if (activeCategoryWorkspace !== null) {
        setActiveCategoryWorkspace(null);
      } else if (activeTab !== 'home') {
        setActiveTab('home');
      } else {
        CapApp.minimizeApp();
      }
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, [activeCategoryWorkspace, activeTab, setActiveCategoryWorkspace, setActiveTab]);

  if (!onboardingCompleted) {
    return <Onboarding />;
  }

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-500 font-sans relative selection:bg-pink-200"
      style={{ backgroundColor: themeConfig.bg, color: themeConfig.text }}
    >
      {/* Background digital stationery decorative patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#E88BB5_1px,transparent_1px)] [background-size:24px_24px]" />

      <Header />

      <main className="relative z-10">
        {activeCategoryWorkspace !== null ? (
          <WorkspaceContainer />
        ) : (
          <>
            {activeTab === 'home' && <HomeDashboard />}
            {activeTab === 'activities' && <ActivitiesScreen />}
            {activeTab === 'habits' && <HabitsScreen />}
            {activeTab === 'goals' && <GoalsScreen />}
            {activeTab === 'reports' && <ReportsScreen />}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <TaskTimeProvider>
      <MainAppContent />
    </TaskTimeProvider>
  );
}

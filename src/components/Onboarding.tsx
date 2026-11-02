import React, { useState } from 'react';
import { useTaskTime } from '../context/TaskTimeContext';
import { THEMES } from '../utils/themeStyles';
import { ThemeType, CategoryId } from '../types';
import { AnimeMascot } from './AnimeMascot';
import { ASSETS } from '../utils/assets';
import { CategoryIcon } from '../utils/categoryIcons';
import { Sparkles, ArrowRight, ArrowLeft, Check, Heart, Star, BookOpen, Dumbbell, Briefcase, TrendingUp, Home, Users, Plane, CalendarCheck } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { setOnboardingCompleted, setTheme, updateUser, categories } = useTaskTime();
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('Miyu');
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    categories.map(c => c.id)
  );
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('blossom');

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    updateUser(name.trim() || 'Miyu', 'Mimi', 'every_open');
    setTheme(selectedTheme);
    setOnboardingCompleted(true);
  };

  const themeConfig = THEMES[selectedTheme];

  const getCategoryIcon = (iconName: string) => {
    return <CategoryIcon iconName={iconName} className="w-5 h-5" />;
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500"
      style={{ backgroundColor: themeConfig.bg, color: themeConfig.text }}
    >
      <div 
        className="w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-xl border backdrop-blur-md relative overflow-hidden"
        style={{ backgroundColor: themeConfig.cards, borderColor: themeConfig.border }}
      >
        {/* Soft decorative background patterns */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none" style={{ background: themeConfig.primary }} />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 pointer-events-none" style={{ background: themeConfig.secondary }} />

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight flex items-center gap-1.5" style={{ color: themeConfig.accent }}>
              <Sparkles className="w-6 h-6 animate-pulse" /> TaskTime
            </span>
          </div>
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div 
                key={s} 
                className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8' : 'w-2'}`}
                style={{ backgroundColor: s === step ? themeConfig.accent : themeConfig.border }}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1: WELCOME */}
        {step === 1 && (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <AnimeMascot src={ASSETS.mascot} size={130} name="Mimi" role="TaskTime Mascot" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome to TaskTime!</h1>
              <p className="text-lg opacity-80 font-medium">Your personal space to plan, grow and achieve.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-xs text-sm">
              ✨ Pastel anime digital stationery aesthetic designed to make organising your daily life an absolute joy.
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-98"
              style={{ backgroundColor: themeConfig.accent }}
            >
              GET STARTED <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* SCREEN 2: PERSONAL INFORMATION */}
        {step === 2 && (
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-center">
              <AnimeMascot src={ASSETS.mascot} size={100} name="Mimi" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">What should we call you?</h2>
              <p className="text-sm opacity-80">We will use your name to personalise your daily greeting.</p>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">Your Preferred Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border focus:outline-none focus:ring-2 text-lg font-medium"
                style={{ borderColor: themeConfig.border }}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3.5 rounded-2xl font-semibold bg-white/60 border hover:bg-white transition-all flex items-center gap-1"
                style={{ borderColor: themeConfig.border }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!name.trim()}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ backgroundColor: themeConfig.accent }}
              >
                CONTINUE <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: CATEGORY SELECTION */}
        {step === 3 && (
          <div className="py-4 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold">What would you like to organise?</h2>
              <p className="text-xs opacity-80">Select categories to activate their specialised workspaces. You can change this anytime.</p>
            </div>
            <div className="max-h-64 overflow-y-auto pr-1 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {categories.map(cat => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected ? 'bg-white shadow-sm ring-2' : 'bg-white/40 hover:bg-white/70 opacity-75'
                    }`}
                    style={{ borderColor: isSelected ? themeConfig.accent : themeConfig.border }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{cat.name}</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3.5 rounded-2xl font-semibold bg-white/60 border hover:bg-white transition-all flex items-center gap-1"
                style={{ borderColor: themeConfig.border }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: themeConfig.accent }}
              >
                CONTINUE <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: THEME SELECTION */}
        {step === 4 && (
          <div className="py-4 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold">Choose your favourite look!</h2>
              <p className="text-xs opacity-80">Select your preferred pastel colour theme. You can switch anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.keys(THEMES) as ThemeType[]).map(tKey => {
                const t = THEMES[tKey];
                const isSelected = selectedTheme === tKey;
                return (
                  <div
                    key={tKey}
                    onClick={() => setSelectedTheme(tKey)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all text-center space-y-3 ${
                      isSelected ? 'ring-2 shadow-md bg-white' : 'hover:bg-white/60 bg-white/30'
                    }`}
                    style={{ borderColor: isSelected ? t.accent : t.border }}
                  >
                    <div className="h-16 rounded-xl flex items-center justify-center shadow-xs" style={{ background: t.gradient }}>
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center" style={{ color: t.accent }}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="flex justify-center space-x-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.primary }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.secondary }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-3.5 rounded-2xl font-semibold bg-white/60 border hover:bg-white transition-all flex items-center gap-1"
                style={{ borderColor: themeConfig.border }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: themeConfig.accent }}
              >
                CONTINUE <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: FINISH */}
        {step === 5 && (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <AnimeMascot src={ASSETS.mascot} size={140} name="Mimi" role="Ready for success!" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold">You're all set, {name}!</h2>
              <p className="text-base opacity-80 font-medium">Let's make every day count together.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 text-xs leading-relaxed">
              🎉 Your workspace is fully set up offline-first with zero fake clutter. Everything you create will persist safely on your device.
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-3.5 rounded-2xl font-semibold bg-white/60 border hover:bg-white transition-all flex items-center gap-1"
                style={{ borderColor: themeConfig.border }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-white shadow-lg flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-98"
                style={{ backgroundColor: themeConfig.accent }}
              >
                ENTER TASKTIME <Sparkles className="w-5 h-5 animate-spin" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTaskTime } from '../context/TaskTimeContext';
import { THEMES } from '../utils/themeStyles';
import { ThemeType } from '../types';
import { AnimeMascot } from './AnimeMascot';
import { ASSETS } from '../utils/assets';
import { Bell, Settings, Palette, User, Download, Upload, RefreshCw, X, Shield, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, theme, setTheme, exportData, importData, resetAllData, activities } = useTaskTime();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const themeConfig = THEMES[theme];

  const pendingCount = activities.filter(a => a.status === 'upcoming' || a.status === 'ongoing').length;

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TaskTime_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importData(importText);
    if (success) {
      setImportStatus('Data successfully restored!');
      setTimeout(() => {
        setImportStatus(null);
        setShowSettingsModal(false);
      }, 1500);
    } else {
      setImportStatus('Invalid JSON backup format.');
    }
  };

  return (
    <>
      <header 
        className="px-4 py-3 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md shadow-xs transition-colors"
        style={{ backgroundColor: `${themeConfig.cards}CC`, borderColor: themeConfig.border }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-xs overflow-hidden border" style={{ borderColor: themeConfig.border }}>
            <AnimeMascot src={ASSETS.mascot} size={38} name="" />
          </div>
          <div>
            <div className="text-xs font-semibold opacity-70 tracking-wider uppercase flex items-center gap-1">
              TaskTime <Sparkles className="w-3 h-3 text-pink-500" />
            </div>
            <div className="text-base font-bold tracking-tight" style={{ color: themeConfig.text }}>
              Good morning, {user.name}! ✨
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="relative p-2.5 rounded-2xl bg-white/80 border hover:bg-white transition-all shadow-xs"
            style={{ borderColor: themeConfig.border }}
            title="Notifications"
          >
            <Bell className="w-5 h-5" style={{ color: themeConfig.accent }} />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Settings / Profile */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2.5 rounded-2xl bg-white/80 border hover:bg-white transition-all shadow-xs"
            style={{ borderColor: themeConfig.border }}
            title="Settings & Profile"
          >
            <Settings className="w-5 h-5" style={{ color: themeConfig.accent }} />
          </button>
        </div>
      </header>

      {/* SETTINGS & PROFILE MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-6 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: themeConfig.innerCards, borderColor: themeConfig.border }}
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: themeConfig.border }}>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6" style={{ color: themeConfig.accent }} />
                <h3 className="text-xl font-bold">Settings & Profile</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-2 rounded-full hover:bg-black/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile info */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold opacity-80 uppercase tracking-wider">User Profile</h4>
              <div className="p-4 rounded-2xl bg-white border flex items-center gap-4 shadow-xs" style={{ borderColor: themeConfig.border }}>
                <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center border" style={{ borderColor: themeConfig.border }}>
                  <AnimeMascot src={ASSETS.cat1} size={50} name="" />
                </div>
                <div>
                  <div className="text-lg font-bold">{user.name}</div>
                  <div className="text-xs opacity-70">TaskTime Explorer • Offline Protected</div>
                </div>
              </div>
            </div>

            {/* Theme selector */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold opacity-80 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Pastel Theme Selection
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(THEMES) as ThemeType[]).map(tKey => {
                  const t = THEMES[tKey];
                  const isSelected = theme === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => setTheme(tKey)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected ? 'ring-2 font-bold bg-white shadow-sm' : 'bg-white/50 hover:bg-white'
                      }`}
                      style={{ borderColor: isSelected ? t.accent : t.border }}
                    >
                      <div className="h-8 rounded-lg mb-2 shadow-xs" style={{ background: t.gradient }} />
                      <span className="text-xs">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Data backup & restore */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold opacity-80 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Data & Backup (100% Offline)
              </h4>
              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white border hover:bg-pink-50 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-xs"
                  style={{ borderColor: themeConfig.border }}
                >
                  <Download className="w-4 h-4" /> Export Backup
                </button>
              </div>

              <form onSubmit={handleImportSubmit} className="space-y-2 pt-2">
                <label className="text-xs opacity-70 font-medium">Restore from JSON Backup</label>
                <textarea
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                  placeholder="Paste backup JSON data here..."
                  rows={3}
                  className="w-full p-3 rounded-2xl bg-white border text-xs font-mono"
                  style={{ borderColor: themeConfig.border }}
                />
                <button
                  type="submit"
                  disabled={!importText.trim()}
                  className="w-full py-2.5 px-4 rounded-2xl font-bold text-white text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: themeConfig.accent }}
                >
                  <Upload className="w-4 h-4" /> Restore Data
                </button>
                {importStatus && <div className="text-xs text-center font-medium text-pink-600 pt-1">{importStatus}</div>}
              </form>
            </div>

            {/* Reset data */}
            <div className="pt-4 border-t" style={{ borderColor: themeConfig.border }}>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all TaskTime data? This cannot be undone.')) {
                    resetAllData();
                    setShowSettingsModal(false);
                  }
                }}
                className="w-full py-2.5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 transition-all"
              >
                Reset All App Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: themeConfig.innerCards, borderColor: themeConfig.border }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: themeConfig.border }}>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-pink-500" /> Notifications & Reminders
              </h3>
              <button onClick={() => setShowNotificationsModal(false)} className="p-2 rounded-full hover:bg-black/5">
                <X className="w-5 h-5" />
              </button>
            </div>
            {pendingCount === 0 ? (
              <div className="text-center py-8 space-y-3">
                <div className="flex justify-center">
                  <AnimeMascot src={ASSETS.cat4} size={90} name="" />
                </div>
                <div className="text-sm font-medium opacity-70">No pending tasks or urgent reminders for today. All caught up! ✨</div>
              </div>
            ) : (
              <div className="space-y-2">
                {activities.filter(a => a.status === 'upcoming' || a.status === 'ongoing').map(act => (
                  <div key={act.id} className="p-3 rounded-2xl bg-white border flex items-center justify-between shadow-xs" style={{ borderColor: themeConfig.border }}>
                    <div>
                      <div className="text-sm font-bold">{act.title}</div>
                      <div className="text-xs opacity-70">🕒 {act.startTime} - {act.endTime} • {act.date}</div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-pink-100 text-pink-700">
                      {act.priority.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

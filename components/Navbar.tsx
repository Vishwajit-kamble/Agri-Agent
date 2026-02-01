
import React, { useState } from 'react';
import { Page } from '../types';
import { Leaf, Menu, X, User, Globe, LogOut, GraduationCap, Landmark, ShoppingBag, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Language, getTranslation } from '../translations';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user?: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onDarkModeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, language, onLanguageChange, isDark, onDarkModeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = getTranslation(language).nav;

  const navItems = [
    { name: t.home, page: Page.Home },
    { name: t.diagnose, page: Page.Diagnose },
    { name: t.market, page: Page.Market },
    { name: t.weather, page: Page.Weather },
    { name: t.schemes, page: Page.Schemes },
    { name: t.simulate, page: Page.Simulation },
    { name: t.finance, page: Page.Finance },
    { name: t.academy, page: Page.Academy },
    { name: t.store, page: Page.Store, isComingSoon: true },
    { name: t.team, page: Page.Team },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigate(Page.Home);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-slate-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Page.Home)}>
            <div className="bg-emerald-600 p-1.5 rounded-lg mr-2">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-900 dark:text-emerald-300 tracking-tight">AgriAgent</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-2">
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 p-1 rounded-xl mr-2 border border-slate-100 dark:border-slate-600">
              {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    language === lang ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-[11px] font-bold transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl relative group ${
                  currentPage === item.page ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.page === Page.Academy && <GraduationCap className="h-4 w-4" />}
                {item.page === Page.Schemes && <Landmark className="h-3.5 w-3.5" />}
                {item.page === Page.Store && <ShoppingBag className="h-3.5 w-3.5" />}
                {item.name}
                {item.isComingSoon && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-[7px] font-black px-1 py-0.5 rounded shadow-sm group-hover:scale-110 transition-transform">
                    {t.comingSoon}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={onDarkModeToggle}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-700">
                    {(user.user_metadata?.full_name || user.email)?.[0].toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate" title={user.email}>
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-xs font-bold"
                  title={t.logout}
                >
                  <LogOut className="h-4 w-4" />
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate(Page.Login)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 dark:shadow-slate-900"
              >
                <User className="h-4 w-4" />
                {t.login}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-4">
             <button onClick={() => onLanguageChange(language === 'en' ? 'mr' : (language === 'mr' ? 'hi' : 'en'))} className="text-slate-400 dark:text-slate-500 p-2">
              <Globe className="h-5 w-5" />
            </button>
            <button onClick={onDarkModeToggle} className="p-2 text-slate-600 dark:text-slate-300" aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-emerald-100 dark:border-slate-700 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <div className="flex items-center justify-between px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-600 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-700 shrink-0">
                    {(user.user_metadata?.full_name || user.email)?.[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || user.email}
                  </span>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onNavigate(Page.Login); setIsOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold mb-2"
              >
                <User className="h-5 w-5" />
                {t.login}
              </button>
            )}
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-xl text-base font-bold ${
                  currentPage === item.page ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.page === Page.Academy && <GraduationCap className="h-5 w-5" />}
                    {item.page === Page.Schemes && <Landmark className="h-5 w-5" />}
                    {item.page === Page.Store && <ShoppingBag className="h-5 w-5" />}
                    {item.name}
                  </div>
                  {item.isComingSoon && (
                    <span className="bg-amber-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {t.comingSoon}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

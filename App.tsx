
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DiagnosePage from './pages/DiagnosePage';
import MarketPage from './pages/MarketPage';
import WeatherPage from './pages/WeatherPage';
import TeamPage from './pages/TeamPage';
import LoginPage from './pages/LoginPage';
import SustainabilityPage from './pages/SustainabilityPage';
import SimulationPage from './pages/SimulationPage';
import FinancePage from './pages/FinancePage';
import AcademyPage from './pages/AcademyPage';
import SchemesPage from './pages/SchemesPage';
import StorePage from './pages/StorePage';
import ChatBot from './components/ChatBot';
import AgriVaani from './components/AgriVaani';
import { supabase } from './lib/supabase';
import { Language } from './translations';

// Dark mode preference is stored locally for user convenience.
const THEME_KEY = 'agriagent-theme';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [language, setLanguage] = useState<Language>('en');
  const [session, setSession] = useState<any>(null);
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== 'undefined' && localStorage.getItem(THEME_KEY) === 'dark'
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // When already logged in, do not show Login page — redirect to Home so session is consistent
  useEffect(() => {
    if (session?.user && currentPage === Page.Login) {
      setCurrentPage(Page.Home);
    }
  }, [session?.user, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onNavigate={setCurrentPage} language={language} />;
      case Page.Diagnose:
        return <DiagnosePage language={language} />;
      case Page.Market:
        return <MarketPage language={language} />;
      case Page.Weather:
        return <WeatherPage />;
      case Page.Team:
        return <TeamPage language={language} />;
      case Page.Sustainability:
        return <SustainabilityPage language={language} />;
      case Page.Simulation:
        return <SimulationPage language={language} />;
      case Page.Finance:
        return <FinancePage language={language} user={session?.user} onNavigate={setCurrentPage} />;
      case Page.Academy:
        return <AcademyPage language={language} />;
      case Page.Schemes:
        return <SchemesPage language={language} />;
      case Page.Store:
        return <StorePage language={language} />;
      case Page.Login:
        return (
          <LoginPage
            onLogin={() => {
              supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
                setCurrentPage(Page.Home);
              });
            }}
            language={language}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} language={language} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={session?.user}
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onDarkModeToggle={() => setIsDark((prev) => !prev)}
      />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <ChatBot />
      <AgriVaani language={language} />
    </div>
  );
};

export default App;

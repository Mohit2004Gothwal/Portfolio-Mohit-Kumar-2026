import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnalyticsMonitor } from './components/AnalyticsMonitor';
import { initGoogleAnalytics, trackSectionView, trackEvent } from './lib/analytics';

export default function App() {
  // Dark mode state: default to dark or saved preference / system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [analyticsOpen, setAnalyticsOpen] = useState<boolean>(false);

  // Sync dark class on <html> element and persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Initialize Google Analytics & track initial page view
  useEffect(() => {
    initGoogleAnalytics();
    trackEvent('page_view', {
      page_title: document.title,
      page_path: window.location.pathname,
      initial_theme: darkMode ? 'dark' : 'light',
    });
  }, []);

  // Monitor visitor engagement across all sections via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      { id: 'hero', name: 'Hero Introduction' },
      { id: 'about', name: 'Biography & Milestones' },
      { id: 'skills', name: 'Technical Skills Matrix' },
      { id: 'projects', name: 'Projects Showcase' },
      { id: 'contact', name: 'Contact & Inquiries' },
    ];

    const observedSections: Element[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const currentId = entry.target.id;
            setActiveSection(currentId);

            const sectionMeta = sectionIds.find((s) => s.id === currentId);
            if (sectionMeta) {
              trackSectionView(currentId, sectionMeta.name);
            }
          }
        });
      },
      {
        threshold: [0.25, 0.5],
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observedSections.push(el);
      }
    });

    return () => {
      observedSections.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Real-Time Google Analytics Telemetry Monitor */}
      <AnalyticsMonitor
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        onToggle={() => setAnalyticsOpen((prev) => !prev)}
      />
    </div>
  );
}

import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { trackEvent, trackProfileClick } from '../lib/analytics';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('scroll_to_top', { location: 'footer' });
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-mono font-bold text-sm">
                MK
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-white">
                Mohit Kumar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
              Full-Stack Software Engineer focused on high-concurrency systems, accessible UI, and modern cloud deployment.
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Biography
            </a>
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Skills Matrix
            </a>
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Projects Showcase
            </a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact & Inquiries
            </a>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              id="footer-github-link"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProfileClick('github', personalInfo.githubUrl)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-linkedin-link"
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProfileClick('linkedin', personalInfo.linkedinUrl)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
            </a>

            <a
              id="footer-email-link"
              href={`mailto:${personalInfo.email}`}
              onClick={() => trackProfileClick('email', personalInfo.email)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Send Direct Email"
              aria-label="Email Mohit Kumar"
            >
              <Mail className="w-4 h-4 text-indigo-500" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors ml-2"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Mohit Kumar (@Mohit2004Gothwal). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Automated Confirmation Pipeline Active
            </span>
            <span>&bull;</span>
            <span className="font-mono">GA4 Telemetry Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

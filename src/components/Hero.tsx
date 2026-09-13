import { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal,
  Code2,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { trackEvent, trackProfileClick } from '../lib/analytics';

export function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    trackEvent('copy_email', { source: 'hero_section' });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResumeDownload = () => {
    trackEvent('resume_download', { format: 'cv_summary' });
    // Create and trigger download of a clean text/markdown CV summary
    const cvContent = `# MOHIT KUMAR
Full-Stack Software Engineer | New Delhi, India
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedinUrl}
GitHub: ${personalInfo.githubUrl}

---

## PROFESSIONAL SUMMARY
Dedicated Software Engineer with proven expertise building scalable full-stack web applications, reactive user interfaces, and robust backend microservices using React, TypeScript, Node.js, Express, and PostgreSQL.

## CORE TECHNICAL SKILLS
- Frontend: React 19, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Web Accessibility (WCAG AA)
- Backend: Node.js, Express, PostgreSQL, MongoDB, RESTful APIs, Redis, JWT & OAuth 2.0
- DevOps & Tools: Git, GitHub Actions, Docker, Linux, Cloud Run, Postman
- Foundations: Data Structures & Algorithms, Object-Oriented Design, System Architecture

## EDUCATION
B.Tech in Computer Science & Engineering (2021 - 2025)
Faculty of Engineering & Technology

## FEATURED PROJECTS
1. CloudSync Hub - Distributed asset management & real-time sync engine (React, TypeScript, Node.js, Redis)
2. DevPulse Telemetry Dashboard - Real-time developer analytics & error observer (React, GA4, Tailwind)
3. NexStore Headless Commerce - Modern e-commerce with automated email confirmations (Next.js, Nodemailer)
4. TaskStream Agile Workspace - Collaborative Kanban board with live presence (React, Express, PostgreSQL)

---
Portfolio: ${window.location.origin}
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mohit_Kumar_Software_Engineer_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Introduction */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 dark:from-indigo-400 dark:via-sky-400 dark:to-emerald-400">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
                {personalInfo.role}
              </p>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {personalInfo.tagline} Focused on crafting high-concurrency microservices, modular design systems, and zero-compromise web applications.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                onClick={() => trackEvent('cta_click', { button: 'explore_projects', location: 'hero' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-98"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-contact-me-btn"
                href="#contact"
                onClick={() => trackEvent('cta_click', { button: 'contact_me', location: 'hero' })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300/80 dark:border-zinc-700 transition-all active:scale-98"
              >
                <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>Contact Inquiries</span>
              </a>

              <button
                id="hero-download-cv-btn"
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all"
                title="Download Resume Summary"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Links & Quick Email Copy */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Connect:
              </span>

              <a
                id="hero-linkedin-profile"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProfileClick('linkedin', personalInfo.linkedinUrl)}
                className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>LinkedIn</span>
              </a>

              <a
                id="hero-github-profile"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProfileClick('github', personalInfo.githubUrl)}
                className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 font-mono text-xs text-zinc-700 dark:text-zinc-300 transition-colors"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Code Profile Card & Metrics */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-900 dark:bg-zinc-900/90 text-zinc-200 border border-zinc-800 shadow-2xl p-6 font-mono text-xs overflow-hidden">
              {/* Card Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-400 text-[11px]">mohit-profile.config.ts</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>bash</span>
                </div>
              </div>

              {/* Code Snippet Content */}
              <div className="space-y-1.5 leading-relaxed text-zinc-300">
                <p>
                  <span className="text-indigo-400">const</span> developer = &#123;
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-400">"{personalInfo.name}"</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-emerald-400">"{personalInfo.role}"</span>,
                </p>
                <p className="pl-4">
                  education: <span className="text-amber-300">"B.Tech CSE (2021-2025)"</span>,
                </p>
                <p className="pl-4">
                  location: <span className="text-emerald-400">"{personalInfo.location}"</span>,
                </p>
                <p className="pl-4">
                  languages: [
                  <span className="text-cyan-300">"TypeScript"</span>,{' '}
                  <span className="text-cyan-300">"JavaScript"</span>,{' '}
                  <span className="text-cyan-300">"C++"</span>,{' '}
                  <span className="text-cyan-300">"Python"</span>
                  ],
                </p>
                <p className="pl-4">
                  stack: [
                  <span className="text-cyan-300">"React 19"</span>,{' '}
                  <span className="text-cyan-300">"Node.js"</span>,{' '}
                  <span className="text-cyan-300">"Express"</span>,{' '}
                  <span className="text-cyan-300">"PostgreSQL"</span>
                  ],
                </p>
                <p className="pl-4">
                  availability: <span className="text-emerald-400">true</span>,
                </p>
                <p className="pl-4">
                  emailDispatch: <span className="text-indigo-400">"Automated confirmation active"</span>
                </p>
                <p>&#125;;</p>
                <p className="pt-2 text-zinc-500">
                  // Run test suite & verify readiness
                </p>
                <p className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>All 18 projects & integrations passing (100% verified)</span>
                </p>
              </div>

              {/* Bottom Quick Metric Pills */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-zinc-800 font-sans">
                {personalInfo.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50"
                  >
                    <div className="text-xl font-bold text-white tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-xs text-zinc-400 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

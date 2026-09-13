import { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  Code2,
  Cpu
} from 'lucide-react';
import { personalInfo, bioMilestones } from '../data/portfolioData';
import { trackEvent } from '../lib/analytics';

export function About() {
  const [filterType, setFilterType] = useState<'All' | 'Education' | 'Experience' | 'Achievement'>('All');

  const filteredMilestones = filterType === 'All'
    ? bioMilestones
    : bioMilestones.filter((m) => m.type === filterType);

  const handleFilterClick = (type: 'All' | 'Education' | 'Experience' | 'Achievement') => {
    setFilterType(type);
    trackEvent('about_filter_change', { filter_type: type });
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-amber-500" />;
      case 'Experience':
        return <Briefcase className="w-4 h-4 text-indigo-500" />;
      case 'Achievement':
        return <Award className="w-4 h-4 text-emerald-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Cpu className="w-3.5 h-3.5" />
            <span>Biography & Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Engineering robust systems with precision and purpose.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {personalInfo.bioIntroduction}
          </p>
        </div>

        {/* Narrative & Principles Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Detailed Biography Card */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>Background & Craft</span>
            </h3>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                My passion for programming ignited during early algorithmic problem solving and quickly evolved into architecting full-stack web platforms. Over the course of my B.Tech studies in Computer Science & Engineering (2021–2025), I immersed myself in distributed systems, clean code paradigms, and reactive frontend architectures.
              </p>
              <p>
                Whether designing REST APIs in Node.js, normalizing relational datasets in PostgreSQL, or optimizing high-fidelity React interfaces with Tailwind CSS and strict TypeScript, I aim for measurable impact, sub-second latency, and intuitive developer ergonomics.
              </p>
              <p>
                Beyond code, I actively explore emerging web standards, open-source repositories on GitHub, and community hackathons where fast iteration meets disciplined execution.
              </p>
            </div>

            {/* Quick Facts List */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Based in New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>B.Tech CSE Graduate (2025)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Primary: React, TypeScript, Node.js</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Full-Time & Contract Ready</span>
              </div>
            </div>
          </div>

          {/* Core Principles Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white px-1">
              Engineering Principles
            </h3>
            {personalInfo.principles.map((principle, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-base">
                      {principle.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career & Education Milestones Timeline */}
        <div className="rounded-2xl bg-zinc-50/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Education & Experience Journey
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Academic foundation and industry project milestones
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg text-xs font-medium self-start sm:self-auto">
              {(['All', 'Education', 'Experience', 'Achievement'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterClick(type)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    filterType === type
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
            {filteredMilestones.map((milestone, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 pl-1 group">
                {/* Timeline Dot Icon */}
                <div className="relative z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-indigo-500 transition-colors shadow-xs">
                  {getMilestoneIcon(milestone.type)}
                </div>

                {/* Content Box */}
                <div className="flex-1 p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                      <Calendar className="w-3 h-3" />
                      {milestone.period}
                    </span>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {milestone.location}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mt-1">
                    {milestone.title}
                  </h4>
                  <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-3">
                    {milestone.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

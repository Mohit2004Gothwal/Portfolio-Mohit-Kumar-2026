import { useState, useMemo } from 'react';
import { 
  Code, 
  Server, 
  Cloud, 
  Cpu, 
  Search, 
  Layers, 
  Sparkles, 
  Check, 
  Palette,
  FileCode,
  CheckCircle,
  Database,
  Share2,
  FolderGit2,
  ShieldCheck,
  Zap,
  GitBranch,
  Box,
  Workflow,
  BoxSelect,
  Terminal
} from 'lucide-react';
import { skillsList } from '../data/portfolioData';
import { Skill, SkillCategory } from '../types';
import { trackEvent } from '../lib/analytics';

const categoryIcons: Record<SkillCategory, any> = {
  'Frontend': Code,
  'Backend': Server,
  'DevOps & Cloud': Cloud,
  'Core CS & Languages': Cpu,
};

const iconMap: Record<string, any> = {
  Code,
  FileCode,
  Palette,
  Layers,
  Sparkles,
  CheckCircle,
  Server,
  Database,
  Share2,
  FolderGit2,
  ShieldCheck,
  Zap,
  GitBranch,
  Box,
  Workflow,
  Cloud,
  Cpu,
  BoxSelect,
  Terminal,
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'DevOps & Cloud', 'Core CS & Languages'];

  const filteredSkills = useMemo(() => {
    return skillsList.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    trackEvent('skill_category_filter', { category: cat });
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    trackEvent('skill_item_inspect', { skill_name: skill.name, category: skill.category });
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Skills & Architectural Toolkit
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A comprehensive overview of programming languages, frameworks, cloud tooling, and software engineering competencies.
          </p>
        </div>

        {/* Controls: Search & Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat !== 'All' ? categoryIcons[cat as SkillCategory] : Layers;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search skills, tools, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => {
            const SkillIcon = iconMap[skill.iconName] || Code;
            return (
              <div
                key={index}
                onClick={() => handleSkillClick(skill)}
                className="cursor-pointer group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all space-y-4"
              >
                {/* Card Top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center justify-center transition-colors">
                      <SkillIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {skill.category} &bull; {skill.experience}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200/70 dark:group-hover:bg-zinc-700/60 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              No technical skills matched your filter "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Selected Skill Modal / Detail Inspector */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                    {selectedSkill.category} &bull; {selectedSkill.experience}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                    {selectedSkill.name}
                  </h3>
                </div>
                <div className="text-xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl">
                  {selectedSkill.level}%
                </div>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                {selectedSkill.description}
              </p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Key Concepts & Specializations:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

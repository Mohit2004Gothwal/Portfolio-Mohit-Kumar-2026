import { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  X,
  Code,
  Server,
  Zap,
  Info
} from 'lucide-react';
import { projectsList } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { trackEvent, trackProfileClick } from '../lib/analytics';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [detailedProject, setDetailedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Full-Stack', 'Frontend', 'Backend & Cloud'];

  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory);

  const handleCategoryClick = (cat: ProjectCategory) => {
    setActiveCategory(cat);
    trackEvent('project_category_filter', { category: cat });
  };

  const handleProjectInspect = (project: Project) => {
    setDetailedProject(project);
    trackEvent('project_inspect_modal', { project_id: project.id, project_title: project.title });
  };

  const handleProjectGithubClick = (project: Project) => {
    trackProfileClick('github', project.githubUrl);
    trackEvent('project_github_click', { project_title: project.title });
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Featured Projects & Systems
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Production-grade applications architected with strict TypeScript, modern UI patterns, and resilient backend microservices.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl text-xs font-medium self-start md:self-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Card Header & Visual Gradient Bar */}
              <div>
                <div className={`h-3 w-full bg-gradient-to-r ${project.previewGradient}`} />
                
                <div className="p-6 space-y-4">
                  {/* Category & Featured Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleProjectInspect(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleProjectGithubClick(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Inspect Repository on GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent('project_live_demo_click', { project_title: project.title });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    <span>Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Callout Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-900 text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <Github className="w-5 h-5 text-indigo-400" />
              <span>Explore More Repositories on GitHub</span>
            </h3>
            <p className="text-sm text-zinc-400">
              Browse algorithmic solutions, utility modules, and active open-source contributions by Mohit Kumar.
            </p>
          </div>

          <a
            id="projects-view-all-github"
            href="https://github.com/Mohit2004Gothwal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProfileClick('github', 'https://github.com/Mohit2004Gothwal')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 transition-all shrink-0 shadow-sm"
          >
            <span>@Mohit2004Gothwal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Project Details Modal */}
        {detailedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setDetailedProject(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {detailedProject.category} &bull; Case Study
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mt-1">
                    {detailedProject.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {detailedProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setDetailedProject(null)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Description */}
              <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <p>{detailedProject.description}</p>
                
                {detailedProject.architecture && (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1">
                    <div className="text-xs font-mono uppercase font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" />
                      <span>System Architecture</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                      {detailedProject.architecture}
                    </p>
                  </div>
                )}

                {detailedProject.impact && (
                  <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                    <div className="text-xs font-mono uppercase font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Measured Impact & Benchmarks</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
                      {detailedProject.impact}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    Key Implementation Highlights
                  </h4>
                  <div className="space-y-2">
                    {detailedProject.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                    Technologies & Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detailedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <a
                  href={detailedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProjectGithubClick(detailedProject)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>

                <button
                  onClick={() => setDetailedProject(null)}
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

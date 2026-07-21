import React, { useState } from 'react';
import { projectLabels, type ProjectData } from '../../data/projectsData';
import { ExternalLink, GitBranch, Layers, Target, Calendar, TrendingUp, TrendingDown, Minus, ChevronRight, ImageIcon, CheckCircle2, BookOpen, Code2, Award, Orbit } from 'lucide-react';
import { useLanguage } from '../../contexts/language';

const TrendIcon: React.FC<{ trend?: 'up' | 'down' | 'neutral' }> = ({ trend }) => {
  if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-white/30 dark:text-white/30" />;
};

export const ProjectViewer: React.FC<{ project: ProjectData }> = ({ project }) => {
  const { language } = useLanguage();
  const labels = projectLabels[language];
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const projectIcon = project.icon === 'validator'
    ? <Code2 size={24} className="text-emerald-600 dark:text-emerald-400" />
    : project.icon === 'nasa'
      ? <Orbit size={24} className="text-sky-600 dark:text-sky-400" />
      : <Award size={24} className="text-amber-600 dark:text-amber-400" />;

  return (
    <div className="h-full w-full flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0c0c0e] dark:to-[#111114] text-black dark:text-white overflow-hidden">

      {/* ───────── SIDEBAR ───────── */}
      <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/[0.06] p-6 overflow-y-auto custom-scrollbar bg-white/50 dark:bg-white/[0.02]">
        {/* Project Identity */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shadow-lg">
            {projectIcon}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight truncate">{project.name}</h1>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full border ${
              project.status === 'Concluído' || project.status === 'Completed'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : project.status === 'Em Desenvolvimento' || project.status === 'In Development'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                : 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'Concluído' || project.status === 'Completed' ? 'bg-emerald-500' : project.status === 'Em Desenvolvimento' || project.status === 'In Development' ? 'bg-blue-500' : 'bg-gray-500'
              }`} />
              {project.status}
            </span>
          </div>
        </div>

        <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed mb-5">
          {project.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mb-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity shadow-md"
            >
              <GitBranch size={15} /> {labels.source}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md"
            >
              <ExternalLink size={15} /> {labels.demo}
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/30 mb-3">{labels.stack}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-black/70 dark:text-white/60 hover:bg-black/[0.08] dark:hover:bg-white/[0.12] hover:text-black dark:hover:text-white transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/30 mb-3">{labels.metrics}</h3>
          <div className="flex flex-col gap-2">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06]"
              >
                <div className="min-w-0">
                  <p className="text-[10px] text-black/40 dark:text-white/35 font-medium uppercase tracking-wider truncate">{m.label}</p>
                  <p className="text-sm font-bold mt-0.5 truncate">{m.value}</p>
                </div>
                <TrendIcon trend={m.trend} />
              </div>
            ))}
          </div>
        </div>

        {project.proofLinks && project.proofLinks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/30 mb-3">{labels.resources}</h3>
            <div className="flex flex-col gap-2">
              {project.proofLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-black/[0.03] p-3 text-xs font-semibold text-black/60 transition-colors hover:bg-black/[0.06] hover:text-black dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <span className="truncate">{link.label}</span>
                  <ExternalLink size={13} className="shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ───────── MAIN CONTENT ───────── */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-8">

        {/* Description */}
        <section>
          <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed max-w-3xl">
            {project.longDescription}
          </p>
        </section>

        <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wide">{labels.role}</h2>
          </div>
          <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed">{project.role}</p>
        </section>

        <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wide">{labels.highlights}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 rounded-xl border border-black/[0.05] bg-black/[0.03] p-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs leading-relaxed text-black/60 dark:text-white/50">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {(project.installSnippet || project.usageSnippet) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {project.installSnippet && (
              <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Code2 size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wide">{labels.install}</h2>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-black/[0.04] p-4 text-[11px] leading-relaxed text-black/70 dark:bg-black/40 dark:text-white/65">
                  <code>{project.installSnippet}</code>
                </pre>
              </section>
            )}

            {project.usageSnippet && (
              <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Code2 size={14} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wide">{labels.usage}</h2>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-black/[0.04] p-4 text-[11px] leading-relaxed text-black/70 dark:bg-black/40 dark:text-white/65">
                  <code>{project.usageSnippet}</code>
                </pre>
              </section>
            )}
          </div>
        )}

        {/* Architecture & Challenges — side by side on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Layers size={14} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wide">{labels.architecture}</h2>
            </div>
            <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed">{project.architecture}</p>
          </section>

          <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Target size={14} className="text-rose-600 dark:text-rose-400" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wide">{labels.challenges}</h2>
            </div>
            <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed">{project.challenges}</p>
          </section>
        </div>

        {/* Timeline */}
        <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wide">{labels.development}</h2>
          </div>

          <div className="relative ml-3 border-l-2 border-blue-500/20 dark:border-blue-400/15 pl-6 space-y-5">
            {project.timeline.map((event, i) => (
              <div key={i} className="relative group">
                {/* Dot on the line */}
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-[#111114] shadow-[0_0_8px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-shadow" />
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-black/80 dark:text-white/90">{event.title}</h3>
                  <span className="text-[10px] text-black/35 dark:text-white/30 font-medium">{event.date}</span>
                </div>
                <p className="text-xs text-black/50 dark:text-white/45 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="p-5 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <ImageIcon size={14} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wide">{labels.screenshots}</h2>
            </div>

            {/* Large preview */}
            {selectedImg !== null && (
              <div
                className="mb-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 cursor-pointer"
                onClick={() => setSelectedImg(null)}
              >
                <img
                  src={project.screenshots[selectedImg]}
                  alt={`${project.name} screenshot ${selectedImg + 1}`}
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
            )}

            {/* Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {project.screenshots.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(selectedImg === i ? null : i)}
                  className={`rounded-xl overflow-hidden border bg-black/5 dark:bg-black/30 aspect-video relative group transition-all duration-300 ${
                    selectedImg === i
                      ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-lg scale-[0.97]'
                      : 'border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:shadow-md'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={12} className="text-white drop-shadow-md" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

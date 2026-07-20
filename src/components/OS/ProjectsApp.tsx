import React from 'react';
import { getProjectsData, projectLabels } from '../../data/projectsData';
import { Folder, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/language';

export const ProjectsApp: React.FC = () => {
  const { language } = useLanguage();
  const projects = getProjectsData(language);
  const labels = projectLabels[language];

  const openProject = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-os-window', { detail: `project-${id}` }));
  };

  return (
    <div className="h-full w-full bg-white/60 dark:bg-black/40 backdrop-blur-md text-black dark:text-white p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Folder className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        <h1 className="text-3xl font-bold">{labels.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => openProject(project.id)}
            className="group flex flex-col items-start p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all text-left shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-inner border border-black/10 dark:border-white/10">
              {project.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-black/90 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors">
              {project.name}
            </h3>
            
            <p className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
              {project.techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black/10 dark:bg-white/10 rounded-md text-black/70 dark:text-white/70 font-semibold border border-black/5 dark:border-white/5">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black/10 dark:bg-white/10 rounded-md text-black/50 dark:text-white/50 font-semibold border border-black/5 dark:border-white/5">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-black/10 dark:border-white/10">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                project.status === 'Concluído' || project.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                project.status === 'Em Desenvolvimento' || project.status === 'In Development' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                'bg-gray-500/10 text-gray-400 border-gray-500/20'
              }`}>
                {project.status}
              </span>
              <ExternalLink size={16} className="text-black/40 dark:text-white/40 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

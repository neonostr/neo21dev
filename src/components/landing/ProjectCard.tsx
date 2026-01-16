import { ExternalLink } from 'lucide-react';
import { Project, categoryLabels, categoryColors } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? 'md:p-6' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`font-semibold group-hover:text-primary transition-colors ${
          featured ? 'text-lg' : 'text-base'
        }`}>
          {project.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>
      
      <p className={`text-muted-foreground mb-4 leading-relaxed ${
        featured ? 'text-sm md:text-base' : 'text-sm'
      }`}>
        {project.description}
      </p>
      
      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
        {categoryLabels[project.category]}
      </span>
    </a>
  );
};

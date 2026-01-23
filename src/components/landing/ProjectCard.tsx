import { ArrowUpRight } from 'lucide-react';
import { Project, categoryLabels } from '@/data/projects';

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
      className={`group block rounded-md border bg-card p-5 transition-all hover:border-primary/50 ${
        featured ? 'md:p-6' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`font-semibold group-hover:text-primary transition-colors ${
          featured ? 'text-lg' : 'text-base'
        }`}>
          {project.name}
        </h3>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>
      
      <p className={`text-muted-foreground mb-4 leading-relaxed ${
        featured ? 'text-sm md:text-base' : 'text-sm'
      }`}>
        {project.description}
      </p>
      
      <span className="text-xs text-muted-foreground">
        {categoryLabels[project.category]}
      </span>
    </a>
  );
};

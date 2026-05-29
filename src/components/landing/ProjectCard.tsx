import { ArrowUpRight } from 'lucide-react';
import { Project, categoryLabels } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const NEO_TLDS = ['neo21.io', 'neo21.dev'] as const;

const adaptNeoUrl = (url: string): string => {
  if (typeof window === 'undefined') return url;
  const host = window.location.hostname;
  const currentTld = NEO_TLDS.find((t) => host === t || host.endsWith(`.${t}`));
  if (!currentTld) return url;
  try {
    const u = new URL(url);
    const otherTld = NEO_TLDS.find((t) => t !== currentTld)!;
    if (u.hostname === otherTld || u.hostname.endsWith(`.${otherTld}`)) {
      u.hostname = u.hostname.slice(0, -otherTld.length) + currentTld;
      return u.toString();
    }
  } catch {
    // ignore
  }
  return url;
};

export const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const href = adaptNeoUrl(project.url);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col h-full rounded-md border bg-card p-5 transition-all hover:border-primary/50 ${
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
      
      <p className={`text-muted-foreground leading-relaxed ${
        featured ? 'text-sm md:text-base' : 'text-sm'
      }`}>
        {project.description}
      </p>
      
      <span className="text-xs text-muted-foreground mt-auto pt-4">
        {categoryLabels[project.category]}
      </span>
    </a>
  );
};

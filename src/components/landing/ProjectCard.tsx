import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const NEO_TLDS = ['neo21.io', 'neo21.dev'] as const;
type NeoTld = (typeof NEO_TLDS)[number];

const LOVABLE_HOST_SUFFIXES = ['.lovable.app', '.lovable.dev'] as const;

const isNeoSubdomainUrl = (url: string): NeoTld | null => {
  try {
    const u = new URL(url);
    return NEO_TLDS.find((t) => u.hostname === t || u.hostname.endsWith(`.${t}`)) ?? null;
  } catch {
    return null;
  }
};

const swapNeoTld = (url: string, from: NeoTld, to: NeoTld): string => {
  try {
    const u = new URL(url);
    u.hostname = u.hostname.slice(0, -from.length) + to;
    return u.toString();
  } catch {
    return url;
  }
};

const resolveUrl = (project: Project): string => {
  if (typeof window === 'undefined') return project.url;
  const host = window.location.hostname;

  // Bucket 1: visitor is on neo21.io or neo21.dev — match current TLD
  const currentNeoTld = NEO_TLDS.find((t) => host === t || host.endsWith(`.${t}`));
  if (currentNeoTld) {
    const projectNeoTld = isNeoSubdomainUrl(project.url);
    if (projectNeoTld && projectNeoTld !== currentNeoTld) {
      return swapNeoTld(project.url, projectNeoTld, currentNeoTld);
    }
    return project.url;
  }

  // Bucket 2: lovable preview / published — neo21 subdomains => .io, others as-is
  const isLovable = LOVABLE_HOST_SUFFIXES.some((s) => host.endsWith(s));
  if (isLovable) {
    const projectNeoTld = isNeoSubdomainUrl(project.url);
    if (projectNeoTld && projectNeoTld !== 'neo21.io') {
      return swapNeoTld(project.url, projectNeoTld, 'neo21.io');
    }
    return project.url;
  }

  // Bucket 3: anywhere else (nsite, mirrors, custom hosts)
  if (project.alternativeUrl && project.alternativeUrl.trim()) {
    return project.alternativeUrl;
  }
  const projectNeoTld = isNeoSubdomainUrl(project.url);
  if (projectNeoTld && projectNeoTld !== 'neo21.dev') {
    return swapNeoTld(project.url, projectNeoTld, 'neo21.dev');
  }
  return project.url;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const href = resolveUrl(project);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 border-b py-4 px-2 transition-colors hover:bg-muted/40"
    >
      <div className="flex-1 min-w-0 sm:flex sm:items-baseline sm:gap-6">
        <h3 className="font-medium text-base sm:w-48 sm:flex-shrink-0">{project.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
    </a>
  );
};

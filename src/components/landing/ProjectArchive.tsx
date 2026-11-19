import { useState } from 'react';
import { allProjects, ProjectCategory, categoryLabels } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const categories: (ProjectCategory | 'all')[] = ['all', 'bitcoin', 'entertainment', 'nostr', 'other'];

export const ProjectArchive = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter((p) => p.category === filter);

  return (
    <section className="py-12">
      <div className="flex flex-wrap items-center gap-y-1 mb-4 text-xs font-medium uppercase tracking-widest">
        {categories.map((cat, i) => (
          <span key={cat} className="flex items-center">
            {i > 0 && <span className="mx-2 text-border" aria-hidden="true">/</span>}
            <button
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`uppercase transition-colors ${
                filter === cat
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </button>
          </span>
        ))}
      </div>

      <div className="border-t">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
};

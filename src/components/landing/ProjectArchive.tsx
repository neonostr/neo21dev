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
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">All Projects</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-md text-sm border transition-colors ${
              filter === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground hover:text-foreground hover:border-foreground'
            }`}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
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

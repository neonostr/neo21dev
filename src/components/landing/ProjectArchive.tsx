import { useState } from 'react';
import { allProjects, ProjectCategory, categoryLabels } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const categories: (ProjectCategory | 'all')[] = ['all', 'bitcoin', 'education', 'nostr', 'other'];

export const ProjectArchive = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter((p) => p.category === filter);

  return (
    <section className="py-16">
      <h2 className="text-xl font-semibold mb-6 text-muted-foreground">All Projects</h2>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
        ))}
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

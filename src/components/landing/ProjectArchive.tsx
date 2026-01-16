import { useState } from 'react';
import { archiveProjects, ProjectCategory, categoryLabels } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { Grid3X3 } from 'lucide-react';

const categories: (ProjectCategory | 'all')[] = ['all', 'app', 'bitcoin', 'nostr', 'education'];

export const ProjectArchive = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  
  const filteredProjects = filter === 'all' 
    ? archiveProjects 
    : archiveProjects.filter((p) => p.category === filter);

  return (
    <section className="py-16">
      <div className="flex items-center gap-2 mb-6">
        <Grid3X3 className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-bold">All Projects</h2>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
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

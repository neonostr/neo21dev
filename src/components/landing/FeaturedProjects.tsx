import { featuredProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-12">
      <h2 className="hl-heading text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Featured</h2>
      <div className="border-t">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

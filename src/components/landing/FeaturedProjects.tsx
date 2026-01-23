import { featuredProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-xl font-semibold mb-8 text-muted-foreground">Featured</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} featured />
        ))}
      </div>
    </section>
  );
};

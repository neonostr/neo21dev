import { featuredProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
export const FeaturedProjects = () => {
  return <section id="projects" className="py-16">
      <div className="flex items-center gap-2 mb-8">
        
        <h2 className="text-2xl font-bold">Featured</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {featuredProjects.map(project => <ProjectCard key={project.id} project={project} featured />)}
      </div>
    </section>;
};
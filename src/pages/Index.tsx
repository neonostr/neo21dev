import { Hero } from '@/components/landing/Hero';
import { FeaturedProjects } from '@/components/landing/FeaturedProjects';
import { ProjectArchive } from '@/components/landing/ProjectArchive';
import { NostrFeed } from '@/components/landing/NostrFeed';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 md:px-6 max-w-5xl">
        <Hero />
        <FeaturedProjects />
        <ProjectArchive />
        <NostrFeed />
        <Footer />
      </main>
    </div>
  );
};

export default Index;

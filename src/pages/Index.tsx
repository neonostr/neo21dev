import { Hero } from '@/components/landing/Hero';
import { FeaturedProjects } from '@/components/landing/FeaturedProjects';
import { ProjectArchive } from '@/components/landing/ProjectArchive';
import { NostrFeed } from '@/components/landing/NostrFeed';
import { Footer } from '@/components/landing/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

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
      
      {/* Hidden theme switcher - click the palette icon in bottom-right to cycle colors */}
      {/* Remove this component once you've chosen your accent color */}
      <ThemeSwitcher />
    </div>
  );
};

export default Index;

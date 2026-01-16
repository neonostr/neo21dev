import { ExternalLink } from "lucide-react";
export const Hero = () => {
  return <section className="py-20 md:py-32">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          I build things that <span className="text-gradient">respect you</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          No tracking. No data collection. Simple as that.
        </p>

        <div className="flex flex-wrap gap-4">
          <a href="https://nostr.com" // Replace with your Nostr profile link
        target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-sm">
            Follow on Nostr
            <ExternalLink className="w-4 h-4" />
          </a>

          <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors font-medium">
            View Projects
          </a>
        </div>
      </div>
    </section>;
};
export const Hero = () => {
  return (
    <section className="py-24 md:py-40">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
          I build for the open internet.
        </h1>

        <div className="space-y-4 mb-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Because I'm tired of apps that track you, platforms that own your data, and a web that treats people as
            products.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            This is my corner of the internet where I ship tools that put you in control.
            <span className="block mt-2 text-muted-foreground">Bitcoin. Nostr & More. Privacy by default.</span>
          </p>
        </div>

        <a
          href="#projects"
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          See what I'm building →
        </a>
      </div>
    </section>
  );
};

export const Hero = () => {
  return (
    <section className="py-32 md:py-48">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          Freedom Tech
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
          Tools that respect your privacy.
          <br />
          No tracking. No data collection.
        </p>

        <a
          href="#projects"
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          View Projects
        </a>
      </div>
    </section>
  );
};

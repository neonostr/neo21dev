export const Hero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-20">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          I build for the open internet.
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Because I'm tired of apps that track you, platforms that own your data, and a web that treats people as
          products. This is my corner of the internet where I ship tools that put you in control.
        </p>
        <a
          href="#projects"
          className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium border border-primary hover:bg-background hover:text-foreground transition-colors"
        >
          See what I'm building →
        </a>
      </div>
    </section>
  );
};

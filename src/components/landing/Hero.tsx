import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export const Hero = () => {
  return (
    <section className="py-24 md:py-40">
      <motion.div 
        className="max-w-2xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          variants={item}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
        >
          I build for the open internet.
        </motion.h1>

        <motion.div variants={item} className="space-y-4 mb-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Because I'm tired of apps that track you, platforms that own your data, and a web that treats people as
            products.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            This is my corner of the internet where I ship tools that put you in control.
            <span className="block mt-2 text-muted-foreground">Bitcoin. Nostr & More. Privacy by default.</span>
          </p>
        </motion.div>

        <motion.a
          variants={item}
          href="#projects"
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          See what I'm building →
        </motion.a>
      </motion.div>
    </section>
  );
};

export type ProjectCategory = "app" | "bitcoin" | "nostr" | "education";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  url: string;
  featured?: boolean;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  app: "Web App",
  bitcoin: "Bitcoin Tool",
  nostr: "Nostr Tool",
  education: "Educational",
};

export const categoryColors: Record<ProjectCategory, string> = {
  app: "bg-primary/10 text-primary",
  bitcoin: "bg-orange-500/10 text-orange-600",
  nostr: "bg-purple-500/10 text-purple-600",
  education: "bg-emerald-500/10 text-emerald-600",
};

// Replace with your actual projects
export const projects: Project[] = [
  {
    id: "1",
    name: "Currency Converter",
    description: "A privacy focused Bitcoin currency converter.",
    category: "bitcoin",
    url: "https://converter.neo21.dev",
    featured: true,
  },
  {
    id: "2",
    name: "WhyBitcoin101",
    description: "Explore Bitcoin and collaborate to build the ultimate orange pill.",
    category: "bitcoin",
    url: "https://whybitcoin101.com",
    featured: true,
  },
  {
    id: "3",
    name: "Nostr Client",
    description: "Lightweight Nostr client built for speed and simplicity.",
    category: "nostr",
    url: "https://example.com",
    featured: true,
  },
  {
    id: "4",
    name: "Bitcoin Basics",
    description: "Interactive guide to understanding Bitcoin fundamentals.",
    category: "education",
    url: "https://example.com",
  },
  {
    id: "5",
    name: "Lightning Learn",
    description: "Educational platform for Lightning Network concepts.",
    category: "education",
    url: "https://example.com",
  },
  {
    id: "6",
    name: "Nostr Relay Finder",
    description: "Discover and compare Nostr relays by performance.",
    category: "nostr",
    url: "https://example.com",
  },
  {
    id: "7",
    name: "UTXO Tracker",
    description: "Privacy-preserving Bitcoin UTXO management tool.",
    category: "bitcoin",
    url: "https://example.com",
  },
  {
    id: "8",
    name: "Key Manager",
    description: "Secure Nostr key management and backup utility.",
    category: "nostr",
    url: "https://example.com",
  },
  {
    id: "9",
    name: "Privacy Guide",
    description: "Comprehensive guide to digital privacy practices.",
    category: "education",
    url: "https://example.com",
  },
  {
    id: "10",
    name: "Block Explorer",
    description: "Minimalist Bitcoin block explorer focused on privacy.",
    category: "bitcoin",
    url: "https://example.com",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

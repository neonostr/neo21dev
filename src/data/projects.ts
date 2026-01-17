export type ProjectCategory = "app" | "bitcoin" | "nostr" | "education";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  url: string;
  featured?: boolean;
  order: number;
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
    name: "Cony",
    description: "A privacy focused Bitcoin currency converter.",
    category: "bitcoin",
    url: "https://converter.neo21.dev",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    name: "WhyBitcoin101",
    description: "Share the why behind Bitcoin with friends and loved ones.",
    category: "education",
    url: "https://whybitcoin101.com",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    name: "Nostr2RSS",
    description: "Subscribe to Nostr authors in your RSS reader.",
    category: "nostr",
    url: "https://nostr2rss.com",
    featured: true,
    order: 3,
  },
  {
    id: "4",
    name: "Bitcoin Basics",
    description: "Interactive guide to understanding Bitcoin fundamentals.",
    category: "education",
    url: "https://example.com",
    order: 4,
  },
  {
    id: "5",
    name: "Lightning Learn",
    description: "Educational platform for Lightning Network concepts.",
    category: "education",
    url: "https://example.com",
    order: 5,
  },
  {
    id: "6",
    name: "Nostr Relay Finder",
    description: "Discover and compare Nostr relays by performance.",
    category: "nostr",
    url: "https://example.com",
    order: 6,
  },
  {
    id: "7",
    name: "UTXO Tracker",
    description: "Privacy-preserving Bitcoin UTXO management tool.",
    category: "bitcoin",
    url: "https://example.com",
    order: 7,
  },
  {
    id: "8",
    name: "Key Manager",
    description: "Secure Nostr key management and backup utility.",
    category: "nostr",
    url: "https://example.com",
    order: 8,
  },
  {
    id: "9",
    name: "Privacy Guide",
    description: "Comprehensive guide to digital privacy practices.",
    category: "education",
    url: "https://example.com",
    order: 9,
  },
  {
    id: "10",
    name: "Block Explorer",
    description: "Minimalist Bitcoin block explorer focused on privacy.",
    category: "bitcoin",
    url: "https://example.com",
    order: 10,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const allProjects = [...projects].sort((a, b) => a.order - b.order);

export type ProjectCategory = "bitcoin" | "nostr" | "education" | "other";

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
  bitcoin: "Bitcoin",
  nostr: "Nostr",
  education: "Educational",
  other: "Other",
};

export const categoryColors: Record<ProjectCategory, string> = {
  bitcoin: "bg-orange-500/10 text-orange-600",
  nostr: "bg-purple-500/10 text-purple-600",
  education: "bg-emerald-500/10 text-emerald-600",
  other: "bg-muted text-muted-foreground",
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
    order: 3,
  },
  {
    id: "3",
    name: "Nostr2RSS",
    description: "Subscribe to Nostr authors in your RSS reader.",
    category: "nostr",
    url: "https://nostr2rss.com",
    featured: true,
    order: 2,
  },
  {
    id: "4",
    name: "The Ultimate Orange Pill",
    description: "Helping the world understand why Bitcoin matters, together. Coordinated on Nostr.",
    category: "education",
    url: "https://whybitcoin101.com/mission",
    order: 4,
  },
  {
    id: "5",
    name: "Daylight",
    description: "Know when the sun rises and sets. Track daylight hours anywhere in the world.",
    category: "other",
    url: "https://daylight.neo21.dev",
    order: 5,
  },
  {
    id: "6",
    name: "Youtube Client",
    description: "Stop the time thieves and reclaim control. Watch on your terms.",
    category: "other",
    url: "https://tube.neo21.dev/",
    order: 6,
  },
  {
    id: "7",
    name: "WTF Happened In 2030",
    description: "A fictional scenario designed to illustrate the importance of Bitcoin self custody.",
    category: "education",
    url: "https://wtfhappenedin2030.com",
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

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const allProjects = [...projects].sort((a, b) => a.order - b.order);

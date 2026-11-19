export type ProjectCategory = "bitcoin" | "entertainment" | "nostr" | "other";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  url: string;
  alternativeUrl?: string;
  /** Set 1, 2, 3… to feature this project in that position. Omit to not feature. */
  featuredOrder?: number;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  bitcoin: "Bitcoin",
  entertainment: "Entertainment",
  nostr: "Nostr",
  other: "Other",
};

export const categoryColors: Record<ProjectCategory, string> = {
  bitcoin: "bg-orange-500/10 text-orange-600",
  entertainment: "bg-muted text-muted-foreground",
  nostr: "bg-purple-500/10 text-purple-600",
  other: "bg-muted text-muted-foreground",
};

// "All Projects" shows projects in exactly this order — move a block up/down to reorder.
export const projects: Project[] = [
  {
    id: "1",
    name: "Cony",
    description: "A privacy focused Bitcoin currency converter.",
    category: "bitcoin",
    url: "https://convy.neo21.io",
    alternativeUrl: "https://2wajpgqff9og15sbgh308qkp0kint2ig6wuf8nt7bh10j3bqesconvy.nsite.run/",
    featuredOrder: 1,
  },
  {
    id: "2",
    name: "WhyBitcoin101",
    description: "Share the why behind Bitcoin with friends and loved ones.",
    category: "bitcoin",
    url: "https://whybitcoin101.com",
    featuredOrder: 2,
  },
  {
    id: "13",
    name: "Movie Finder",
    description: "The best movie recommendations on the internet.",
    category: "entertainment",
    url: "https://moviefinder.neo21.io",
    alternativeUrl: "https://2wajpgqff9og15sbgh308qkp0kint2ig6wuf8nt7bh10j3bqesmoviefinder.nsite.run",
  },
  {
    id: "14",
    name: "My TV Shows",
    description: "Track what you watch, wait for, and finish.",
    category: "entertainment",
    url: "https://tvshows.neo21.io",
    featuredOrder: 3,
  },
  {
    id: "11",
    name: "Kcal",
    description: "The world's simplest calorie tracker.",
    category: "other",
    url: "https://kcal.neo21.io",
    alternativeUrl: "https://2wajpgqff9og15sbgh308qkp0kint2ig6wuf8nt7bh10j3bqeskcal.nsite.run",
  },
  {
    id: "5",
    name: "Daylight",
    description: "Track sunrise, sunset, and daylight hours worldwide.",
    category: "other",
    url: "https://daylight.neo21.io",
  },
  {
    id: "4",
    name: "The Ultimate Orange Pill",
    description: "Helping the world understand why Bitcoin matters.",
    category: "bitcoin",
    url: "https://whybitcoin101.com/mission",
  },
  {
    id: "10",
    name: "WTF Happened In 2030",
    description: "A fictional story on why Bitcoin self-custody matters.",
    category: "bitcoin",
    url: "https://wtfhappenedin2030.com",
  },
  {
    id: "6",
    name: "Youtube Client",
    description: "Reclaim your YouTube feed with zero distractions.",
    category: "entertainment",
    url: "https://tube.neo21.io/",
    alternativeUrl: "https://2wajpgqff9og15sbgh308qkp0kint2ig6wuf8nt7bh10j3bqestube.nsite.run",
  },
  {
    id: "7",
    name: "Listr",
    description: "Discover great stuff from people you trust.",
    category: "nostr",
    url: "https://listr.neo21.io",
  },
  {
    id: "8",
    name: "Like2RSS",
    description: "Turn articles you like on Nostr into RSS feeds.",
    category: "nostr",
    url: "https://like2rss.neo21.io",
  },
  {
    id: "3",
    name: "Nostr2RSS",
    description: "Subscribe to Nostr authors in your RSS reader.",
    category: "nostr",
    url: "https://nostr2rss.neo21.io",
  },
  {
    id: "12",
    name: "Nostrpacks",
    description: "Discover and share curated lists of Nostr users to follow.",
    category: "nostr",
    url: "https://nostrpacks.neo21.io",
  },
  {
    id: "9",
    name: "NostrPad",
    description:
      "A private notepad synced with your Nostr key.",
    category: "nostr",
    url: "https://nostrpad.neo21.io",
  },
];

export const featuredProjects = projects
  .filter((p) => p.featuredOrder !== undefined)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));

export const allProjects = projects;

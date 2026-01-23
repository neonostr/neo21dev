import { useState, useEffect, useRef } from "react";
import { Zap, ExternalLink, RefreshCw } from "lucide-react";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import type { Filter } from "nostr-tools/filter";

// ============ NOSTR CONFIG - Edit these as needed ============
const RELAYS = ["wss://nostr.land", "wss://relay.primal.net", "wss://relay.damus.io", "wss://nostr.wine"];

const AUTHOR_NPUB = "npub1lyqkzmcq5cl5l8rcs82gwxsrmu75emnjj84067kuhm48e9w93cns2hhj2g";

// Add new hashtags here (without the # symbol)
const HASHTAGS = ["convy", "daylight", "neo21dev", "nostr2rss", "whybitcoin101"];
// ==============================================================

interface NostrNote {
  id: string;
  content: string;
  created_at: number;
}

export const NostrFeed = () => {
  const [notes, setNotes] = useState<NostrNote[]>([]);
  const [loading, setLoading] = useState(true);
  const poolRef = useRef<SimplePool | null>(null);

  useEffect(() => {
    const pool = new SimplePool();
    poolRef.current = pool;

    // Decode npub to hex pubkey
    const decoded = nip19.decode(AUTHOR_NPUB);
    const authorPubkey = decoded.data as string;

    const notesMap = new Map<string, NostrNote>();

    // Create subscription requests for each relay + hashtag combo (OR logic)
    const requests = RELAYS.flatMap((url) =>
      HASHTAGS.map((hashtag) => ({
        url,
        filter: {
          kinds: [1],
          authors: [authorPubkey],
          "#t": [hashtag],
          limit: 50,
        } as Filter,
      })),
    );

    const sub = pool.subscribeMap(requests, {
      onevent(event) {
        // Skip replies (events that have an "e" tag are replies)
        const isReply = event.tags.some((tag) => tag[0] === "e");
        if (isReply) return;

        const note: NostrNote = {
          id: event.id,
          content: event.content,
          created_at: event.created_at,
        };

        notesMap.set(event.id, note);

        // Update state with sorted notes
        const sortedNotes = Array.from(notesMap.values()).sort((a, b) => b.created_at - a.created_at);
        setNotes(sortedNotes);
        setLoading(false);
      },
      oneose() {
        setLoading(false);
      },
    });

    // Cleanup on unmount
    return () => {
      sub.close();
      pool.close(RELAYS);
    };
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Strip hashtags from content for cleaner display
  const cleanContent = (content: string) => {
    let cleaned = content;
    HASHTAGS.forEach((tag) => {
      const regex = new RegExp(`#${tag}\\b`, "gi");
      cleaned = cleaned.replace(regex, "");
    });
    return cleaned.trim();
  };

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-muted-foreground">Updates</h2>

        <a
          href={`https://njump.me/${AUTHOR_NPUB}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View on Nostr →
        </a>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No updates found.
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <article key={note.id} className="p-4 rounded-md border bg-card hover:border-primary/30 transition-colors">
              <p className="text-foreground leading-relaxed mb-2">{cleanContent(note.content)}</p>
              <time className="text-xs text-muted-foreground">{formatDate(note.created_at)}</time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

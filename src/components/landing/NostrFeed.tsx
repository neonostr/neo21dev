import { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import type { Filter } from "nostr-tools/filter";

// ============ NOSTR CONFIG - Edit these as needed ============
const RELAYS = ["wss://nostr.land", "wss://relay.primal.net", "wss://relay.damus.io", "wss://nostr.wine"];
const AUTHOR_NPUB = "npub1lyqkzmcq5cl5l8rcs82gwxsrmu75emnjj84067kuhm48e9w93cns2hhj2g";

// Additional npubs to pull ALL kind-1 notes from (no hashtag filter)
const UNFILTERED_NPUBS = ["npub1ws7pcml3j8e8df0dw8gaeep6z550xrs27hcyqwx2sxdyk5e6496qk747fm"];

// Add new hashtags here (without the # symbol)
const HASHTAGS = [
  "convy",
  "Convy",
  "daylight",
  "listr",
  "Listr",
  "like2rss",
  "Like2RSS",
  "neo21dev",
  "nostr2rss",
  "Nostr2RSS",
  "whybitcoin101",
];
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

    // Decode unfiltered npubs to hex pubkeys
    const unfilteredPubkeys = UNFILTERED_NPUBS.map((npub) => {
      const dec = nip19.decode(npub);
      return dec.data as string;
    });

    // Create subscription requests for hashtag-filtered author
    const hashtagRequests = RELAYS.flatMap((url) =>
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

    // Create subscription requests for unfiltered authors (all kind-1)
    const unfilteredRequests = RELAYS.map((url) => ({
      url,
      filter: {
        kinds: [1],
        authors: unfilteredPubkeys,
        limit: 50,
      } as Filter,
    }));

    const allRequests = [...hashtagRequests, ...unfilteredRequests];

    const sub = pool.subscribeMap(allRequests, {
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Parse content and make URLs clickable
  const renderContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
            {part}
          </a>
        );
      }
      return part;
    });
  };
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-muted-foreground">Updates</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No updates found.</p>
      ) : (
        <ScrollArea className="h-[350px]">
          <div className="space-y-4 pr-4">
            {notes.map((note) => (
              <article
                key={note.id}
                className="p-4 rounded-md border bg-card hover:border-primary/30 transition-colors"
              >
                <p className="text-foreground leading-relaxed mb-2">{renderContent(note.content)}</p>
                <time className="text-xs text-muted-foreground">{formatDate(note.created_at)}</time>
              </article>
            ))}
          </div>
        </ScrollArea>
      )}

      <p className="text-xs text-muted-foreground mt-6 text-center md:text-left">
        {"Updates pulled from Nostr: "}
        <a
          href="https://njump.to/npub1ws7pcml3j8e8df0dw8gaeep6z550xrs27hcyqwx2sxdyk5e6496qk747fm"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          neo21dev
        </a>
      </p>
    </section>
  );
};

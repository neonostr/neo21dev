import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import type { Filter } from "nostr-tools/filter";

// ============ NOSTR CONFIG - Edit these as needed ============
const RELAYS = [
  "wss://nostr.land",
  "wss://relay.primal.net",
  "wss://relay.damus.io",
  "wss://nostr.wine",
  "wss://nos.lol",
  "wss://relay.nostr.band",
];
const AUTHOR_NPUB = "npub1ws7pcml3j8e8df0dw8gaeep6z550xrs27hcyqwx2sxdyk5e6496qk747fm";
const THREE_MONTHS_SECONDS = 90 * 24 * 60 * 60;
// ===============================================================

interface NostrNote {
  id: string;
  content: string;
  created_at: number;
}
export const NostrFeed = () => {
  const [notes, setNotes] = useState<NostrNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Hide updates entirely on neo21.io
  const hostname = window.location.hostname;
  const isNeo21Io = hostname === "neo21.io" || hostname === "www.neo21.io";
  if (isNeo21Io) return null;

  useEffect(() => {
    let cancelled = false;
    const pool = new SimplePool({ enableReconnect: true });

    // Decode npub to hex pubkey
    const decoded = nip19.decode(AUTHOR_NPUB);
    const authorPubkey = decoded.data as string;

    const loadNotes = async () => {
      const events = await pool.querySync(
        RELAYS,
        {
          kinds: [1],
          authors: [authorPubkey],
          limit: 50,
        } as Filter,
        { maxWait: 7000 },
      );

      if (cancelled) return;

      const sortedNotes = Array.from(
        new Map(
          events.map((event) => [
            event.id,
            {
              id: event.id,
              content: event.content,
              created_at: event.created_at,
            },
          ]),
        ).values(),
      ).sort((a, b) => b.created_at - a.created_at);

      setNotes(sortedNotes);
      setLoading(false);
    };

    loadNotes().catch(() => {
      if (!cancelled) setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      cancelled = true;
      pool.close(RELAYS);
      pool.destroy();
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

  const latestNote = notes[0];
  const isRecentEnough = latestNote
    ? Date.now() / 1000 - latestNote.created_at < THREE_MONTHS_SECONDS
    : false;

  // Only show updates on non-neo21.io domains if the latest update is within 3 months
  if (!loading && !isRecentEnough) return null;

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
        {"Updates pulled from Nostr | "}
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

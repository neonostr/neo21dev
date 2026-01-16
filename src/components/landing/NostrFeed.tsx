import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
interface NostrNote {
  id: string;
  content: string;
  created_at: number;
}

// Placeholder for Nostr integration
// In production, this would connect to relays and filter by your pubkey + hashtag
const MOCK_NOTES: NostrNote[] = [{
  id: '1',
  content: '🚀 Just shipped a major update to Sats Converter! Now with real-time Lightning invoice generation. #mywebsite',
  created_at: Date.now() / 1000 - 3600
}, {
  id: '2',
  content: 'Working on something new for the Nostr community. Privacy-first relay analytics coming soon. #mywebsite',
  created_at: Date.now() / 1000 - 86400
}, {
  id: '3',
  content: 'Bitcoin Basics guide updated with new chapters on self-custody. Perfect for onboarding friends and family. #mywebsite',
  created_at: Date.now() / 1000 - 172800
}];
export const NostrFeed = () => {
  const [notes, setNotes] = useState<NostrNote[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading - replace with actual Nostr relay connection
    const timer = setTimeout(() => {
      setNotes(MOCK_NOTES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  return <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          
          <h2 className="text-2xl font-bold">Updates</h2>
        </div>
        
        <a href="https://nostr.com" // Replace with your Nostr profile
      target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
          View on Nostr
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      
      {loading ? <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
        </div> : <div className="space-y-4">
          {notes.map(note => <article key={note.id} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <p className="text-foreground leading-relaxed mb-2">
                {note.content.replace(/#mywebsite/g, '').trim()}
              </p>
              <time className="text-xs text-muted-foreground">
                {formatDate(note.created_at)}
              </time>
            </article>)}
        </div>}
      
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Updates pulled from Nostr using <code className="text-primary">#mywebsite</code>
      </p>
    </section>;
};
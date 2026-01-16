import { Shield, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 mt-8 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://nostr.com" // Replace with your Nostr profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            Nostr
          </a>
          
          {/* Add more social links here if needed */}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>No tracking. No data collection.</span>
        </div>
      </div>
    </footer>
  );
};

export const Footer = () => {
  return (
    <footer className="py-8 mt-8 border-t">
      <div className="flex flex-col items-start gap-4">
        <a
          href="https://njump.to/npub1lyqkzmcq5cl5l8rcs82gwxsrmu75emnjj84067kuhm48e9w93cns2hhj2g"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Follow on Nostr
        </a>
        <p className="text-sm text-muted-foreground">It's time to build the world we want to live in.</p>
      </div>
    </footer>
  );
};

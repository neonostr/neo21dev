export const Footer = () => {
  return (
    <footer className="py-12 mt-8 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://njump.to/npub1lyqkzmcq5cl5l8rcs82gwxsrmu75emnjj84067kuhm48e9w93cns2hhj2g"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Find Me ON Nostr
          </a>
        </div>

        <p className="text-sm text-muted-foreground">They build walls. We build doors.</p>
      </div>
    </footer>
  );
};

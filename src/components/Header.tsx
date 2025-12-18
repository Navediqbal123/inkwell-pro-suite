import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/30">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          {/* Premium logo badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 blur-lg opacity-60" />
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              <FileText className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
          </div>
          
          {/* Brand name */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold gradient-text">
              PDF Tools
            </span>
            <span className="text-xl font-bold text-foreground/80">
              Pro
            </span>
          </div>
        </div>
        
        {/* Premium badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Premium
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

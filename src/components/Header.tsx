import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Premium logo badge with enhanced glow */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/40 to-accent/40 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:border-primary/50 transition-all duration-400">
              <FileText className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
          </div>
          
          {/* Brand name */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold gradient-text">
              PDF Tools
            </span>
            <span className="text-xl font-bold text-foreground/85">
              Pro
            </span>
          </div>
        </div>
        
        {/* Premium badge with enhanced design */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/25">
          <div className="relative">
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
            <div className="relative w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Premium
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { FileText } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/20 bg-background/85 backdrop-blur-2xl animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'backwards' }}>
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 hover-lift cursor-pointer group">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 transition-all duration-500 ease-out group-hover:border-primary/40 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FileText className="relative w-5 h-5 text-primary transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">
              <span className="gradient-text">PDF Tools</span>
              <span className="text-foreground"> Pro</span>
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Version Badge */}
          <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-secondary/60 border border-border/40 text-[11px] font-semibold text-muted-foreground/80 tracking-wide transition-all duration-500 ease-out hover:border-border/60 hover:text-muted-foreground">
            v1.0
          </div>
          
          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'backwards' }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 hover-lift cursor-pointer">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 transition-all duration-500 ease-out hover:bg-primary/15 hover:border-primary/30">
            <FileText className="w-5 h-5 text-primary transition-transform duration-500 ease-out hover:scale-110" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-bold">
            <span className="gradient-text">PDF Tools</span>
            <span className="text-foreground"> Pro</span>
          </span>
        </div>

        {/* Badge */}
        <div className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground transition-all duration-500 ease-out hover:border-primary/20 hover:text-foreground/80">
          v1.0
        </div>
      </div>
    </header>
  );
};

export default Header;
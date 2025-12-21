import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-bold">
            <span className="gradient-text">PDF Tools</span>
            <span className="text-foreground"> Pro</span>
          </span>
        </div>

        {/* Badge */}
        <div className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground">
          v1.0
        </div>
      </div>
    </header>
  );
};

export default Header;

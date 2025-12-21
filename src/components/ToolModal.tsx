import { ArrowLeft, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const ToolModal = ({ isOpen, onClose, title, children }: ToolModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'unset';
      }, 600);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with premium blur */}
      <div
        className={`absolute inset-0 bg-background/96 backdrop-blur-3xl transition-all duration-700 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Ambient background glows */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-800 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/12 blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-accent/12 blur-[130px] animate-float" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--glow-cyan))]/8 blur-[180px] animate-breathe" />
      </div>

      {/* Modal with WOW animation */}
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2rem] floating-card transition-all duration-700 ease-out ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-16'
        }`}
        style={{
          boxShadow: isAnimating 
            ? '0 50px 120px rgba(0, 0, 0, 0.7), 0 0 150px hsl(var(--primary) / 0.18), 0 0 80px hsl(var(--accent) / 0.12)'
            : '0 25px 50px rgba(0, 0, 0, 0.5)',
          filter: isAnimating ? 'blur(0px)' : 'blur(10px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header with glassmorphism */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border/40 bg-card/95 backdrop-blur-2xl">
          {/* Back button with premium hover */}
          <button
            onClick={onClose}
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl hover:bg-secondary/90 border border-transparent hover:border-primary/40 transition-all duration-500 ease-out group ripple"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1.5 transition-all duration-500" />
            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              Back
            </span>
          </button>

          {/* Title with gradient */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold gradient-text">
            {title}
          </h2>

          {/* Close button with premium styling */}
          <button
            onClick={onClose}
            className="p-3.5 rounded-xl hover:bg-secondary/90 border border-transparent hover:border-primary/40 transition-all duration-500 ease-out ripple group"
          >
            <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-500" />
          </button>
        </div>

        {/* Content with subtle gradient */}
        <div className="relative p-7 overflow-auto max-h-[calc(90vh-88px)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/4 pointer-events-none" />
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;

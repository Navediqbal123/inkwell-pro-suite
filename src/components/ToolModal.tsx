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
      }, 500);
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
        className={`absolute inset-0 bg-background/95 backdrop-blur-2xl transition-all duration-500 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Ambient background glows */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Modal with premium animation */}
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl floating-card transition-all duration-600 ease-out ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-12'
        }`}
        style={{
          boxShadow: isAnimating 
            ? '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 120px hsl(var(--primary) / 0.15)'
            : '0 20px 40px rgba(0, 0, 0, 0.4)',
          filter: isAnimating ? 'blur(0px)' : 'blur(8px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header with glassmorphism */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border/30 bg-card/90 backdrop-blur-xl">
          {/* Back button with premium hover */}
          <button
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-primary/30 transition-all duration-400 ease-out group ripple"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-400" />
            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-400">
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
            className="p-3 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-primary/30 transition-all duration-400 ease-out ripple group"
          >
            <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-400" />
          </button>
        </div>

        {/* Content with subtle gradient */}
        <div className="relative p-6 overflow-auto max-h-[calc(90vh-80px)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/3 pointer-events-none" />
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;

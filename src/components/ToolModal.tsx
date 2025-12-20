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
      }, 400);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-background/90 backdrop-blur-xl transition-all duration-400 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal with enhanced animation */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl premium-card transition-all duration-500 ease-out ${
        isAnimating 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-8'
      }`}
      style={{
        boxShadow: isAnimating 
          ? '0 32px 64px rgba(0, 0, 0, 0.5), 0 0 100px hsl(var(--primary) / 0.1)'
          : '0 16px 32px rgba(0, 0, 0, 0.3)'
      }}
      >
        {/* Header with back button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border/40 bg-card/95 backdrop-blur-xl">
          {/* Back button with enhanced hover */}
          <button
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border/50 transition-all duration-300 ease-out group ripple"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-0.5 transition-all duration-300" />
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Back
            </span>
          </button>

          {/* Title */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold gradient-text">
            {title}
          </h2>

          {/* Close button with enhanced styling */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border/50 transition-all duration-300 ease-out ripple group"
          >
            <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolModal;
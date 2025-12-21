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
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity duration-400 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Subtle background glow */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl floating-card transition-all duration-500 ease-out ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border/40 bg-card/95 backdrop-blur-xl">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border transition-all duration-300 group ripple"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300" />
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Back
            </span>
          </button>

          {/* Title */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold gradient-text">
            {title}
          </h2>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border transition-all duration-300 ripple group"
          >
            <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 overflow-auto max-h-[calc(90vh-72px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolModal;

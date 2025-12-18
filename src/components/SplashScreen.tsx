import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      {/* Content */}
      <div className={`relative flex flex-col items-center gap-6 transition-all duration-700 ${
        isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl animate-pulse-glow" />
          <div className="relative p-4 rounded-2xl glass">
            <FileText className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
            PDF Tools Pro
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Professional PDF utilities
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-4 flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animation: 'pulse 1s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

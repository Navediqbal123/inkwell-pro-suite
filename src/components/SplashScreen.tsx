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
      }, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-600 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[80px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className={`relative flex flex-col items-center gap-8 transition-all duration-700 ${
        isExiting ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
      }`}>
        {/* Premium Logo */}
        <div className="relative animate-scale-in">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl animate-pulse-glow" />
          <div className="relative p-6 rounded-3xl premium-card">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10" />
            <FileText className="relative w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* App name with premium styling */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">PDF Tools</span>
            <span className="text-foreground/90"> Pro</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground font-medium tracking-wide">
            Professional PDF utilities
          </p>
        </div>

        {/* Premium loading indicator */}
        <div className="mt-6 flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                animation: 'pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

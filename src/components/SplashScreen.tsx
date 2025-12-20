import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background orbs with enhanced depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main center glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-[150px] transition-all duration-1000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`} />
        
        {/* Floating orbs */}
        <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/12 blur-[120px] animate-float transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/12 blur-[100px] animate-float transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animationDelay: '-3s' }} />
        
        {/* Additional ambient light */}
        <div className={`absolute top-1/3 right-1/3 w-[250px] h-[250px] rounded-full bg-primary/8 blur-[80px] animate-breathe transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className={`relative flex flex-col items-center gap-10 transition-all duration-700 ease-out ${
        isExiting ? 'scale-95 opacity-0 translate-y-8' : isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        {/* Premium Logo with enhanced glow */}
        <div className={`relative transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/50 to-accent/50 blur-3xl animate-pulse-glow opacity-60" />
          
          {/* Middle glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
          
          {/* Logo container */}
          <div className="relative p-8 rounded-3xl premium-card">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15" />
            <div className="absolute inset-0 rounded-3xl border border-primary/20" />
            <FileText className="relative w-20 h-20 text-primary drop-shadow-lg" strokeWidth={1.5} />
          </div>
        </div>

        {/* App name with premium styling */}
        <div className={`text-center transition-all duration-700 ease-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="gradient-text glow-text">PDF Tools</span>
            <span className="text-foreground/90"> Pro</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground font-medium tracking-wider uppercase">
            Professional PDF Utilities
          </p>
        </div>

        {/* Premium loading indicator */}
        <div className={`mt-4 flex items-center gap-2.5 transition-all duration-700 ease-out delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                animation: 'loadingDot 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadingDot {
          0%, 80%, 100% { 
            opacity: 0.15; 
            transform: scale(0.6);
          }
          40% { 
            opacity: 1; 
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
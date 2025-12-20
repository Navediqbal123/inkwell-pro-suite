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
    // Trigger entrance animation with slight delay
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 800);
    }, 2800);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-800 ease-out ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background with enhanced depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main center massive glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-[200px] transition-all duration-1200 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`} />
        
        {/* Orbiting lights */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[150px] transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'floatSlow 12s ease-in-out infinite' : 'none' }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-accent/15 blur-[120px] transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'floatSlow 14s ease-in-out infinite reverse' : 'none' }} />
        
        {/* Particle effects */}
        <div className={`absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'breathe 5s ease-in-out infinite' : 'none' }} />
        
        {/* Floating particles */}
        {isLoaded && (
          <>
            <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '-1s' }} />
            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/70 animate-float" style={{ animationDelay: '-3s' }} />
            <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-primary/50 animate-float-slow" style={{ animationDelay: '-2s' }} />
          </>
        )}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className={`relative flex flex-col items-center gap-12 transition-all duration-800 ease-out ${
        isExiting ? 'scale-90 opacity-0 translate-y-10' : isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-6'
      }`}>
        {/* Premium Logo with layered glow */}
        <div className={`relative transition-all duration-800 ease-out delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {/* Outermost glow ring */}
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-primary/50 to-accent/50 blur-[60px] animate-pulse-glow opacity-60" />
          
          {/* Middle glow layer */}
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl" />
          
          {/* Inner glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
          
          {/* Logo container with animated border */}
          <div className="relative p-10 rounded-3xl floating-card">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20" />
            <FileText className="relative w-24 h-24 text-primary drop-shadow-2xl" strokeWidth={1.2} />
          </div>
        </div>

        {/* App name with premium animated gradient */}
        <div className={`text-center transition-all duration-800 ease-out delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight">
            <span className="gradient-text-hero glow-text">PDF Tools</span>
            <span className="text-foreground/90"> Pro</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground font-semibold tracking-[0.3em] uppercase">
            Professional PDF Utilities
          </p>
        </div>

        {/* Premium animated loader */}
        <div className={`mt-6 flex flex-col items-center gap-6 transition-all duration-800 ease-out delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {/* Spinning ring loader */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div 
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/50"
              style={{ animation: 'loaderSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite' }}
            />
            <div 
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent/70 border-l-accent/30"
              style={{ animation: 'loaderSpin 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-glow" />
            </div>
          </div>
          
          {/* Loading dots */}
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                style={{
                  animation: 'loadingDot 1.6s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loadingDot {
          0%, 80%, 100% { 
            opacity: 0.15; 
            transform: scale(0.5);
          }
          40% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

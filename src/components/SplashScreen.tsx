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
    // Trigger entrance animation with slight delay for dramatic effect
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1000);
    }, 3200);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-1000 ease-out ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* WOW animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main center massive glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-gradient-to-br from-primary/30 via-accent/25 to-[hsl(var(--glow-cyan))]/20 blur-[250px] transition-all duration-[1.5s] ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-40'
        }`} />
        
        {/* Orbiting cyber lights */}
        <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[180px] transition-all duration-[1.2s] delay-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'floatSlow 14s ease-in-out infinite' : 'none' }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-accent/20 blur-[160px] transition-all duration-[1.2s] delay-400 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'floatSlow 16s ease-in-out infinite reverse' : 'none' }} />
        <div className={`absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(var(--glow-cyan))]/15 blur-[120px] transition-all duration-[1.2s] delay-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} style={{ animation: isLoaded ? 'breathe 6s ease-in-out infinite' : 'none' }} />
        
        {/* Floating particles */}
        {isLoaded && (
          <>
            <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full bg-primary/80 animate-float" style={{ animationDelay: '-1s' }} />
            <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-accent/80 animate-float" style={{ animationDelay: '-3s' }} />
            <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 rounded-full bg-[hsl(var(--glow-cyan))]/80 animate-float-slow" style={{ animationDelay: '-2s' }} />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-primary/60 animate-float" style={{ animationDelay: '-4s' }} />
          </>
        )}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className={`relative flex flex-col items-center gap-14 transition-all duration-1000 ease-out ${
        isExiting ? 'scale-90 opacity-0 translate-y-12' : isLoaded ? 'scale-100 opacity-100 translate-y-0' : 'scale-85 opacity-0 translate-y-8'
      }`}>
        {/* Premium Logo with layered cyber glow */}
        <div className={`relative transition-all duration-1000 ease-out delay-150 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          {/* Outermost mega glow */}
          <div className="absolute -inset-12 rounded-[4rem] bg-gradient-to-br from-primary/60 via-accent/50 to-[hsl(var(--glow-cyan))]/50 blur-[80px] animate-pulse-glow opacity-70" />
          
          {/* Middle glow layer */}
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-primary/50 to-accent/50 blur-[40px]" />
          
          {/* Inner glow */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/40 to-[hsl(var(--glow-cyan))]/40 blur-2xl" />
          
          {/* Logo container with animated border */}
          <div className="relative p-12 rounded-[2rem] floating-card">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/25 to-accent/25" />
            <FileText className="relative w-28 h-28 text-primary drop-shadow-2xl" strokeWidth={1.2} />
          </div>
        </div>

        {/* App name with WOW animated gradient */}
        <div className={`text-center transition-all duration-1000 ease-out delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight">
            <span className="gradient-text-hero glow-text-hero">PDF Tools</span>
            <span className="text-foreground/90"> Pro</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground font-semibold tracking-[0.35em] uppercase">
            Professional PDF Utilities
          </p>
        </div>

        {/* Premium animated loader */}
        <div className={`mt-8 flex flex-col items-center gap-8 transition-all duration-1000 ease-out delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          {/* Cyber spinning ring loader */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div 
              className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary border-r-primary/60"
              style={{ animation: 'loaderSpin 1.4s cubic-bezier(0.5, 0, 0.5, 1) infinite' }}
            />
            <div 
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-[hsl(var(--glow-cyan))]/70 border-l-accent/50"
              style={{ animation: 'loaderSpin 2s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse' }}
            />
            <div 
              className="absolute inset-4 rounded-full border-2 border-transparent border-b-accent/60"
              style={{ animation: 'loaderSpin 1.8s linear infinite' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary via-[hsl(var(--glow-cyan))] to-accent animate-pulse-glow" />
            </div>
          </div>
          
          {/* Loading dots */}
          <div className="flex items-center gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-primary via-[hsl(var(--glow-cyan))] to-accent"
                style={{
                  animation: 'loadingDot 1.8s ease-in-out infinite',
                  animationDelay: `${i * 0.18}s`,
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
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

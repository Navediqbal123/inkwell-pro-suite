import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Logo fade in
    const logoTimer = setTimeout(() => setShowLogo(true), 100);
    
    // Subtitle fade in after logo
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 500);

    // Exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 400);
    }, 1800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-400 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Logo Text */}
        <h1
          className={`text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight transition-all duration-700 ease-out ${
            showLogo 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-4'
          } ${isExiting ? 'scale-105 opacity-0' : ''}`}
        >
          <span className="gradient-text-hero">PDF Tools</span>
          <span className="text-foreground"> Pro</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-lg text-muted-foreground font-medium tracking-wide transition-all duration-500 ease-out ${
            showSubtitle 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2'
          } ${isExiting ? 'opacity-0' : ''}`}
        >
          Professional PDF Utilities
        </p>

        {/* Simple loading indicator */}
        <div
          className={`mt-10 flex items-center gap-2 transition-all duration-500 ease-out ${
            showSubtitle ? 'opacity-100' : 'opacity-0'
          } ${isExiting ? 'opacity-0' : ''}`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-gentle-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-gentle-pulse" style={{ animationDelay: '0.15s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-gentle-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

import { useState, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Staggered animations
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    const taglineTimer = setTimeout(() => setShowTagline(true), 800);
    const featuresTimer = setTimeout(() => setShowFeatures(true), 1100);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    // Exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(titleTimer);
      clearTimeout(taglineTimer);
      clearTimeout(featuresTimer);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/30 animate-float-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Primary glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] animate-pulse-slow" />
        
        {/* Secondary accent glow */}
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-breathe" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        {/* Animated Logo Icon */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            showLogo
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-6'
          } ${isExiting ? 'scale-110 opacity-0' : ''}`}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 -m-4 rounded-3xl bg-primary/20 blur-xl animate-glow-pulse" />
          
          {/* Icon container */}
          <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent shadow-2xl shadow-primary/40">
            <FileText className="w-12 h-12 md:w-14 md:h-14 text-primary-foreground" strokeWidth={1.5} />
            
            {/* Sparkle accent */}
            <div className="absolute -top-2 -right-2 animate-soft-float">
              <Sparkles className="w-6 h-6 text-accent drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Title with staggered letter animation */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            showTitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          } ${isExiting ? 'opacity-0 translate-y-[-10px]' : ''}`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="inline-block gradient-text-hero">PDF Tools</span>
            <span className="text-foreground ml-3">Pro</span>
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`text-lg md:text-xl text-muted-foreground font-medium tracking-wide transition-all duration-600 ease-out ${
            showTagline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          } ${isExiting ? 'opacity-0' : ''}`}
        >
          <span className="text-primary">AI-Powered</span> Professional PDF Solutions
        </p>

        {/* Progress bar */}
        <div
          className={`w-56 md:w-72 transition-all duration-500 ease-out ${
            showTagline ? 'opacity-100' : 'opacity-0'
          } ${isExiting ? 'opacity-0 scale-95' : ''}`}
        >
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2 font-medium">
            {progress < 100 ? 'Loading experience...' : 'Ready!'}
          </p>
        </div>

        {/* Feature pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 max-w-sm transition-all duration-600 ease-out ${
            showFeatures
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          } ${isExiting ? 'opacity-0 scale-95' : ''}`}
        >
          {['Chat with PDF', 'AI Summary', '3D Avatar'].map((feature, i) => (
            <span
              key={feature}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-fade-in"
              style={{ animationDelay: `${1.2 + i * 0.1}s` }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default SplashScreen;

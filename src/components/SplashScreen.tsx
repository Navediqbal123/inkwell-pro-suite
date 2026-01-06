import { useState, useEffect } from 'react';
import { FileText, Sparkles, Zap, Brain, Layers } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Staggered phase animations
    const phase1 = setTimeout(() => setPhase(1), 100);   // Logo appears
    const phase2 = setTimeout(() => setPhase(2), 600);   // Title appears
    const phase3 = setTimeout(() => setPhase(3), 1000);  // Tagline appears
    const phase4 = setTimeout(() => setPhase(4), 1400);  // Features appear

    // Smooth progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    // Exit sequence
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 600);
    }, 3200);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(phase4);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, hsl(220 20% 8%) 0%, hsl(220 20% 4%) 50%, hsl(220 25% 2%) 100%)'
      }}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 animate-splash-orb-1"
          style={{
            background: 'radial-gradient(circle, hsl(217 91% 60% / 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        
        {/* Secondary accent orb */}
        <div 
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 animate-splash-orb-2"
          style={{
            background: 'radial-gradient(circle, hsl(250 85% 65% / 0.5) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Tertiary orb */}
        <div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 animate-splash-orb-3"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 55% / 0.4) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-splash-particle"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${217 + Math.random() * 40} 80% 60% / ${0.3 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(217 91% 60% / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(217 91% 60% / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        
        {/* Advanced 3D Logo */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            phase >= 1
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-75 translate-y-12'
          } ${isExiting ? 'scale-125 opacity-0 blur-sm' : ''}`}
        >
          {/* Outer glow rings */}
          <div className="absolute inset-0 -m-8">
            <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl animate-splash-glow-1" />
            <div className="absolute inset-0 rounded-3xl bg-accent/15 blur-3xl animate-splash-glow-2" />
          </div>

          {/* Logo container with 3D effect */}
          <div className="relative group">
            {/* Shadow layer */}
            <div 
              className="absolute inset-0 rounded-3xl bg-black/50 blur-xl translate-y-4 scale-95"
            />
            
            {/* Main logo */}
            <div 
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center overflow-hidden animate-splash-logo-float"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 55%) 0%, hsl(250 85% 60%) 50%, hsl(280 75% 55%) 100%)',
                boxShadow: `
                  0 0 60px hsl(217 91% 60% / 0.4),
                  0 20px 40px rgba(0,0,0,0.4),
                  inset 0 2px 0 rgba(255,255,255,0.2),
                  inset 0 -2px 0 rgba(0,0,0,0.2)
                `
              }}
            >
              {/* Inner gradient overlay */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                }}
              />

              {/* Icon stack for depth */}
              <div className="relative">
                <FileText 
                  className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg" 
                  strokeWidth={1.5}
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                />
                
                {/* AI brain indicator */}
                <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-white/20 backdrop-blur-sm animate-splash-pulse">
                  <Brain className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>

              {/* Animated shine effect */}
              <div 
                className="absolute inset-0 animate-splash-shine"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                  backgroundSize: '200% 100%'
                }}
              />
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 -m-4 animate-splash-orbit">
              <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-5 h-5 text-accent drop-shadow-lg" />
            </div>
            <div className="absolute inset-0 -m-6 animate-splash-orbit-reverse">
              <Zap className="absolute bottom-0 right-0 w-4 h-4 text-primary drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Advanced Typography */}
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            phase >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          } ${isExiting ? 'opacity-0 translate-y-[-20px] blur-sm' : ''}`}
        >
          <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
            {/* Background glow text */}
            <span 
              className="absolute inset-0 blur-xl opacity-50"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(250 85% 65%), hsl(280 75% 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              PDF Tools Pro
            </span>
            
            {/* Main gradient text */}
            <span 
              className="relative inline-block animate-splash-text-shimmer"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(217 91% 70%) 25%, hsl(250 85% 70%) 50%, hsl(280 75% 65%) 75%, hsl(0 0% 100%) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              PDF Tools
            </span>
            <span className="text-foreground ml-2 md:ml-4">Pro</span>
          </h1>

          {/* Decorative line */}
          <div 
            className={`mx-auto mt-4 h-1 rounded-full transition-all duration-1000 delay-200 ${
              phase >= 2 ? 'w-32 md:w-48 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(217 91% 60%), hsl(250 85% 65%), transparent)'
            }}
          />
        </div>

        {/* Tagline with typing effect feel */}
        <div
          className={`transition-all duration-800 ease-out ${
            phase >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          } ${isExiting ? 'opacity-0' : ''}`}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground tracking-wide">
            <span 
              className="font-bold"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 65%), hsl(250 85% 70%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              AI-Powered
            </span>
            <span className="mx-2 text-muted-foreground/60">•</span>
            <span>Professional PDF Solutions</span>
          </p>
        </div>

        {/* Premium Progress Bar */}
        <div
          className={`w-64 md:w-80 transition-all duration-600 ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          } ${isExiting ? 'opacity-0 scale-90' : ''}`}
        >
          <div className="relative h-1.5 bg-muted/20 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="h-full animate-splash-progress-bg"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(217 91% 60% / 0.5), transparent)',
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            
            {/* Progress fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-100 ease-linear"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(217 91% 60%), hsl(250 85% 65%), hsl(280 75% 55%))',
                boxShadow: '0 0 20px hsl(217 91% 60% / 0.5)'
              }}
            />
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium tracking-wider uppercase">
            {progress < 100 ? 'Initializing Experience...' : '✓ Ready'}
          </p>
        </div>

        {/* Feature Pills */}
        <div
          className={`flex flex-wrap justify-center gap-3 max-w-md transition-all duration-800 ${
            phase >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          } ${isExiting ? 'opacity-0 scale-90' : ''}`}
        >
          {[
            { icon: Brain, label: 'Chat with PDF', delay: 0 },
            { icon: Sparkles, label: 'AI Summary', delay: 0.1 },
            { icon: Layers, label: '3D Avatar', delay: 0.2 },
          ].map(({ icon: Icon, label, delay }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30 backdrop-blur-sm animate-splash-feature-pop"
              style={{ 
                animationDelay: `${1.5 + delay}s`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient lines */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="h-8 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </div>
  );
};

export default SplashScreen;

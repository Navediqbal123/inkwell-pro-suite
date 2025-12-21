interface ProcessingOverlayProps {
  isProcessing: boolean;
  message?: string;
}

const ProcessingOverlay = ({
  isProcessing,
  message = 'Processing...',
}: ProcessingOverlayProps) => {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/98 backdrop-blur-3xl animate-fade-in">
      {/* WOW animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-primary/35 via-accent/30 to-[hsl(var(--glow-cyan))]/25 blur-[200px] animate-breathe" />
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-primary/25 blur-[130px] animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/25 blur-[120px] animate-float" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full bg-[hsl(var(--glow-cyan))]/20 blur-[100px] animate-breathe" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-12">
        {/* Premium cyber animated loader */}
        <div className="relative">
          {/* Outer mega glow */}
          <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-primary/60 via-accent/50 to-[hsl(var(--glow-cyan))]/50 blur-[70px] animate-pulse-glow opacity-80" />
          
          {/* Middle glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 blur-[40px]" />
          
          {/* Spinner container */}
          <div className="relative p-14 rounded-full floating-card">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-accent/25" />
            
            {/* Multi-layer cyber spinning rings */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/90 border-r-primary/50"
              style={{ animation: 'loaderSpin 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite' }} />
            <div className="absolute inset-3 rounded-full border-3 border-transparent border-t-[hsl(var(--glow-cyan))]/70 border-l-accent/40"
              style={{ animation: 'loaderSpin 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse' }} />
            <div className="absolute inset-6 rounded-full border-2 border-transparent border-b-accent/60 border-r-primary/30"
              style={{ animation: 'loaderSpin 1.3s linear infinite' }} />
            <div className="absolute inset-9 rounded-full border-2 border-transparent border-t-[hsl(var(--glow-cyan))]/50"
              style={{ animation: 'loaderSpin 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite' }} />
            
            {/* Center pulsing cyber dot */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-[hsl(var(--glow-cyan))] to-accent" 
                style={{ animation: 'loaderPulse 1.2s ease-in-out infinite' }} />
            </div>
          </div>
        </div>

        {/* Message with premium typography */}
        <div className="text-center space-y-4">
          <p className="text-4xl font-bold gradient-text-cyber glow-text-hero">{message}</p>
          <p className="text-lg text-muted-foreground font-medium">Please wait a moment</p>
        </div>

        {/* Animated loading bar */}
        <div className="w-56 h-2 rounded-full bg-secondary/60 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-primary via-[hsl(var(--glow-cyan))] to-accent rounded-full animate-shimmer"
            style={{ backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;

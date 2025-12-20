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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/98 backdrop-blur-2xl animate-fade-in">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-[150px] animate-breathe" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/20 blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-10">
        {/* Premium animated loader */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 blur-[50px] animate-pulse-glow opacity-70" />
          
          {/* Middle glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl" />
          
          {/* Spinner container */}
          <div className="relative p-12 rounded-full floating-card">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
            
            {/* Multi-layer spinning rings */}
            <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary/80 border-r-primary/40"
              style={{ animation: 'loaderSpin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite' }} />
            <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-accent/60 border-l-accent/30"
              style={{ animation: 'loaderSpin 2s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse' }} />
            <div className="absolute inset-6 rounded-full border-2 border-transparent border-b-primary/50"
              style={{ animation: 'loaderSpin 1.2s linear infinite' }} />
            
            {/* Center pulsing dot */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" 
                style={{ animation: 'loaderPulse 1s ease-in-out infinite' }} />
            </div>
          </div>
        </div>

        {/* Message with premium typography */}
        <div className="text-center space-y-3">
          <p className="text-3xl font-bold gradient-text glow-text">{message}</p>
          <p className="text-base text-muted-foreground font-medium">Please wait a moment</p>
        </div>

        {/* Animated loading bar */}
        <div className="w-48 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-shimmer"
            style={{ backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;

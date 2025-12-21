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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/98 backdrop-blur-xl animate-fade-in">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/12 blur-[150px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Spinner */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-border" />
            <div 
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <div 
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent/60"
              style={{ animation: 'spin 1.4s linear infinite reverse' }}
            />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold gradient-text">{message}</p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-shimmer"
            style={{ backgroundSize: '200% 100%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;

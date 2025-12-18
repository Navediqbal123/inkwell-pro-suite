import { Loader2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-[100px] animate-pulse-glow" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner container */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl animate-pulse-glow" />
          <div className="relative p-8 rounded-full premium-card">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/10" />
            <Loader2 className="relative w-12 h-12 text-primary animate-spin" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-xl font-bold text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground mt-2">Please wait a moment</p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                animation: 'pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
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

export default ProcessingOverlay;

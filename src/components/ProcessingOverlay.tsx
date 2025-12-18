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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse-glow" />
          <div className="relative p-6 rounded-full glass">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>
        <p className="text-lg font-medium text-foreground">{message}</p>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animation: 'pulse 1s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingOverlay;

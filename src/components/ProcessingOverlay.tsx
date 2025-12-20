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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in">
      {/* Background effects with enhanced depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-[120px] animate-breathe" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/15 blur-[80px] animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-[250px] h-[250px] rounded-full bg-accent/15 blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Spinner container with enhanced glow */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 blur-3xl animate-pulse-glow opacity-70" />
          
          {/* Middle glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl" />
          
          {/* Spinner background */}
          <div className="relative p-10 rounded-full premium-card">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-accent/15" />
            <div className="absolute inset-0 rounded-full border border-primary/20" />
            
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/60 animate-spin" style={{ animationDuration: '1.5s' }} />
            
            <Loader2 className="relative w-14 h-14 text-primary animate-spin" strokeWidth={1.5} style={{ animationDuration: '1s' }} />
          </div>
        </div>

        {/* Message with enhanced typography */}
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground font-medium">Please wait a moment</p>
        </div>

        {/* Loading dots with enhanced animation */}
        <div className="flex items-center gap-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                animation: 'processingDot 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes processingDot {
          0%, 80%, 100% { 
            opacity: 0.2; 
            transform: scale(0.6);
          }
          40% { 
            opacity: 1; 
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
};

export default ProcessingOverlay;
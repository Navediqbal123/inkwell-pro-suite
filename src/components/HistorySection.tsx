import { useState } from 'react';
import { Clock, Trash2, FileText, Image, Layers, Minimize2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { HistoryItem } from '@/hooks/useHistory';

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

const toolIcons: Record<string, typeof FileText> = {
  'Image to PDF': Image,
  'PDF to Image': FileText,
  'Merge PDF': Layers,
  'Compress PDF': Minimize2,
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

const HistoryPanel = ({ isOpen, onClose, history, onClearHistory, onRemoveItem }: HistoryPanelProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 flex items-start justify-center pt-20 md:pt-28"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />
      
      {/* Panel */}
      <div 
        className="relative w-full max-w-lg mx-4 max-h-[70vh] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl animate-panel-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
              {history.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4 space-y-2">
          {history.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No recent activity</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Your processed files will appear here</p>
            </div>
          ) : (
            history.map((item, index) => {
              const IconComponent = toolIcons[item.toolName] || FileText;
              
              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/30 hover:border-primary/20 hover:bg-secondary/60 transition-all duration-300 animate-history-slide"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                >
                  {/* Icon */}
                  <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 border border-primary/15 group-hover:border-primary/30 transition-colors duration-300">
                    <IconComponent className="w-4 h-4 text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.fileName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.toolName}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all duration-300"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

interface HistoryButtonProps {
  count: number;
  onClick: () => void;
}

export const HistoryButton = ({ count, onClick }: HistoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/80 border border-border/50 hover:border-primary/30 hover:bg-secondary transition-all duration-300"
    >
      {/* Glow on hover */}
      <div className="absolute -inset-1 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
      
      <div className="relative p-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
        <Clock className="w-4 h-4 text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" strokeWidth={1.5} />
      </div>
      <span className="relative text-sm font-medium text-foreground">History</span>
      {count > 0 && (
        <span className="relative px-1.5 py-0.5 rounded-full bg-primary/15 text-xs font-semibold text-primary min-w-[20px] text-center">
          {count}
        </span>
      )}
    </button>
  );
};

const HistorySection = ({ history, onClearHistory, onRemoveItem }: HistorySectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating History Button - positioned in hero area */}
      <div className="absolute top-28 right-4 md:right-8 z-30">
        <HistoryButton count={history.length} onClick={() => setIsOpen(true)} />
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        history={history}
        onClearHistory={onClearHistory}
        onRemoveItem={onRemoveItem}
      />
    </>
  );
};

export default HistorySection;
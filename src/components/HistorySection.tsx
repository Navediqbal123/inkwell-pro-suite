import { Clock, Trash2, FileText, Image, Layers, Minimize2, X } from 'lucide-react';
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

const HistorySection = ({ history, onClearHistory, onRemoveItem }: HistorySectionProps) => {
  if (history.length === 0) return null;

  return (
    <section className="mt-20 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary border border-border">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
          <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
            {history.length}
          </span>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-all duration-300"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item, index) => {
          const IconComponent = toolIcons[item.toolName] || FileText;
          
          return (
            <div
              key={item.id}
              className="group flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/40 hover:border-primary/20 hover:bg-card/80 transition-all duration-300 animate-history-item"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'backwards' }}
            >
              {/* Icon */}
              <div className="shrink-0 p-3 rounded-xl bg-secondary/80 border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
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
                className="shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-300"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HistorySection;

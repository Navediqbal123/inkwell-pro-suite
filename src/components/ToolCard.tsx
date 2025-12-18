import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}

const ToolCard = ({ icon: Icon, title, description, onClick, delay = 0 }: ToolCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
      
      {/* Card content */}
      <div className="relative premium-card p-6 rounded-2xl cursor-pointer glass-hover overflow-hidden">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative flex items-start gap-5">
          {/* Icon container */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ToolCard;

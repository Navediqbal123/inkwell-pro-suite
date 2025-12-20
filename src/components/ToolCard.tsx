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
      {/* Ambient glow effect */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary/50 via-accent/40 to-primary/50 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 ease-out" />
      
      {/* Secondary glow layer */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500" />
      
      {/* Card content */}
      <div className="relative premium-card p-7 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ease-out group-hover:translate-y-[-8px] group-hover:scale-[1.02] group-hover:border-primary/30">
        {/* Gradient shine overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Moving light effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent group-hover:animate-shimmer" />
        </div>
        
        {/* Content */}
        <div className="relative flex items-start gap-6">
          {/* Icon container with enhanced glow */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/50 to-accent/50 blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500" />
            <div className="relative p-4.5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/15 border border-primary/25 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-500 ease-out">
              <Icon className="w-7 h-7 text-primary group-hover:scale-115 group-hover:text-primary transition-all duration-500 ease-out" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-400 ease-out">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-400">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator with enhanced animation */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/25 border border-primary/30 group-hover:border-primary/50 backdrop-blur-sm transition-all duration-400">
              <svg
                className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform duration-300"
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
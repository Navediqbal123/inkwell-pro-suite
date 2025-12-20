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
      className="group relative w-full text-left animate-slide-up perspective-1000"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {/* Outer neon glow */}
      <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-primary/60 via-accent/50 to-primary/60 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-700 ease-out" />
      
      {/* Secondary ambient glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 opacity-0 group-hover:opacity-80 blur-2xl transition-all duration-500" />
      
      {/* Card with animated border */}
      <div className="relative floating-card p-8 rounded-3xl cursor-pointer overflow-hidden transition-all duration-600 ease-out group-hover:translate-y-[-12px] group-hover:scale-[1.02]"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <div className="absolute -inset-full top-0 h-[200%] w-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        </div>
        
        {/* Top border glow line */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content */}
        <div className="relative flex items-start gap-7">
          {/* Icon container with enhanced glow */}
          <div className="relative shrink-0">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/60 to-accent/60 blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-500" />
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/15 to-accent/20 border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/25 transition-all duration-500 ease-out">
              <Icon className="w-8 h-8 text-primary group-hover:scale-110 group-hover:text-primary transition-all duration-500 ease-out" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 min-w-0 pt-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-400 ease-out">
              {title}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-muted-foreground/90 transition-colors duration-400">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator with premium animation */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all duration-500 ease-out">
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 border border-primary/40 group-hover:border-primary/70 backdrop-blur-sm transition-all duration-400">
              <div className="absolute -inset-1 rounded-xl bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg
                className="relative w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
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

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
      className="group relative w-full text-left animate-slide-up perspective-1500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {/* Multi-layer ambient glow */}
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-primary/50 via-accent/40 to-primary/50 opacity-0 group-hover:opacity-100 blur-[50px] transition-all duration-1000 ease-out" />
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-glow-cyan/30 to-accent/40 opacity-0 group-hover:opacity-90 blur-[30px] transition-all duration-700" />
      
      {/* Card with WOW hover effect */}
      <div className="relative wow-card p-10 rounded-[2rem] cursor-pointer overflow-hidden"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated internal gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-glow-cyan/8 to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Premium wave shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <div className="absolute -inset-full top-0 h-[300%] w-[300%] bg-gradient-to-r from-transparent via-white/8 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-out" />
        </div>
        
        {/* Top edge neon glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glow-cyan/50 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
        </div>
        
        {/* Content */}
        <div className="relative flex items-start gap-8">
          {/* Icon container with cyber glow */}
          <div className="relative shrink-0">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/70 via-glow-cyan/50 to-accent/70 blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700 animate-cyber-pulse" style={{ animationPlayState: 'paused' }} />
            <div className="group-hover:[&>div]:animate-cyber-pulse" />
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/18 to-accent/25 border border-primary/40 group-hover:border-primary/70 group-hover:bg-primary/30 transition-all duration-600 ease-out group-hover:scale-110">
              <Icon className="w-9 h-9 text-primary group-hover:text-foreground transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_20px_hsl(var(--primary)/0.8)]" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 min-w-0 pt-2">
            <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text-cyber transition-all duration-500 ease-out">
              {title}
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors duration-500">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator with premium animation */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-700 ease-out">
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/25 to-primary/35 border border-primary/50 group-hover:border-primary/80 backdrop-blur-sm transition-all duration-500">
              <div className="absolute -inset-2 rounded-xl bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg
                className="relative w-6 h-6 text-primary group-hover:text-foreground group-hover:translate-x-1.5 transition-all duration-400"
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
        
        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/6 via-accent/4 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </button>
  );
};

export default ToolCard;

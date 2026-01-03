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
      className="group relative w-full text-left animate-slide-up press-effect"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {/* Hover glow - subtle and smooth */}
      <div className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl bg-primary/8 opacity-0 group-hover:opacity-100 blur-xl sm:blur-2xl transition-all duration-700 ease-out" />
      
      {/* Card - Consistent design for all tools */}
      <div className="relative floating-card p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl cursor-pointer group-hover:-translate-y-2 lg:group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.45),0_0_60px_hsl(var(--primary)/0.06)] transition-all duration-500 ease-out">
        {/* Top highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Content - Horizontal layout */}
        <div className="relative flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-lg sm:rounded-xl bg-primary/15 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-500 ease-out">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform duration-500 ease-out group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-500 ease-out leading-tight">
              {title}
            </h3>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/70 transition-colors duration-500 ease-out">
              {description}
            </p>
          </div>
          
          {/* Arrow - visible on lg+ screens */}
          <div className="hidden lg:flex self-center opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-500 ease-out">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/30 group-hover:bg-primary/15 transition-colors duration-500">
              <svg
                className="w-4 h-4 text-primary"
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
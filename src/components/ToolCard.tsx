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
      {/* Hover glow */}
      <div className="absolute -inset-2 rounded-3xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
      
      {/* Card */}
      <div className="relative floating-card p-8 rounded-2xl cursor-pointer transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_35px_70px_rgba(0,0,0,0.5),0_0_60px_hsl(var(--primary)/0.1)]">
        {/* Top highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Content */}
        <div className="relative flex items-start gap-6">
          {/* Icon */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-400">
              <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-400" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-400">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/70 transition-colors duration-400">
              {description}
            </p>
          </div>
          
          {/* Arrow */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-400 ease-out">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
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

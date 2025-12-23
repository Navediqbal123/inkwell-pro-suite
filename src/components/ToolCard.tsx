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
      <div className="absolute -inset-3 rounded-3xl bg-primary/8 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 ease-out" />
      
      {/* Card */}
      <div className="relative floating-card p-8 rounded-2xl cursor-pointer group-hover:-translate-y-3 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_80px_hsl(var(--primary)/0.08)]">
        {/* Top highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Content */}
        <div className="relative flex items-start gap-6">
          {/* Icon */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-xl bg-primary/15 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/25 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-500 ease-out">
              <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500 ease-out group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 ease-out">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/70 transition-colors duration-500 ease-out">
              {description}
            </p>
          </div>
          
          {/* Arrow */}
          <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:translate-x-0 transition-all duration-500 ease-out">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 group-hover:bg-primary/15 transition-colors duration-500">
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
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Shield, ChevronDown, History, Settings } from 'lucide-react';

const UserMenu = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const closeMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 200);
  };

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
    navigate('/auth');
  };

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth')}
        className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 hover-lift"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl 
          bg-secondary/50 border border-border/50 
          hover:border-primary/30 hover:bg-secondary/80 
          transition-all duration-300 group hover-lift
          ${isOpen ? 'border-primary/40 bg-secondary/70' : ''}
        `}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary-foreground text-sm font-bold ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        
        {/* Email + Role Badge */}
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground max-w-[120px] truncate leading-tight">
            {user.email?.split('@')[0]}
          </span>
          {/* Role Badge */}
          <span className={`
            text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md mt-0.5 animate-fade-in
            ${isAdmin 
              ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-muted/50 text-muted-foreground border border-border/50'
            }
          `}>
            {isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl 
            bg-card/95 border border-border/50 shadow-2xl backdrop-blur-xl z-50 
            origin-top-right
            ${isAnimating ? 'animate-menu-out' : 'animate-menu-in'}
          `}
          style={{
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px hsl(var(--primary) / 0.05)'
          }}
        >
          {/* User Info Header */}
          <div className="px-3 py-3 mb-2 rounded-xl bg-secondary/30 border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-primary-foreground font-bold ring-2 ring-primary/20">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                <div className={`
                  inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mt-1
                  ${isAdmin 
                    ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-muted/50 text-muted-foreground border border-border/50'
                  }
                `}>
                  {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  {isAdmin ? 'Administrator' : 'Standard User'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            {/* My Activity */}
            <button
              onClick={() => {
                closeMenu();
                // Scroll to history section on main page
                const historyEl = document.getElementById('history-section');
                if (historyEl) historyEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-secondary/80 transition-all duration-200 group"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <History className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">My Activity</span>
            </button>

            {/* Admin Panel - Only visible to admins */}
            {isAdmin && (
              <button
                onClick={() => {
                  closeMenu();
                  navigate('/admin');
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-amber-500/10 transition-all duration-200 group"
              >
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-purple-500/20 group-hover:from-amber-500/30 group-hover:to-purple-500/30 transition-colors duration-200">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-medium text-amber-400">Admin Panel</span>
              </button>
            )}

            {/* Divider */}
            <div className="h-px bg-border/50 my-2" />

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-destructive/10 transition-all duration-200 group"
            >
              <div className="p-1.5 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors duration-200">
                <LogOut className="w-4 h-4 text-destructive" />
              </div>
              <span className="font-medium text-destructive">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Shield, ChevronDown, History, Settings } from 'lucide-react';

const UserMenu = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
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

  const handleHistoryClick = () => {
    closeMenu();
    navigate('/');
    setTimeout(() => {
      // Dispatch custom event to open history panel
      window.dispatchEvent(new CustomEvent('openHistoryPanel'));
    }, 100);
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

  // Get initials from first_name and last_name
  const getInitials = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    
    // Fallback to email first letter if no name
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  // Get display name
  const getDisplayName = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    
    if (firstName) return firstName;
    
    // Fallback to email username
    return user.email?.split('@')[0] || 'User';
  };

  const initials = getInitials();
  const displayName = getDisplayName();

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button - Clean minimal design with initials only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 p-1 pr-2.5 rounded-full 
          bg-secondary/40 border border-border/40 
          hover:border-primary/30 hover:bg-secondary/60 
          transition-all duration-300 group
          ${isOpen ? 'border-primary/40 bg-secondary/60 shadow-lg shadow-primary/5' : ''}
        `}
      >
        {/* Avatar Circle with Gradient */}
        <div className={`
          w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold 
          transition-all duration-300
          ${isAdmin 
            ? 'bg-gradient-to-br from-amber-500 to-purple-600 text-white ring-2 ring-amber-500/30 group-hover:ring-amber-500/50 group-hover:shadow-[0_0_20px_hsl(45_100%_51%/0.3)]' 
            : 'bg-gradient-to-br from-primary to-accent text-white ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
          }
        `}>
          {initials}
        </div>
        
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            absolute right-0 top-full mt-2.5 w-72 p-2 rounded-2xl 
            bg-card border border-border/60 shadow-2xl z-50 
            origin-top-right
            ${isAnimating ? 'animate-menu-out' : 'animate-menu-in'}
          `}
          style={{
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 50px hsl(var(--primary) / 0.08)'
          }}
        >
          {/* User Info Header */}
          <div className="px-3 py-3.5 mb-2 rounded-xl bg-secondary/40 border border-border/30">
            <div className="flex items-center gap-3">
              {/* Large Avatar */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                ${isAdmin 
                  ? 'bg-gradient-to-br from-amber-500 to-purple-600 text-white ring-2 ring-amber-500/40' 
                  : 'bg-gradient-to-br from-primary to-accent text-white ring-2 ring-primary/30'
                }
              `}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                {/* Full Name */}
                <p className="text-sm font-semibold text-foreground">{displayName}</p>
                {/* Email */}
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                {/* Role Badge */}
                <div className={`
                  inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mt-2
                  ${isAdmin 
                    ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-400 border border-amber-500/30 animate-badge-admin-pulse' 
                    : 'bg-muted/60 text-muted-foreground border border-border/50'
                  }
                `}>
                  {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  {isAdmin ? 'Admin' : 'User'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            {/* My Account */}
            <button
              onClick={() => {
                closeMenu();
                // Future: navigate to account page
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-secondary/80 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-200">
                <Settings className="w-4 h-4 text-accent" />
              </div>
              <span className="font-medium">My Account</span>
            </button>

            {/* History */}
            <button
              onClick={handleHistoryClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-secondary/80 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <History className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">History</span>
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-purple-500/20 group-hover:from-amber-500/30 group-hover:to-purple-500/30 transition-colors duration-200">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-medium text-amber-400">Admin Panel</span>
              </button>
            )}

            {/* Divider */}
            <div className="h-px bg-border/50 my-2" />

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-destructive/10 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors duration-200">
                <LogOut className="w-4 h-4 text-destructive" />
              </div>
              <span className="font-medium text-destructive">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

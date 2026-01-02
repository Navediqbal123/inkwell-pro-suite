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
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Trigger avatar animation on mount
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setAvatarLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

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
      window.dispatchEvent(new CustomEvent('openHistoryPanel'));
    }, 100);
  };

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth')}
        className="gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-full border border-transparent hover:border-border/40 transition-all duration-300"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Sign In</span>
      </Button>
    );
  }

  // Get avatar letter from email
  const getAvatarLetter = () => {
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
    return user.email?.split('@')[0] || 'User';
  };

  const avatarLetter = getAvatarLetter();
  const displayName = getDisplayName();

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 p-1 pr-2 rounded-full 
          bg-secondary/40 border border-border/30 
          hover:border-primary/25 hover:bg-secondary/60 
          transition-all duration-400 ease-out group
          ${isOpen ? 'border-primary/30 bg-secondary/70 shadow-lg shadow-primary/5' : ''}
        `}
      >
        {/* Avatar with Scale-in Animation */}
        <div 
          className={`
            relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold 
            transition-all duration-500 ease-out
            ${avatarLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
            ${isAdmin 
              ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-purple-500 text-white shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40' 
              : 'bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/35'
            }
          `}
        >
          {/* Inner glow overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 opacity-60" />
          <span className="relative z-10 drop-shadow-sm">{avatarLetter}</span>
        </div>
        
        <ChevronDown 
          className={`
            w-3.5 h-3.5 text-muted-foreground/70 
            transition-all duration-300 ease-out
            ${isOpen ? 'rotate-180 text-primary/70' : 'group-hover:text-muted-foreground'}
          `} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            absolute right-0 top-full mt-3 w-72 p-2.5 rounded-2xl 
            bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl z-50 
            origin-top-right
            ${isAnimating ? 'animate-menu-out' : 'animate-menu-in'}
          `}
          style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), 0 0 40px hsl(var(--primary) / 0.06)'
          }}
        >
          {/* User Info Header */}
          <div className="px-3.5 py-4 mb-2 rounded-xl bg-gradient-to-br from-secondary/60 to-secondary/30 border border-border/20">
            <div className="flex items-center gap-3.5">
              {/* Large Avatar */}
              <div 
                className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                  transition-all duration-500
                  ${isAdmin 
                    ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-purple-500 text-white shadow-lg shadow-amber-500/30' 
                    : 'bg-gradient-to-br from-primary via-primary to-accent text-white shadow-lg shadow-primary/25'
                  }
                `}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 opacity-60" />
                <span className="relative z-10 drop-shadow-sm">{avatarLetter}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Full Name */}
                <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                {/* Email */}
                <p className="text-xs text-muted-foreground/80 truncate mt-0.5">{user.email}</p>
                
                {/* Role Badge - Premium styling */}
                <div 
                  className={`
                    inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider 
                    px-2.5 py-1 rounded-md mt-2.5 transition-all duration-500
                    ${isAdmin 
                      ? 'bg-gradient-to-r from-amber-500/15 to-purple-500/15 text-amber-400/90 border border-amber-500/25 animate-badge-fade-in' 
                      : 'bg-muted/40 text-muted-foreground/70 border border-border/30 animate-badge-fade-in'
                    }
                  `}
                  style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
                >
                  {isAdmin ? (
                    <Shield className="w-3 h-3 text-amber-400/80" />
                  ) : (
                    <User className="w-3 h-3 text-muted-foreground/60" />
                  )}
                  {isAdmin ? 'Admin' : 'User'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-0.5">
            {/* My Account */}
            <button
              onClick={() => {
                closeMenu();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/90 hover:bg-secondary/60 hover:text-foreground transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-accent/8 group-hover:bg-accent/15 transition-colors duration-200">
                <Settings className="w-4 h-4 text-accent/80 group-hover:text-accent" />
              </div>
              <span className="font-medium">My Account</span>
            </button>

            {/* History */}
            <button
              onClick={handleHistoryClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/90 hover:bg-secondary/60 hover:text-foreground transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-primary/8 group-hover:bg-primary/15 transition-colors duration-200">
                <History className="w-4 h-4 text-primary/80 group-hover:text-primary" />
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
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-amber-500/8 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/12 to-purple-500/12 group-hover:from-amber-500/20 group-hover:to-purple-500/20 transition-colors duration-200">
                  <Shield className="w-4 h-4 text-amber-400/90 group-hover:text-amber-400" />
                </div>
                <span className="font-medium text-amber-400/90 group-hover:text-amber-400">Admin Panel</span>
              </button>
            )}

            {/* Divider */}
            <div className="h-px bg-border/30 my-2 mx-2" />

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-destructive/8 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-destructive/8 group-hover:bg-destructive/15 transition-colors duration-200">
                <LogOut className="w-4 h-4 text-destructive/80 group-hover:text-destructive" />
              </div>
              <span className="font-medium text-destructive/80 group-hover:text-destructive">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

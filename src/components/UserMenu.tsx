import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Shield, ChevronDown, Activity } from 'lucide-react';

const UserMenu = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth')}
        className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary/80 transition-all duration-300 group"
      >
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-foreground hidden sm:inline max-w-[120px] truncate">
          {user.email}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-card/95 border border-border/50 shadow-2xl backdrop-blur-xl z-50 animate-fade-in-scale origin-top-right">
            {/* User Info */}
            <div className="px-3 py-2 mb-2 border-b border-border/50">
              <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isAdmin ? 'Administrator' : 'User'}
              </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              {/* My Activity - coming soon or link to history */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  // This could open the history panel or a dedicated activity page
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors duration-200"
              >
                <Activity className="w-4 h-4 text-muted-foreground" />
                My Activity
              </button>

              {/* Admin Panel - Only visible to admins */}
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-primary/10 transition-colors duration-200"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  Admin Panel
                </button>
              )}

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;

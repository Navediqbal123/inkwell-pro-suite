import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Users, 
  Activity, 
  BarChart3, 
  Clock, 
  Loader2,
  Shield,
  FileText,
  Image,
  Layers,
  Minimize2,
  Sparkles,
  Highlighter,
  Search,
  Tag
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  created_at: string;
}

interface UsageStats {
  tool_name: string;
  count: number;
}

interface RecentActivity {
  id: string;
  tool_name: string;
  file_name: string | null;
  created_at: string;
  email: string;
}

const toolIcons: Record<string, typeof FileText> = {
  'Image to PDF': Image,
  'PDF to Image': FileText,
  'Merge PDF': Layers,
  'Compress PDF': Minimize2,
  'Smart Summary': Sparkles,
  'Text Extract': FileText,
  'Key Points': Highlighter,
  'Smart Search': Search,
  'Name Suggest': Tag,
};

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [totalUsage, setTotalUsage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!isAdmin) {
        navigate('/');
        return;
      }
      fetchAdminData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      // Fetch all users (profiles)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      setUsers(profilesData || []);

      // Fetch usage stats grouped by tool
      const { data: usageData, error: usageError } = await supabase
        .from('usage_logs')
        .select('tool_name');

      if (usageError) throw usageError;

      // Calculate stats
      const statsMap = new Map<string, number>();
      usageData?.forEach(log => {
        const count = statsMap.get(log.tool_name) || 0;
        statsMap.set(log.tool_name, count + 1);
      });

      const stats = Array.from(statsMap.entries())
        .map(([tool_name, count]) => ({ tool_name, count }))
        .sort((a, b) => b.count - a.count);

      setUsageStats(stats);
      setTotalUsage(usageData?.length || 0);

      // Fetch recent activity with user emails
      const { data: activityData, error: activityError } = await supabase
        .from('usage_logs')
        .select(`
          id,
          tool_name,
          file_name,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (activityError) throw activityError;

      // Map user_id to email
      const activityWithEmails = (activityData || []).map(activity => {
        const userProfile = profilesData?.find(p => p.id === activity.user_id);
        return {
          ...activity,
          email: userProfile?.email || 'Unknown',
        };
      });

      setRecentActivity(activityWithEmails);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/6 blur-[150px] animate-breathe" />
        <div className="absolute bottom-[-20%] right-[5%] w-[500px] h-[500px] rounded-full bg-accent/6 blur-[130px] animate-breathe" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to App
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/15 border border-primary/25">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
            </div>
            
            <div className="w-[100px]" />
          </div>
        </div>
      </header>

      <main className="relative container mx-auto max-w-6xl px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          {/* Total Users */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border/50 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/15 border border-primary/25 group-hover:bg-primary/25 transition-colors duration-500">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{users.length}</p>
              </div>
            </div>
          </div>

          {/* Total Usage */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border/50 hover:border-accent/30 transition-all duration-500 group hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/15 border border-accent/25 group-hover:bg-accent/25 transition-colors duration-500">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Actions</p>
                <p className="text-3xl font-bold text-foreground">{totalUsage}</p>
              </div>
            </div>
          </div>

          {/* Active Tools */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border/50 hover:border-green-500/30 transition-all duration-500 group hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/15 border border-green-500/25 group-hover:bg-green-500/25 transition-colors duration-500">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tools Used</p>
                <p className="text-3xl font-bold text-foreground">{usageStats.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border/50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/15 border border-primary/25">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">All Users</h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                {users.length}
              </span>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {users.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No users yet</p>
              ) : (
                users.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border/30 hover:border-primary/20 hover:bg-secondary/60 transition-all duration-300 animate-history-slide"
                    style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {formatRelativeDate(user.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/15 border border-accent/25">
                <BarChart3 className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Feature Usage</h2>
            </div>

            <div className="space-y-3">
              {usageStats.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No usage data yet</p>
              ) : (
                usageStats.map((stat, index) => {
                  const IconComponent = toolIcons[stat.tool_name] || FileText;
                  const maxCount = usageStats[0]?.count || 1;
                  const percentage = (stat.count / maxCount) * 100;

                  return (
                    <div
                      key={stat.tool_name}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">{stat.tool_name}</span>
                        </div>
                        <span className="text-sm font-bold text-accent">{stat.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-700 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-card/80 border border-border/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-500/15 border border-green-500/25">
                <Clock className="w-4 h-4 text-green-500" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                Last 20
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tool</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">File</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-muted-foreground">
                        No activity yet
                      </td>
                    </tr>
                  ) : (
                    recentActivity.map((activity, index) => {
                      const IconComponent = toolIcons[activity.tool_name] || FileText;
                      
                      return (
                        <tr 
                          key={activity.id}
                          className="border-b border-border/30 hover:bg-secondary/30 transition-colors duration-200 animate-history-slide"
                          style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold">
                                {activity.email.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm text-foreground truncate max-w-[150px]">
                                {activity.email}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-4 h-4 text-accent" />
                              <span className="text-sm text-foreground">{activity.tool_name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground truncate max-w-[150px] block">
                              {activity.file_name || '-'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {formatDate(activity.created_at)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

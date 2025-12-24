import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUsageTracking = () => {
  const { user } = useAuth();

  const trackUsage = useCallback(async (toolName: string, fileName?: string) => {
    if (!user) {
      console.log('User not logged in, skipping usage tracking');
      return;
    }

    try {
      const { error } = await supabase
        .from('usage_logs')
        .insert({
          user_id: user.id,
          tool_name: toolName,
          file_name: fileName || null,
        });

      if (error) {
        console.error('Error tracking usage:', error);
      }
    } catch (error) {
      console.error('Error tracking usage:', error);
    }
  }, [user]);

  return { trackUsage };
};

import { useState, useRef, useEffect } from 'react';
import { X, Upload, Camera, User, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { generate3DAvatar } from '@/lib/api';
import { toast } from 'sonner';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarUpdate: (url: string) => void;
  currentAvatarUrl?: string;
}

const ProfileModal = ({ isOpen, onClose, onAvatarUpdate, currentAvatarUrl }: ProfileModalProps) => {
  const { user, profile } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState<string | null>(currentAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentAvatarUrl) {
      setGeneratedAvatarUrl(currentAvatarUrl);
    }
  }, [currentAvatarUrl]);

  const getDisplayName = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    return user?.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    if (firstInitial && lastInitial) return `${firstInitial}${lastInitial}`;
    if (firstInitial) return firstInitial;
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Generate avatar
    setIsGenerating(true);
    try {
      const response = await generate3DAvatar(file);
      setGeneratedAvatarUrl(response.avatar_url);
      onAvatarUpdate(response.avatar_url);
      toast.success('Avatar generated successfully!');
    } catch (error) {
      console.error('Avatar generation failed:', error);
      toast.error('Failed to generate avatar. Please try again.');
    } finally {
      setIsGenerating(false);
      setPreviewUrl(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {/* Avatar Display */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                {isGenerating ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {/* Animated placeholder character */}
                    <div className="relative animate-avatar-bounce">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      {/* Floating particles */}
                      <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-primary/60 animate-float-particle" />
                      <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-accent/60 animate-float-particle-delayed" />
                      <div className="absolute -bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-primary/50 animate-float-particle" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                ) : generatedAvatarUrl ? (
                  <img 
                    src={generatedAvatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover animate-fade-in"
                  />
                ) : previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-50"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{getInitials()}</span>
                  </div>
                )}

                {/* Loading overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload button overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating}
                className="absolute bottom-0 right-0 p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Upload instruction */}
            <p className="text-sm text-muted-foreground text-center">
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating your 3D avatar...
                </span>
              ) : (
                'Upload a photo to generate your 3D avatar'
              )}
            </p>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
              <p className="text-foreground font-medium mt-1">{getDisplayName()}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <p className="text-foreground font-medium mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isGenerating}
            className="w-full btn-secondary flex items-center justify-center gap-2 py-3"
          >
            <Upload className="w-4 h-4" />
            {generatedAvatarUrl ? 'Change Avatar Photo' : 'Upload Photo for Avatar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

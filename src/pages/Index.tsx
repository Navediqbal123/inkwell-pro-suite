import { useState, useCallback } from 'react';
import { ImageIcon, FileImage, Layers, Minimize2 } from 'lucide-react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import ToolCard from '@/components/ToolCard';
import ToolModal from '@/components/ToolModal';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';
import PdfToImageTool from '@/components/tools/PdfToImageTool';
import MergePdfTool from '@/components/tools/MergePdfTool';
import CompressPdfTool from '@/components/tools/CompressPdfTool';

type ToolType = 'image-to-pdf' | 'pdf-to-image' | 'merge-pdf' | 'compress-pdf' | null;

const tools = [
  {
    id: 'image-to-pdf' as const,
    icon: ImageIcon,
    title: 'Image to PDF',
    description: 'Convert images to PDF document with high quality output',
  },
  {
    id: 'pdf-to-image' as const,
    icon: FileImage,
    title: 'PDF to Image',
    description: 'Export PDF pages as high-resolution images',
  },
  {
    id: 'merge-pdf' as const,
    icon: Layers,
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
  },
  {
    id: 'compress-pdf' as const,
    icon: Minimize2,
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
  },
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTool, setActiveTool] = useState<ToolType>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleToolClick = useCallback((toolId: ToolType) => {
    setActiveTool(toolId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveTool(null);
  }, []);

  const getToolComponent = () => {
    switch (activeTool) {
      case 'image-to-pdf':
        return <ImageToPdfTool onClose={handleCloseModal} />;
      case 'pdf-to-image':
        return <PdfToImageTool onClose={handleCloseModal} />;
      case 'merge-pdf':
        return <MergePdfTool onClose={handleCloseModal} />;
      case 'compress-pdf':
        return <CompressPdfTool onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  const getToolTitle = () => {
    const tool = tools.find((t) => t.id === activeTool);
    return tool?.title || '';
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div className={`min-h-screen bg-background transition-all duration-[1.4s] ease-out ${showSplash ? 'opacity-0 scale-[0.95]' : 'opacity-100 scale-100'}`}>
        {/* WOW animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Primary massive gradient orb with motion */}
          <div className="absolute top-[-25%] left-[5%] w-[1100px] h-[1100px] rounded-full bg-primary/15 blur-[250px] animate-float-slow opacity-90" />
          
          {/* Accent gradient orb */}
          <div className="absolute bottom-[-20%] right-[0%] w-[1000px] h-[1000px] rounded-full bg-accent/15 blur-[220px] animate-float-slow opacity-80" style={{ animationDelay: '-7s' }} />
          
          {/* Cyan cyber orb */}
          <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full bg-[hsl(var(--glow-cyan))]/10 blur-[180px] animate-breathe opacity-70" style={{ animationDelay: '-3s' }} />
          
          {/* Center pulsing mega glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-[200px] animate-breathe" />
          
          {/* Floating ambient particles */}
          <div className="absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-primary/70 animate-float blur-[2px]" style={{ animationDelay: '-2s' }} />
          <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-accent/70 animate-float" style={{ animationDelay: '-5s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3.5 h-3.5 rounded-full bg-primary/60 animate-float" style={{ animationDelay: '-8s' }} />
          <div className="absolute top-2/3 left-1/3 w-2.5 h-2.5 rounded-full bg-[hsl(var(--glow-cyan))]/70 animate-float-slow" style={{ animationDelay: '-4s' }} />
          <div className="absolute top-1/2 right-[15%] w-2 h-2 rounded-full bg-primary/80 animate-float" style={{ animationDelay: '-1s' }} />
          <div className="absolute bottom-1/3 left-[20%] w-3 h-3 rounded-full bg-accent/60 animate-float-slow" style={{ animationDelay: '-6s' }} />
          
          {/* Light rays */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[50%] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-sm animate-pulse-glow" />
          <div className="absolute top-0 left-[30%] -translate-x-1/2 w-[2px] h-[35%] bg-gradient-to-b from-accent/20 via-accent/5 to-transparent blur-sm animate-pulse-glow" style={{ animationDelay: '-2s' }} />
          <div className="absolute top-0 left-[70%] -translate-x-1/2 w-[2px] h-[40%] bg-gradient-to-b from-[hsl(var(--glow-cyan))]/25 via-[hsl(var(--glow-cyan))]/5 to-transparent blur-sm animate-pulse-glow" style={{ animationDelay: '-4s' }} />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
          
          {/* Radial vignette for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />
        </div>

        <Header />

        <main className="relative pt-32 pb-28 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* WOW Hero Section */}
            <div className="text-center mb-28 space-y-12">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                {/* Floating cyber badge */}
                <div className="inline-flex items-center gap-4 px-7 py-4 rounded-full glass-card border-primary/30 mb-12 animate-float" style={{ animationDuration: '8s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-60" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-[hsl(var(--glow-cyan))] animate-ping opacity-40" style={{ animationDelay: '-0.5s' }} />
                    <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--glow-cyan))] glow-neon" />
                  </div>
                  <span className="text-sm font-bold text-primary uppercase tracking-[0.3em]">
                    Professional Suite
                  </span>
                </div>
                
                {/* Main hero heading with WOW animated gradient */}
                <h1 className="text-7xl md:text-8xl lg:text-[9rem] font-extrabold leading-[0.95] tracking-tighter">
                  <span className="gradient-text-hero glow-text-hero block">Powerful PDF</span>
                  <span className="gradient-text-hero glow-text-hero block mt-3">Tools</span>
                  <span className="text-foreground/90 block mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">At Your Fingertips</span>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in font-medium" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                Fast, secure, and professional PDF utilities — all processing happens in your browser
              </p>
              
              {/* Animated decorative element */}
              <div className="flex justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
                <div className="w-3 h-3 rounded-full bg-primary/70 animate-pulse-glow" />
                <div className="w-32 h-1.5 rounded-full bg-gradient-to-r from-primary via-[hsl(var(--glow-cyan))] to-accent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                <div className="w-3 h-3 rounded-full bg-accent/70 animate-pulse-glow" style={{ animationDelay: '-1.5s' }} />
              </div>
            </div>

            {/* Tools grid with WOW cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool.id)}
                  delay={500 + index * 180}
                />
              ))}
            </div>

            {/* Premium security note */}
            <div className="mt-28 text-center animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}>
              <div className="inline-flex items-center gap-6 px-10 py-6 rounded-3xl floating-card">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-xl bg-green-500/50 blur-xl animate-pulse-glow" />
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/35 to-green-600/35 border border-green-500/60">
                    <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground text-xl">100% Secure & Private</p>
                  <p className="text-base text-muted-foreground mt-1.5">Your files never leave your device</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Tool Modal */}
      <ToolModal
        isOpen={activeTool !== null}
        onClose={handleCloseModal}
        title={getToolTitle()}
      >
        {getToolComponent()}
      </ToolModal>
    </>
  );
};

export default Index;

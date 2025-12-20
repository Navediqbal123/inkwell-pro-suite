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

      <div className={`min-h-screen bg-background transition-all duration-1000 ease-out ${showSplash ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}>
        {/* Ultra premium animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Primary massive gradient orb */}
          <div className="absolute top-[-20%] left-[10%] w-[900px] h-[900px] rounded-full bg-primary/12 blur-[200px] animate-float-slow opacity-80" />
          
          {/* Accent gradient orb */}
          <div className="absolute bottom-[-15%] right-[5%] w-[800px] h-[800px] rounded-full bg-accent/12 blur-[180px] animate-float-slow opacity-70" style={{ animationDelay: '-5s' }} />
          
          {/* Center pulsing glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-primary/8 via-transparent to-accent/8 blur-[150px] animate-breathe" />
          
          {/* Floating particles */}
          <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-primary/60 animate-float blur-[1px]" style={{ animationDelay: '-2s' }} />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '-4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '-6s' }} />
          <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-accent/50 animate-float-slow" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '-1s' }} />
          
          {/* Light rays effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[40%] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-sm animate-pulse-glow" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />
          
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
        </div>

        <Header />

        <main className="relative pt-28 pb-24 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* WOW Hero Section */}
            <div className="text-center mb-24 space-y-10">
              <div className="animate-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
                {/* Floating badge with glow */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-primary/25 mb-10 animate-float" style={{ animationDuration: '6s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-75" />
                    <div className="relative w-3 h-3 rounded-full bg-primary glow-neon" />
                  </div>
                  <span className="text-sm font-bold text-primary uppercase tracking-[0.25em]">
                    Professional Suite
                  </span>
                </div>
                
                {/* Main hero heading with animated gradient */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight">
                  <span className="gradient-text-hero glow-text block">Powerful PDF</span>
                  <span className="gradient-text-hero glow-text block mt-2">Tools</span>
                  <span className="text-foreground/90 block mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">At Your Fingertips</span>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in font-medium" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                Fast, secure, and professional PDF utilities — all processing happens in your browser
              </p>
              
              {/* Animated decorative element */}
              <div className="flex justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.45s', animationFillMode: 'backwards' }}>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-glow" />
                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse-glow" style={{ animationDelay: '-1s' }} />
              </div>
            </div>

            {/* Tools grid with larger cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool.id)}
                  delay={400 + index * 150}
                />
              ))}
            </div>

            {/* Premium security note */}
            <div className="mt-24 text-center animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
              <div className="inline-flex items-center gap-5 px-8 py-5 rounded-2xl floating-card">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-green-500/40 blur-lg animate-pulse-glow" />
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/30 border border-green-500/50">
                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground text-lg">100% Secure & Private</p>
                  <p className="text-sm text-muted-foreground mt-1">Your files never leave your device</p>
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

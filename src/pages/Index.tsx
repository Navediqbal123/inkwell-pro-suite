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

      <div className={`min-h-screen bg-background transition-all duration-1000 ease-out ${showSplash ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        {/* Animated background with enhanced depth */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Primary gradient orb */}
          <div className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[180px] animate-float opacity-80" />
          
          {/* Accent gradient orb */}
          <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[160px] animate-float opacity-70" style={{ animationDelay: '-4s' }} />
          
          {/* Center ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-primary/6 via-transparent to-accent/6 blur-[120px] animate-breathe" />
          
          {/* Subtle floating particle */}
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />
          
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />
        </div>

        <Header />

        <main className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Premium Hero Section */}
            <div className="text-center mb-20 space-y-8">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {/* Badge with enhanced styling */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card border-primary/20 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-75" />
                    <div className="relative w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    Professional Tools
                  </span>
                </div>
                
                {/* Main heading with enhanced typography */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                  <span className="gradient-text glow-text">Powerful PDF Tools</span>
                  <br />
                  <span className="text-foreground/95 mt-2 block">At Your Fingertips</span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in font-medium" style={{ animationDelay: '0.2s' }}>
                Fast, secure, and professional PDF utilities — all processing happens in your browser
              </p>
              
              {/* Decorative line */}
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-24 h-1 rounded-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60" />
              </div>
            </div>

            {/* Tools grid with enhanced spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool.id)}
                  delay={300 + index * 120}
                />
              ))}
            </div>

            {/* Security note with enhanced design */}
            <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass-card border-border/30">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-green-500/30 blur-lg animate-pulse-glow" />
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/25 to-green-600/25 border border-green-500/40">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">100% Secure</span>
                  <span className="mx-3 text-border">•</span>
                  Your files never leave your device
                </p>
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
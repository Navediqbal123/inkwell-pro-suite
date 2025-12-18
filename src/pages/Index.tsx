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

      <div className={`min-h-screen bg-background transition-all duration-700 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-[100px]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <Header />

        <main className="relative pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Premium Hero Section */}
            <div className="text-center mb-16 space-y-6">
              <div className="animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Professional Tools
                  </span>
                </div>
                
                {/* Main heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  <span className="gradient-text">Powerful PDF Tools</span>
                  <br />
                  <span className="text-foreground/90">At Your Fingertips</span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Fast, secure, and professional PDF utilities — all processing happens in your browser
              </p>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool.id)}
                  delay={200 + index * 100}
                />
              ))}
            </div>

            {/* Security note */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glass-card">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-green-500/20 border border-green-500/30">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">100% Secure</span>
                  <span className="mx-2">•</span>
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

import { useState, useCallback } from 'react';
import { ImageIcon, FileImage, Layers, Minimize2, Shield } from 'lucide-react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import ToolCard from '@/components/ToolCard';
import ToolModal from '@/components/ToolModal';
import HistorySection from '@/components/HistorySection';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';
import PdfToImageTool from '@/components/tools/PdfToImageTool';
import MergePdfTool from '@/components/tools/MergePdfTool';
import CompressPdfTool from '@/components/tools/CompressPdfTool';
import { useHistory } from '@/hooks/useHistory';

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
  const { history, addHistoryItem, clearHistory, removeHistoryItem } = useHistory();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleToolClick = useCallback((toolId: ToolType) => {
    setActiveTool(toolId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveTool(null);
  }, []);

  // Expose addHistoryItem to tool components via window (simple approach)
  if (typeof window !== 'undefined') {
    (window as any).addPdfToolsHistory = addHistoryItem;
  }

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

      <div className={`min-h-screen bg-background transition-all duration-500 ease-out ${showSplash ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        {/* Subtle background gradient */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] rounded-full bg-primary/8 blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] rounded-full bg-accent/8 blur-[160px]" />
        </div>

        <Header />

        <main className="relative pt-28 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-20 space-y-8">
              <div className="animate-fade-in-scale" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary border border-border mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary animate-gentle-pulse" />
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Professional Suite
                  </span>
                </div>
                
                {/* Main heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="gradient-text-hero">Powerful PDF Tools</span>
                  <br />
                  <span className="text-foreground/90 text-3xl md:text-4xl font-bold mt-4 block">At Your Fingertips</span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                Fast, secure, and professional PDF utilities — all processing happens in your browser
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool.id)}
                  delay={300 + index * 100}
                />
              ))}
            </div>

            {/* Security Note */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-card/60 border border-border/50">
                <div className="p-2.5 rounded-lg bg-green-500/15 border border-green-500/30">
                  <Shield className="w-5 h-5 text-green-500" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">100% Secure & Private</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Your files never leave your device</p>
                </div>
              </div>
            </div>

            {/* History Section */}
            <HistorySection 
              history={history} 
              onClearHistory={clearHistory}
              onRemoveItem={removeHistoryItem}
            />
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

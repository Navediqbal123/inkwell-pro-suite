import { useState, useCallback } from 'react';
import { Sparkles, FileText, Hash, ChevronRight } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { extractPdfText, generateSmartSummary, ExtractedPDF } from '@/lib/pdfTextExtractor';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface SmartSummaryToolProps {
  onClose: () => void;
}

const SmartSummaryTool = ({ onClose }: SmartSummaryToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    summary: string[];
    headings: string[];
    keyStats: string[];
    pageCount: number;
    title: string;
  } | null>(null);
  const { trackUsage } = useUsageTracking();
  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setResult(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  }, []);

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractPdfText(files[0]);
      const analysis = generateSmartSummary(extracted);
      
      setResult({
        ...analysis,
        pageCount: extracted.totalPages,
        title: extracted.title || files[0].name
      });
      
      // Track usage to database
      trackUsage('Smart Summary', files[0].name);
      
      toast.success('Analysis complete!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Analyzing document..." />
      
      <div className="space-y-6">
        {!result ? (
          <>
            <FileDropzone
              onFilesSelected={handleFilesSelected}
              accept=".pdf,application/pdf"
              multiple={false}
              files={files}
              onRemoveFile={handleRemoveFile}
              maxFiles={1}
            />

            <button
              onClick={handleAnalyze}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <Sparkles className="w-5 h-5" strokeWidth={2} />
              Generate Smart Summary
            </button>
          </>
        ) : (
          <div className="space-y-6">
            {/* Document Info */}
            <div className="p-5 rounded-xl bg-secondary/50 border border-border/40 animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.pageCount} pages analyzed</p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            {result.summary.length > 0 && (
              <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Key Points
                </h4>
                <div className="space-y-3">
                  {result.summary.map((point, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl bg-card border border-border/40 animate-fade-in hover:border-primary/30 transition-colors"
                      style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-foreground/90 leading-relaxed">{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Stats */}
            {result.keyStats.length > 0 && (
              <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Hash className="w-4 h-4 text-accent" />
                  Key Statistics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.keyStats.map((stat, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 rounded-lg bg-accent/15 border border-accent/30 text-accent text-sm font-medium animate-scale-in"
                      style={{ animationDelay: `${0.25 + index * 0.05}s` }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detected Headings */}
            {result.headings.length > 0 && (
              <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Document Structure
                </h4>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 space-y-2">
                  {result.headings.slice(0, 6).map((heading, index) => (
                    <p 
                      key={index}
                      className="text-sm text-foreground/80 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {heading}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Analyze Another */}
            <button
              onClick={() => {
                setFiles([]);
                setResult(null);
              }}
              className="w-full btn-secondary flex items-center justify-center gap-2 py-3 text-foreground font-medium"
            >
              Analyze Another Document
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartSummaryTool;

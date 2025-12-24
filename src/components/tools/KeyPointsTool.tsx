import { useState, useCallback } from 'react';
import { Highlighter, ChevronRight, Copy, Check } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { extractPdfText, extractKeyPoints } from '@/lib/pdfTextExtractor';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface KeyPointsToolProps {
  onClose: () => void;
}

const KeyPointsTool = ({ onClose }: KeyPointsToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [keyPoints, setKeyPoints] = useState<string[] | null>(null);
  const [copied, setCopied] = useState(false);
  const { trackUsage } = useUsageTracking();
  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setKeyPoints(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setKeyPoints(null);
  }, []);

  const handleExtract = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractPdfText(files[0]);
      const points = extractKeyPoints(extracted.fullText, 8);
      
      setKeyPoints(points);
      
      // Track usage
      trackUsage('Key Points', files[0].name);
      
      toast.success('Key points extracted!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to extract key points');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyAll = async () => {
    if (!keyPoints) return;
    
    try {
      const text = keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n\n');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Finding key points..." />
      
      <div className="space-y-6">
        {!keyPoints ? (
          <>
            <FileDropzone
              onFilesSelected={handleFilesSelected}
              accept=".pdf,application/pdf"
              multiple={false}
              files={files}
              onRemoveFile={handleRemoveFile}
              maxFiles={1}
            />

            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Automatically detect and highlight the most important sentences in your document 
                based on content analysis and importance indicators.
              </p>
            </div>

            <button
              onClick={handleExtract}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <Highlighter className="w-5 h-5" strokeWidth={2} />
              Find Key Points
            </button>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                  <Highlighter className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{keyPoints.length} Key Points Found</h3>
                  <p className="text-xs text-muted-foreground">Most important sentences from your document</p>
                </div>
              </div>
              <button
                onClick={handleCopyAll}
                className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </button>
            </div>

            {/* Key Points List */}
            <div className="space-y-3">
              {keyPoints.map((point, index) => (
                <div 
                  key={index}
                  className="group p-4 rounded-xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">
                        {point}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <button
              onClick={() => {
                setFiles([]);
                setKeyPoints(null);
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

export default KeyPointsTool;

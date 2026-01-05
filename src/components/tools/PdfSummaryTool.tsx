import { useState, useCallback } from 'react';
import { Sparkles, FileText, Copy, Check, RefreshCw } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { getPdfSummary } from '@/lib/api';
import { toast } from 'sonner';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface PdfSummaryToolProps {
  onClose: () => void;
}

const PdfSummaryTool = ({ onClose }: PdfSummaryToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { trackUsage } = useUsageTracking();

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setSummary(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setSummary(null);
  }, []);

  const handleGenerateSummary = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await getPdfSummary(files[0]);
      setSummary(response.summary);
      trackUsage('PDF Summary (AI)', files[0].name);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Summary generation failed:', error);
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!summary) return;
    
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setSummary(null);
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="AI is analyzing your document..." />
      
      <div className="space-y-6">
        {!summary ? (
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
              onClick={handleGenerateSummary}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <Sparkles className="w-5 h-5" strokeWidth={2} />
              Generate AI Summary
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Powered by AI - Your document will be analyzed securely
            </p>
          </>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Document Info */}
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/40 animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{files[0]?.name}</h3>
                  <p className="text-sm text-muted-foreground">AI Summary Generated</p>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div 
              className="p-5 rounded-xl bg-card border border-border/50 space-y-4 animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Summary
                  </h4>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3"
              >
                <RefreshCw className="w-4 h-4" />
                Summarize Another PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PdfSummaryTool;

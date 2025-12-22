import { useState, useCallback } from 'react';
import { FileText, Copy, Download, Check } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { extractPdfText, cleanExtractedText } from '@/lib/pdfTextExtractor';

interface TextExtractToolProps {
  onClose: () => void;
}

const TextExtractTool = ({ onClose }: TextExtractToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setExtractedText(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setExtractedText(null);
  }, []);

  const handleExtract = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractPdfText(files[0]);
      const cleaned = cleanExtractedText(extracted.fullText);
      
      setExtractedText(cleaned);
      setPageCount(extracted.totalPages);
      
      // Add to history
      if (typeof window !== 'undefined' && (window as any).addPdfToolsHistory) {
        (window as any).addPdfToolsHistory('Text Extract', files[0].name);
      }
      
      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to extract text');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    if (!extractedText) return;
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${files[0]?.name.replace('.pdf', '') || 'extracted'}_text.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Text file downloaded!');
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Extracting text..." />
      
      <div className="space-y-6">
        {!extractedText ? (
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
                Extract and clean text from your PDF. The tool will automatically fix spacing, 
                remove broken lines, and format the content for easy reading.
              </p>
            </div>

            <button
              onClick={handleExtract}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <FileText className="w-5 h-5" strokeWidth={2} />
              Extract Text
            </button>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Stats Bar */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{pageCount} pages</p>
                  <p className="text-xs text-muted-foreground">{extractedText.split(/\s+/).length} words</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>

            {/* Text Content */}
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-10" />
              <div className="max-h-[400px] overflow-y-auto p-5 rounded-xl bg-card border border-border/40 custom-scrollbar">
                <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">
                  {extractedText}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFiles([]);
                  setExtractedText(null);
                }}
                className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3 text-foreground font-medium"
              >
                Extract Another
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 btn-premium flex items-center justify-center gap-2 py-3 text-primary-foreground font-medium"
              >
                <Download className="w-4 h-4" />
                Download .txt
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TextExtractTool;

import { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface PdfToImageToolProps {
  onClose: () => void;
}

const PdfToImageTool = ({ onClose }: PdfToImageToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { trackUsage } = useUsageTracking();

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      // Track usage
      if (files[0]) {
        trackUsage('PDF to Image', files[0].name);
      }
      
      // For browser-based PDF to image, we need to inform user about limitations
      toast.info('PDF to Image requires server processing. Feature coming soon!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to convert PDF to images');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Converting PDF to images..." />
      
      <div className="space-y-6">
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          accept=".pdf,application/pdf"
          multiple={false}
          files={files}
          onRemoveFile={handleRemoveFile}
        />

        <div className="p-4 rounded-xl bg-secondary/40 border border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            Select a PDF file to convert each page to a high-quality image
          </p>
        </div>

        <button
          onClick={handleConvert}
          disabled={files.length === 0}
          className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
        >
          <Download className="w-5 h-5" strokeWidth={2} />
          Convert to Images
        </button>
      </div>
    </>
  );
};

export default PdfToImageTool;

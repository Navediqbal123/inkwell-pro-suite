import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface CompressPdfToolProps {
  onClose: () => void;
}

const CompressPdfTool = ({ onClose }: CompressPdfToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const { trackUsage } = useUsageTracking();

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      // Get compression options based on level
      const options: { useObjectStreams: boolean } = {
        useObjectStreams: compressionLevel !== 'low',
      };

      // Re-save with compression
      const compressedBytes = await pdfDoc.save(options);

      const originalSize = arrayBuffer.byteLength;
      const compressedSize = compressedBytes.length;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      const blob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      // Track usage
      trackUsage('Compress PDF', file.name);
      
      if (compressedSize < originalSize) {
        toast.success(`Compressed! Reduced by ${reduction}%`);
      } else {
        toast.success('PDF optimized and saved');
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to compress PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const compressionOptions = [
    { value: 'low', label: 'Low', description: 'Best quality' },
    { value: 'medium', label: 'Medium', description: 'Balanced' },
    { value: 'high', label: 'High', description: 'Smallest size' },
  ] as const;

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Compressing PDF..." />
      
      <div className="space-y-6">
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          accept=".pdf,application/pdf"
          multiple={false}
          files={files}
          onRemoveFile={handleRemoveFile}
        />

        {/* Compression level */}
        <div>
          <label className="block text-sm text-muted-foreground font-medium mb-4">
            Compression Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {compressionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCompressionLevel(option.value)}
                className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                  compressionLevel === option.value
                    ? 'bg-primary/15 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-secondary/40 border-border/30 hover:border-primary/30 hover:bg-secondary/60'
                }`}
              >
                <p className={`font-bold ${compressionLevel === option.value ? 'text-primary' : 'text-foreground'}`}>
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCompress}
          disabled={files.length === 0}
          className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
        >
          <Download className="w-5 h-5" strokeWidth={2} />
          Compress PDF
        </button>
      </div>
    </>
  );
};

export default CompressPdfTool;

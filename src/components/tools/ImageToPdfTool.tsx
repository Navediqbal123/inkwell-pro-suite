import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface ImageToPdfToolProps {
  onClose: () => void;
}

const ImageToPdfTool = ({ onClose }: ImageToPdfToolProps) => {
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
      toast.error('Please select at least one image');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        let image;

        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          // Convert other formats to PNG using canvas
          const img = new Image();
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          await new Promise<void>((resolve) => {
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0);
              resolve();
            };
            img.src = URL.createObjectURL(file);
          });

          const pngData = canvas.toDataURL('image/png');
          const pngBytes = await fetch(pngData).then((res) => res.arrayBuffer());
          image = await pdfDoc.embedPng(pngBytes);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'images-to-pdf.pdf';
      link.click();
      
      URL.revokeObjectURL(url);
      
      // Track usage
      trackUsage('Image to PDF', files.map(f => f.name).join(', '));
      
      toast.success('PDF created successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to convert images to PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Converting images to PDF..." />
      
      <div className="space-y-6">
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          files={files}
          onRemoveFile={handleRemoveFile}
          maxFiles={20}
        />

        <button
          onClick={handleConvert}
          disabled={files.length === 0}
          className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
        >
          <Download className="w-5 h-5" strokeWidth={2} />
          Convert to PDF
        </button>
      </div>
    </>
  );
};

export default ImageToPdfTool;

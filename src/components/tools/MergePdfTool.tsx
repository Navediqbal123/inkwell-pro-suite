import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download, GripVertical } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';

interface MergePdfToolProps {
  onClose: () => void;
}

const MergePdfTool = ({ onClose }: MergePdfToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = (from: number, to: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const [moved] = newFiles.splice(from, 1);
      newFiles.splice(to, 0, moved);
      return newFiles;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      
      URL.revokeObjectURL(url);
      toast.success('PDFs merged successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to merge PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Merging PDFs..." />
      
      <div className="space-y-6">
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          accept=".pdf,application/pdf"
          multiple
          files={[]}
          onRemoveFile={() => {}}
          maxFiles={20}
        />

        {/* Sortable file list */}
        {files.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              Drag to reorder files
            </p>
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-border/30 animate-scale-in cursor-move group hover:bg-secondary/60 transition-all duration-200"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString());
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const from = parseInt(e.dataTransfer.getData('text/plain'));
                  moveFile(from, index);
                }}
              >
                <GripVertical className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary/20 border border-primary/30 text-primary text-sm font-bold">
                  {index + 1}
                </span>
                <p className="flex-1 text-sm font-semibold text-foreground truncate">
                  {file.name}
                </p>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleMerge}
          disabled={files.length < 2}
          className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
        >
          <Download className="w-5 h-5" strokeWidth={2} />
          Merge PDFs
        </button>
      </div>
    </>
  );
};

export default MergePdfTool;

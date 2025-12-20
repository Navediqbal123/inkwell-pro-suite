import { useCallback, useState } from 'react';
import { Upload, X, FileImage, File } from 'lucide-react';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  files: File[];
  onRemoveFile: (index: number) => void;
  maxFiles?: number;
}

const FileDropzone = ({
  onFilesSelected,
  accept,
  multiple = false,
  files,
  onRemoveFile,
  maxFiles = 10,
}: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter((file) => {
        const fileType = file.type;
        const acceptTypes = accept.split(',').map((t) => t.trim());
        return acceptTypes.some((type) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return fileType === type;
        });
      });
      
      if (validFiles.length > 0) {
        const newFiles = multiple
          ? [...files, ...validFiles].slice(0, maxFiles)
          : validFiles.slice(0, 1);
        onFilesSelected(newFiles);
      }
    },
    [accept, files, maxFiles, multiple, onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        const newFiles = multiple
          ? [...files, ...selectedFiles].slice(0, maxFiles)
          : selectedFiles.slice(0, 1);
        onFilesSelected(newFiles);
      }
      e.target.value = '';
    },
    [files, maxFiles, multiple, onFilesSelected]
  );

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-primary" />;
    }
    return <File className="w-5 h-5 text-primary" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-5">
      {/* Drop zone with enhanced styling */}
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-400 ease-out group ${
          isDragging 
            ? 'border-primary/70 bg-primary/10 scale-[1.02]' 
            : 'border-border/50 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/30'
        }`}
      >
        {/* Glow effect on drag */}
        {isDragging && (
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl animate-pulse-glow" />
        )}
        
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="relative flex flex-col items-center gap-5 pointer-events-none">
          <div className="relative">
            <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 blur-xl transition-opacity duration-500 ${
              isDragging ? 'opacity-80' : 'opacity-0 group-hover:opacity-60'
            }`} />
            <div className={`relative p-5 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/25 group-hover:border-primary/50 transition-all duration-400 ${
              isDragging ? 'scale-110 border-primary/60' : 'group-hover:scale-105'
            }`}>
              <Upload className={`w-8 h-8 text-primary transition-transform duration-400 ${
                isDragging ? 'scale-110' : 'group-hover:scale-110'
              }`} strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-lg">
              {isDragging ? 'Drop files here' : 'Drop files here or click to upload'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Supports {accept.split(',').join(', ')}
            </p>
          </div>
        </div>
      </label>

      {/* File list with enhanced styling */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-4 p-4 rounded-xl glass-card border-border/40 animate-scale-in hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-50" />
                <div className="relative p-2.5 rounded-lg bg-gradient-to-br from-primary/15 to-primary/25 border border-primary/30">
                  {getFileIcon(file)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => onRemoveFile(index)}
                className="p-2.5 rounded-lg hover:bg-destructive/20 border border-transparent hover:border-destructive/40 transition-all duration-300 ease-out group"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive group-hover:scale-110 transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
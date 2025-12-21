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
    <div className="space-y-4">
      {/* Drop zone */}
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-primary/60 bg-primary/5 scale-[1.01]' 
            : 'border-border/50 hover:border-primary/40 bg-secondary/30 hover:bg-secondary/50'
        }`}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div className={`p-4 rounded-xl bg-primary/10 border border-primary/20 transition-all duration-300 ${
            isDragging ? 'scale-110 bg-primary/15' : ''
          }`}>
            <Upload className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold">
              {isDragging ? 'Drop files here' : 'Drop files here or click to upload'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports {accept.split(',').join(', ')}
            </p>
          </div>
        </div>
      </label>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/40 animate-scale-in hover:border-primary/20 transition-all duration-300"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                {getFileIcon(file)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => onRemoveFile(index)}
                className="p-2 rounded-lg hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-300 group"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;

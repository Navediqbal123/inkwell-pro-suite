import { useCallback } from 'react';
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
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
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
        onDragOver={(e) => e.preventDefault()}
        className="relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-border/60 hover:border-primary/50 rounded-2xl cursor-pointer transition-all duration-300 group bg-secondary/20 hover:bg-secondary/30"
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-lg">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-2">
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
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/30 animate-scale-in"
            >
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                {getFileIcon(file)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => onRemoveFile(index)}
                className="p-2 rounded-lg hover:bg-destructive/20 border border-transparent hover:border-destructive/30 transition-all duration-200 group"
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

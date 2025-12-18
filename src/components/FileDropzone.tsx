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
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border hover:border-primary/50 rounded-xl cursor-pointer transition-colors duration-300 group"
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {accept.split(',').join(', ')}
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
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 animate-scale-in"
            >
              {getFileIcon(file)}
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
                className="p-1.5 rounded-lg hover:bg-destructive/20 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;

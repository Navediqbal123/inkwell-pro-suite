import { useState, useCallback } from 'react';
import { Tag, Check, FileText, Sparkles } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { extractPdfText, suggestFileName } from '@/lib/pdfTextExtractor';

interface FileNameSuggestToolProps {
  onClose: () => void;
}

const FileNameSuggestTool = ({ onClose }: FileNameSuggestToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setSuggestions(null);
    setSelectedName(null);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setSuggestions(null);
    setSelectedName(null);
  }, []);

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractPdfText(files[0]);
      const names = suggestFileName(extracted);
      
      setSuggestions(names);
      if (names.length > 0) {
        setSelectedName(names[0]);
      }
      
      // Add to history
      if (typeof window !== 'undefined' && (window as any).addPdfToolsHistory) {
        (window as any).addPdfToolsHistory('File Name Suggest', files[0].name);
      }
      
      toast.success('Suggestions generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(`${name}.pdf`);
      setCopied(true);
      toast.success('Name copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Analyzing content..." />
      
      <div className="space-y-6">
        {!suggestions ? (
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
                Analyze your PDF content and get professional file name suggestions based on 
                the document's title, headings, and content.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <Sparkles className="w-5 h-5" strokeWidth={2} />
              Suggest File Name
            </button>
          </>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Current Name */}
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/40">
              <p className="text-xs text-muted-foreground mb-2">Current name</p>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground truncate">{files[0]?.name}</p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Suggested Names
              </h4>
              
              <div className="space-y-2">
                {suggestions.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedName(name);
                      handleCopy(name);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 animate-slide-up group ${
                      selectedName === name
                        ? 'bg-primary/10 border-primary/40'
                        : 'bg-card border-border/40 hover:border-primary/30'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                          selectedName === name
                            ? 'bg-primary/20 border-primary/40 text-primary'
                            : 'bg-secondary border-border text-muted-foreground'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground truncate">
                          {name}.pdf
                        </span>
                      </div>
                      {selectedName === name && copied ? (
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          Click to copy
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => {
                setFiles([]);
                setSuggestions(null);
                setSelectedName(null);
              }}
              className="w-full btn-secondary flex items-center justify-center gap-2 py-3 text-foreground font-medium"
            >
              Analyze Another Document
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FileNameSuggestTool;

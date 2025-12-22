import { useState, useCallback } from 'react';
import { Search, FileText, MapPin, ChevronRight } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import ProcessingOverlay from '../ProcessingOverlay';
import { toast } from 'sonner';
import { extractPdfText, searchPdfContent, ExtractedPDF } from '@/lib/pdfTextExtractor';

interface SmartSearchToolProps {
  onClose: () => void;
}

const SmartSearchTool = ({ onClose }: SmartSearchToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedPdf, setExtractedPdf] = useState<ExtractedPDF | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ 
    matches: { pageNumber: number; context: string; highlight: string }[]; 
    totalMatches: number 
  } | null>(null);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setExtractedPdf(null);
    setSearchResults(null);
    setSearchQuery('');
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setExtractedPdf(null);
    setSearchResults(null);
  }, []);

  const handleLoadPdf = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const extracted = await extractPdfText(files[0]);
      setExtractedPdf(extracted);
      
      // Add to history
      if (typeof window !== 'undefined' && (window as any).addPdfToolsHistory) {
        (window as any).addPdfToolsHistory('Smart Search', files[0].name);
      }
      
      toast.success('Document loaded! Start searching.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to load PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearch = () => {
    if (!extractedPdf || !searchQuery.trim()) {
      toast.error('Enter a search query');
      return;
    }

    const results = searchPdfContent(extractedPdf, searchQuery);
    setSearchResults(results);

    if (results.totalMatches === 0) {
      toast.info('No matches found');
    } else {
      toast.success(`Found ${results.totalMatches} match${results.totalMatches > 1 ? 'es' : ''}`);
    }
  };

  const highlightQuery = (text: string, query: string) => {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    let result = text;
    
    for (const word of queryWords) {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '<mark class="bg-accent/30 text-accent px-0.5 rounded">$1</mark>');
    }
    
    return result;
  };

  return (
    <>
      <ProcessingOverlay isProcessing={isProcessing} message="Loading document..." />
      
      <div className="space-y-6">
        {!extractedPdf ? (
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
                Load your PDF and search for any keyword or phrase. The tool will find and 
                highlight matching sections with context — like asking your document a question.
              </p>
            </div>

            <button
              onClick={handleLoadPdf}
              disabled={files.length === 0}
              className="w-full btn-premium flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ripple"
            >
              <Search className="w-5 h-5" strokeWidth={2} />
              Load & Search PDF
            </button>
          </>
        ) : (
          <div className="space-y-5 animate-fade-in">
            {/* Document Info */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/40">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {extractedPdf.title || files[0]?.name}
                </p>
                <p className="text-xs text-muted-foreground">{extractedPdf.totalPages} pages</p>
              </div>
              <button
                onClick={() => {
                  setFiles([]);
                  setExtractedPdf(null);
                  setSearchResults(null);
                  setSearchQuery('');
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Change
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ask your document..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground outline-none transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className="px-6 btn-premium flex items-center justify-center gap-2 text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed ripple"
              >
                Search
              </button>
            </div>

            {/* Results */}
            {searchResults && (
              <div className="space-y-4">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {searchResults.totalMatches > 0 ? (
                      <>
                        <span className="text-foreground font-semibold">{searchResults.totalMatches}</span> result{searchResults.totalMatches > 1 ? 's' : ''} found
                      </>
                    ) : (
                      'No matches found'
                    )}
                  </p>
                </div>

                {/* Results List */}
                {searchResults.matches.length > 0 && (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                    {searchResults.matches.map((match, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/15 border border-primary/25">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium text-primary">Page {match.pageNumber}</span>
                          </div>
                        </div>
                        <p 
                          className="text-sm text-foreground/80 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: highlightQuery(match.context, searchQuery) }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No Results Placeholder */}
            {!searchResults && (
              <div className="text-center py-8">
                <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Enter a keyword or question to search
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SmartSearchTool;

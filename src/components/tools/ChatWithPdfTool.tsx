import { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Loader2, Trash2 } from 'lucide-react';
import FileDropzone from '../FileDropzone';
import { chatWithPdf } from '@/lib/api';
import { toast } from 'sonner';
import { useUsageTracking } from '@/hooks/useUsageTracking';

interface ChatWithPdfToolProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatWithPdfTool = ({ onClose }: ChatWithPdfToolProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { trackUsage } = useUsageTracking();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setMessages([]);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMessages([]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || files.length === 0 || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatWithPdf(files[0], userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      trackUsage('Chat with PDF', files[0].name);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      
      // Remove the user message on error
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      setInputValue(userMessage.content);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[70vh] max-h-[600px]">
      {/* PDF Upload Section */}
      {files.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center">
          <FileDropzone
            onFilesSelected={handleFilesSelected}
            accept=".pdf,application/pdf"
            multiple={false}
            files={files}
            onRemoveFile={handleRemoveFile}
            maxFiles={1}
          />
          <p className="text-center text-muted-foreground text-sm mt-4">
            Upload a PDF to start chatting with it
          </p>
        </div>
      ) : (
        <>
          {/* PDF Info Bar */}
          <div className="flex items-center justify-between p-3 mb-4 rounded-xl bg-secondary/50 border border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{files[0].name}</p>
                <p className="text-xs text-muted-foreground">
                  {(files[0].size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  setFiles([]);
                  setMessages([]);
                }}
                className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
              >
                Change PDF
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Start a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Ask any question about your PDF document and I'll help you find the answer.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-slide-up ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/20 text-accent border border-accent/30'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-md'
                        : 'bg-secondary/70 text-foreground border border-border/40 rounded-tl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent border border-accent/30 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-secondary/70 border border-border/40 rounded-2xl rounded-tl-md p-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your PDF..."
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWithPdfTool;

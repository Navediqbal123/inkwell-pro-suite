import * as pdfjsLib from 'pdfjs-dist';

// Set worker path for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ExtractedPage {
  pageNumber: number;
  text: string;
  lines: string[];
}

export interface ExtractedPDF {
  totalPages: number;
  pages: ExtractedPage[];
  fullText: string;
  title: string;
  metadata: {
    author?: string;
    subject?: string;
    keywords?: string;
    creationDate?: string;
  };
}

/**
 * Extract text content from a PDF file
 */
export async function extractPdfText(file: File): Promise<ExtractedPDF> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const pages: ExtractedPage[] = [];
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    const lines: string[] = [];
    let currentLine = '';
    let lastY: number | null = null;
    
    for (const item of textContent.items) {
      if ('str' in item) {
        const itemY = (item as any).transform?.[5] ?? 0;
        
        // Detect line breaks based on Y position
        if (lastY !== null && Math.abs(itemY - lastY) > 5) {
          if (currentLine.trim()) {
            lines.push(currentLine.trim());
          }
          currentLine = item.str;
        } else {
          currentLine += item.str;
        }
        lastY = itemY;
      }
    }
    
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }
    
    const pageText = lines.join('\n');
    pages.push({
      pageNumber: i,
      text: pageText,
      lines
    });
    fullText += pageText + '\n\n';
  }

  // Get metadata
  const metadata = await pdf.getMetadata().catch(() => null);
  const info = metadata?.info as any || {};
  
  // Try to extract title from metadata or first significant line
  let title = info.Title || '';
  if (!title && pages[0]?.lines[0]) {
    title = pages[0].lines[0].substring(0, 100);
  }

  return {
    totalPages: pdf.numPages,
    pages,
    fullText: fullText.trim(),
    title,
    metadata: {
      author: info.Author,
      subject: info.Subject,
      keywords: info.Keywords,
      creationDate: info.CreationDate
    }
  };
}

/**
 * Clean and format extracted text
 */
export function cleanExtractedText(text: string): string {
  return text
    // Fix broken words (hyphenation)
    .replace(/(\w+)-\s*\n\s*(\w+)/g, '$1$2')
    // Fix multiple spaces
    .replace(/[ \t]+/g, ' ')
    // Fix multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim lines
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
}

/**
 * Detect headings from text based on patterns
 */
export function detectHeadings(lines: string[]): string[] {
  const headings: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty or very short lines
    if (trimmed.length < 3 || trimmed.length > 100) continue;
    
    // Detect common heading patterns
    const isHeading = 
      // All caps
      (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && /[A-Z]/.test(trimmed)) ||
      // Numbered sections
      /^\d+(\.\d+)*\s+[A-Z]/.test(trimmed) ||
      // Roman numerals
      /^[IVXLCDM]+\.\s+[A-Z]/.test(trimmed) ||
      // Ends with colon
      (trimmed.endsWith(':') && trimmed.length < 60) ||
      // Chapter/Section patterns
      /^(Chapter|Section|Part|Article)\s+\d+/i.test(trimmed);
    
    if (isHeading) {
      headings.push(trimmed);
    }
  }
  
  return headings;
}

/**
 * Extract key sentences using heuristics
 */
export function extractKeyPoints(text: string, maxPoints: number = 5): string[] {
  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim().length > 20 && s.trim().length < 300);
  
  // Score sentences based on importance indicators
  const scored = sentences.map(sentence => {
    let score = 0;
    
    // Important keywords
    const importantWords = [
      'important', 'significant', 'key', 'main', 'primary',
      'essential', 'critical', 'fundamental', 'notable', 'major',
      'conclusion', 'result', 'finding', 'summary', 'objective',
      'purpose', 'goal', 'therefore', 'thus', 'consequently'
    ];
    
    for (const word of importantWords) {
      if (sentence.toLowerCase().includes(word)) score += 2;
    }
    
    // Contains numbers/statistics
    if (/\d+%|\d+\s*(percent|million|billion|thousand)/i.test(sentence)) {
      score += 3;
    }
    
    // First sentences of paragraphs (approximated)
    if (sentence.length > 50 && sentence.length < 200) {
      score += 1;
    }
    
    // Avoid questions and short sentences
    if (sentence.includes('?')) score -= 2;
    if (sentence.length < 40) score -= 1;
    
    return { sentence: sentence.trim(), score };
  });
  
  // Sort by score and return top points
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPoints)
    .map(s => s.sentence);
}

/**
 * Generate a smart summary from extracted text
 */
export function generateSmartSummary(extractedPdf: ExtractedPDF): {
  summary: string[];
  headings: string[];
  keyStats: string[];
} {
  const allLines = extractedPdf.pages.flatMap(p => p.lines);
  const headings = detectHeadings(allLines);
  const keyPoints = extractKeyPoints(extractedPdf.fullText);
  
  // Extract any statistics or numbers
  const statsRegex = /\d+(\.\d+)?\s*(%|percent|million|billion|thousand|dollars?|\$)/gi;
  const matches = extractedPdf.fullText.match(statsRegex) || [];
  const keyStats = [...new Set(matches)].slice(0, 5);
  
  return {
    summary: keyPoints,
    headings: headings.slice(0, 10),
    keyStats
  };
}

/**
 * Search for relevant content based on a query
 */
export function searchPdfContent(
  extractedPdf: ExtractedPDF, 
  query: string
): { matches: { pageNumber: number; context: string; highlight: string }[]; totalMatches: number } {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  const matches: { pageNumber: number; context: string; highlight: string }[] = [];
  
  for (const page of extractedPdf.pages) {
    for (let i = 0; i < page.lines.length; i++) {
      const line = page.lines[i];
      const lineLower = line.toLowerCase();
      
      // Check if line contains query words
      const hasMatch = queryWords.some(word => lineLower.includes(word));
      
      if (hasMatch) {
        // Get context (surrounding lines)
        const contextStart = Math.max(0, i - 1);
        const contextEnd = Math.min(page.lines.length, i + 2);
        const context = page.lines.slice(contextStart, contextEnd).join(' ');
        
        matches.push({
          pageNumber: page.pageNumber,
          context: context.substring(0, 250) + (context.length > 250 ? '...' : ''),
          highlight: line.substring(0, 150)
        });
      }
    }
  }
  
  return {
    matches: matches.slice(0, 10),
    totalMatches: matches.length
  };
}

/**
 * Suggest a professional file name based on content
 */
export function suggestFileName(extractedPdf: ExtractedPDF): string[] {
  const suggestions: string[] = [];
  
  // Use title from metadata
  if (extractedPdf.title && extractedPdf.title.length > 3) {
    const titleClean = extractedPdf.title
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .substring(0, 50)
      .replace(/\s+/g, '_');
    if (titleClean.length > 3) {
      suggestions.push(titleClean);
    }
  }
  
  // First heading
  const headings = detectHeadings(extractedPdf.pages[0]?.lines || []);
  if (headings[0]) {
    const headingClean = headings[0]
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .substring(0, 40)
      .replace(/\s+/g, '_');
    if (headingClean.length > 3 && !suggestions.includes(headingClean)) {
      suggestions.push(headingClean);
    }
  }
  
  // Date-based suggestion
  const date = new Date();
  const dateStr = `Document_${date.getFullYear()}_${String(date.getMonth() + 1).padStart(2, '0')}_${String(date.getDate()).padStart(2, '0')}`;
  suggestions.push(dateStr);
  
  return suggestions.slice(0, 3);
}

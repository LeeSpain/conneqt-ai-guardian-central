import { FirecrawlService } from './FirecrawlService';
import { PerplexityService } from './PerplexityService';

function trimContent(input: string, maxChars = 12000): string {
  if (input.length <= maxChars) return input;
  // keep head + tail
  const head = input.slice(0, Math.floor(maxChars * 0.6));
  const tail = input.slice(-Math.floor(maxChars * 0.2));
  return `${head}\n\n...\n\n${tail}`;
}

export type CompanyAnalysis = {
  summary: string;
  keyPoints: string[];
  sources: { type: 'website' | 'reviews'; url: string }[];
};

export class CompanyAnalyzer {
  static async analyzeCompany(params: { websiteUrl?: string; companyName: string; industry?: string }): Promise<CompanyAnalysis | null> {
    const { websiteUrl, companyName, industry } = params;

    let websiteContent = '';
    const sources: CompanyAnalysis['sources'] = [];

    if (websiteUrl) {
      const crawl = await FirecrawlService.crawlWebsite(websiteUrl);
      if (crawl.success) {
        const first = (crawl as any).data?.[0];
        const md = first?.markdown || first?.content || '';
        const html = first?.html || '';
        websiteContent = trimContent(md || html || '');
        sources.push({ type: 'website', url: websiteUrl });
      }
    }

    const content = websiteContent || 'No website content available.';

    // Try Perplexity, otherwise fallback
    const perplexity = await PerplexityService.summarizeCompany({ companyName, industry, websiteUrl, content });
    if (perplexity) {
      return {
        summary: perplexity.summary,
        keyPoints: perplexity.keyPoints,
        sources,
      };
    }

    // Fallback summary
    const fallbackSummary = `Based on available information, ${companyName} operates in the ${industry || 'unspecified'} sector. The public website suggests focus areas around its core offerings. This overview will improve once AI data access is configured.`;
    const fallbackPoints = [
      'Configure API keys to enable deeper AI analysis',
      websiteUrl ? `Primary website source: ${websiteUrl}` : 'Website not provided',
      'Key value propositions to be refined',
      'Customer segments and channels pending validation',
    ];

    return {
      summary: fallbackSummary,
      keyPoints: fallbackPoints,
      sources,
    };
  }
}

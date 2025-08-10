import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data: any[];
}

export type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static app: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.app = new FirecrawlApp({ apiKey });
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  private static ensureApp() {
    const apiKey = this.getApiKey();
    if (!this.app && apiKey) this.app = new FirecrawlApp({ apiKey });
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const app = new FirecrawlApp({ apiKey });
      const res = await app.crawlUrl('https://example.com', { limit: 1 });
      return !!(res as any)?.success;
    } catch (_) {
      return false;
    }
  }

  static async crawlWebsite(url: string): Promise<CrawlResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) return { success: false, error: 'Firecrawl API key not set' };

    try {
      this.ensureApp();
      const res = await this.app!.crawlUrl(url, {
        limit: 20,
        scrapeOptions: {
          formats: ['markdown', 'html'],
        },
      });
      return res as CrawlResponse;
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to crawl website' };
    }
  }
}

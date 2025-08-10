export class PerplexityService {
  private static API_KEY_STORAGE_KEY = 'perplexity_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async summarizeCompany(params: {
    companyName: string;
    industry?: string;
    websiteUrl?: string;
    content: string;
  }): Promise<{ summary: string; keyPoints: string[] } | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) return null;

    const { companyName, industry, websiteUrl, content } = params;

    const system = 'You are an analyst. Create a concise, business-friendly overview.';
    const user = `Using the content below (may include website text), write a 4-6 sentence overview of the company with specifics and 4-6 crisp bullet key points.\n\nCompany: ${companyName}\nIndustry: ${industry || 'N/A'}\nWebsite: ${websiteUrl || 'N/A'}\n\nContent:\n${content}`;

    const body = {
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 700,
      return_images: false,
      search_recency_filter: 'month',
    } as const;

    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text: string = data?.choices?.[0]?.message?.content || '';

    // naive parse: split bullets
    const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean);
    const bulletStart = lines.findIndex((l: string) => l.startsWith('-') || l.startsWith('•'));
    const summary = bulletStart > 0 ? lines.slice(0, bulletStart).join(' ') : lines.join(' ');
    const keyPoints = bulletStart >= 0 ? lines.slice(bulletStart).map((l: string) => l.replace(/^[-•]\s?/, '')) : [];
    return { summary, keyPoints };
  }
}

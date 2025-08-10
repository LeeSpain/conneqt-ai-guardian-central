export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export class OpenAIService {
  private static API_KEY_STORAGE_KEY = "openai_api_key";

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a test system." },
            { role: "user", content: "Say OK." },
          ],
          max_tokens: 5,
        }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      return !!data?.choices?.[0]?.message?.content;
    } catch {
      return false;
    }
  }

  static async chat(messages: ChatMessage[], opts?: { model?: string; temperature?: number }): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("OpenAI API key not set");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: opts?.model ?? "gpt-4o-mini",
        temperature: opts?.temperature ?? 0.3,
        messages,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to call OpenAI");
    }
    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    return content.trim();
  }
}

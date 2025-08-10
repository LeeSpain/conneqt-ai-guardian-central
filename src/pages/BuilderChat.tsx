import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User } from "lucide-react";
import { AgentProvider, useAgent } from "@/contexts/AgentContext";

// Public-facing Builder Agent chat
export default function BuilderChat() {
  useEffect(() => {
    document.title = "Builder Agent Chat | ConneqtCentral";
    // Meta description
    const desc = "Chat with our Builder Agent to scope your needs—safe, redacted, and fast.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    // Canonical
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  return (
    <AgentProvider>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4 space-y-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Builder Agent Chat</h1>
            <p className="text-muted-foreground">Public-facing assistant for prospects. Shares only redacted, high‑level info upstream.</p>
          </header>
          <BuilderChatInner />
        </section>
      </main>
      <Footer />
    </AgentProvider>
  );
}

function BuilderChatInner() {
  const { getClientAgent, masterAgent } = useAgent();
  const builder = getClientAgent("builder");

  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([
    {
      id: "greet",
      role: "assistant",
      content:
        builder
          ? `Hi! I'm ${builder.name}. I help scope your needs and pass only safe basics to ${masterAgent.name}. How can I help?`
          : `Hi! I'm your Builder Agent. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");

  // Recompute greeting if builder loads later
  useEffect(() => {
    if (!builder) return;
    setMessages((prev) =>
      prev[0]?.id === "greet"
        ? [
            {
              id: "greet",
              role: "assistant",
              content: `Hi! I'm ${builder.name}. I help scope your needs and pass only safe basics to ${masterAgent.name}. How can I help?`,
            },
            ...prev.slice(1),
          ]
        : prev
    );
  }, [builder, masterAgent.name]);

  const send = () => {
    if (!input.trim()) return;
    const u = { id: `u-${Date.now()}`, role: "user" as const, content: input };
    const a = {
      id: `a-${Date.now() + 1}`,
      role: "assistant" as const,
      content: builder
        ? `Demo reply from ${builder.name}. (Policies via ${masterAgent.name}).`
        : `Demo reply from Builder Agent.`,
    };
    setMessages((prev) => [...prev, u, a]);
    setInput("");
  };

  return (
    <Card className="min-h-[60vh]">
      <CardHeader>
        <CardTitle>Conversation</CardTitle>
        <CardDescription>
          Persona: <span className="text-foreground">{builder?.persona ?? "Prospect scoping assistant"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[48vh] overflow-auto rounded-md border p-4 bg-background space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
              <span className="text-xs text-muted-foreground mr-2">{m.role}</span>
              <span className={`inline-flex items-start gap-2 rounded-md px-3 py-2 max-w-[80%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {m.role === "assistant" ? <Bot className="w-4 h-4 mt-0.5 text-primary" /> : <User className="w-4 h-4 mt-0.5" />}
                <span>{m.content}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            aria-label="Message the Builder Agent"
          />
          <Button onClick={send}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}

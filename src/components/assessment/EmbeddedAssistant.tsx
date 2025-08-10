import React from "react";
import DemoChat from "@/components/solution/DemoChat";

const EmbeddedAssistant: React.FC = () => {
  return (
    <section aria-labelledby="assistant-title" className="space-y-3">
      <header className="px-1">
        <h2 id="assistant-title" className="text-xl font-medium tracking-tight">
          AI Assistant
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask questions as you complete the questionnaire. Your progress is never lost.
        </p>
      </header>
      {/* DemoChat includes its own Card wrapper and is fully themed */}
      <DemoChat industry="" scenario="Welcome" />
    </section>
  );
};

export default EmbeddedAssistant;

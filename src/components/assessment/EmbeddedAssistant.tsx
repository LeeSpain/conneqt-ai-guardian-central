import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClientProfile } from "@/contexts/ClientProfileContext";

const EmbeddedAssistant: React.FC = () => {
  const { profile } = useClientProfile();
  const overview = profile.companyOverview;

  if (overview?.summary) {
    return (
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Hi — I’m your AI assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          <p className="text-sm text-muted-foreground">Here’s a quick overview based on your company basics:</p>
          <p className="text-sm leading-relaxed">{overview.summary}</p>
          {overview.keyPoints && overview.keyPoints.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {overview.keyPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  }

  // No chat fallback; hide until overview is ready
  return null;
};

export default EmbeddedAssistant;

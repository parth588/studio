"use client";

import type { AnalyzePasswordStrengthOutput } from "@/ai/flows/password-strength-analyzer";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  result: AnalyzePasswordStrengthOutput | null;
  isLoading: boolean;
}

export function PasswordStrengthIndicator({
  result,
  isLoading,
}: PasswordStrengthIndicatorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Analyzing password...
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getStrengthColor = (strength: string) => {
    if (strength.toLowerCase().includes("very strong")) return "text-primary";
    if (strength.toLowerCase().includes("strong")) return "text-green-600";
    if (strength.toLowerCase().includes("moderate")) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="space-y-2 text-sm">
      <p>
        <strong>Strength:</strong>{" "}
        <span className={cn("font-semibold", getStrengthColor(result.strength))}>
          {result.strength}
        </span>
      </p>
      {result.feedback && (
        <div>
          <p>
            <strong>Feedback:</strong>
          </p>
          <p className="text-muted-foreground">{result.feedback}</p>
        </div>
      )}
    </div>
  );
}

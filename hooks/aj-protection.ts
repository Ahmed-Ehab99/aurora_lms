import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { ApiResponse } from "@/lib/types";
import { ArcjetDecision } from "@arcjet/next";

type AjProtectionOptions = {
  window?: string;
  max?: number;
};

export function ajProtection(options: AjProtectionOptions = {}) {
  const { window = "1m", max = 5 } = options;

  return arcjet
    .withRule(
      detectBot({
        mode: "LIVE",
        allow: [],
      }),
    )
    .withRule(
      fixedWindow({
        mode: "LIVE",
        window,
        max,
      }),
    );
}

export function handleArcjetDecision(
  decision: ArcjetDecision,
): ApiResponse | null {
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return {
        status: "error",
        message: "You have been blocked due to rate limiting.",
      };
    } else {
      return {
        status: "error",
        message: "Your are a bot! If this is mistake contact our support.",
      };
    }
  }
  return null;
}

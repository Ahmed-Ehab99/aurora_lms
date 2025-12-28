import arcjet, { fixedWindow } from "@/lib/arcjet";
import { ApiResponse } from "@/lib/types";
import { ArcjetDecision } from "@arcjet/next";
import { NextResponse } from "next/server";

type AjProtectionOptions = {
  window?: string;
  max?: number;
};

export function ajProtection(options: AjProtectionOptions = {}) {
  const { window = "1m", max = 5 } = options;

  return arcjet.withRule(
    fixedWindow({
      mode: "LIVE",
      window,
      max,
    }),
  );
}

// ✅ For Server Actions - returns ApiResponse
export function handleArcjetDecisionAction(
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
        message: "You are a bot! If this is a mistake, contact our support.",
      };
    }
  }
  return null;
}

// ✅ For API Routes - returns NextResponse
export function handleArcjetDecisionRoute(
  decision: ArcjetDecision,
): NextResponse | null {
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          status: "error",
          message: "You have been blocked due to rate limiting.",
        },
        { status: 429 },
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "You are a bot! If this is a mistake, contact our support.",
        },
        { status: 403 },
      );
    }
  }
  return null;
}

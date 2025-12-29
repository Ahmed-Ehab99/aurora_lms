import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./lib/env";

const aj = arcjet({
  key: env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE", // will block requests.
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Index data for search engines (Google, Bing, etc)
        "CATEGORY:MONITOR", // Interact for monitoring purposes (Uptime monitoring services),
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
        "STRIPE_WEBHOOK", // Stripe webhook for payment
      ],
    }),
  ],
});

export default createMiddleware(aj, async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // Fast check: No session cookie = no access
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Role check happens in server components/actions
    return NextResponse.next();
  }

  // Redirect logged-in users away from login
  if (pathname === "/login" && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

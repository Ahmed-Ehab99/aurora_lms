import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
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

  // Get session once
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If user is logged in and tries to access /login
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.user.role !== "Admin") {
      return NextResponse.redirect(new URL("/not-admin", request.url));
    }

    return NextResponse.next();
  }

  // User Dashboard routes protection
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

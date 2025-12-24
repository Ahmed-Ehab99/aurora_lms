import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
// import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./lib/env";
import { auth } from "./lib/auth";

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
        "STRIPE_WEBHOOK" // Stripe webhook for payment
      ],
    }),
  ],
});

async function proxy(request: NextRequest) {
  try {
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Check if session exists
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user has admin role
    const isAdmin = session.user.role === "admin";

    if (!isAdmin) {
      // Redirect non-admin users to home or unauthorized page
      return NextResponse.redirect(new URL("/", request.url));
    }

    // User is authenticated and is admin
    return NextResponse.next();
  } catch (error) {
    console.error("Admin guard error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // const sessionCookie = getSessionCookie(request);

  // if (!sessionCookie) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export default createMiddleware(aj, async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return proxy(request);
  }

  return NextResponse.next();
});

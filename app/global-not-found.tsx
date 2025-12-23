import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Link from "next/link";
import "./globals.css";
import { geistMono, geistSans } from "./layout";

const GlobalNotFound = () => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
            {/* Animated background gradient */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="bg-primary/10 absolute -top-1/2 -left-1/2 size-[800px] animate-pulse rounded-full blur-3xl" />
              <div
                className="bg-primary/5 absolute -right-1/2 -bottom-1/2 size-[800px] animate-pulse rounded-full blur-3xl"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Main content */}
            <div className="fade-in-up relative z-10 flex flex-col items-center space-y-8 text-center">
              {/* Animated 404 text */}
              <div className="relative">
                <h1 className="text-foreground text-8xl font-bold tracking-tight md:text-9xl lg:text-[12rem]">
                  <span
                    className="fade-in-scale inline-block"
                    style={{ animationDelay: "0.1s" }}
                  >
                    4
                  </span>
                  <span
                    className="fade-in-scale inline-block"
                    style={{ animationDelay: "0.2s" }}
                  >
                    0
                  </span>
                  <span
                    className="fade-in-scale inline-block"
                    style={{ animationDelay: "0.3s" }}
                  >
                    4
                  </span>
                </h1>
                {/* Glowing effect */}
                <div className="absolute inset-0 -z-10 animate-pulse">
                  <div className="bg-primary/20 absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                </div>
              </div>

              {/* Error message */}
              <div
                className="fade-in-up space-y-4"
                style={{ animationDelay: "0.5s" }}
              >
                <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
                  Hmm, seems that you are lost 🤔
                </h2>
                <p className="text-muted-foreground max-w-md text-lg md:text-xl">
                  The page you&apos;re looking for doesn&apos;t exist or may
                  have been moved.
                </p>
              </div>

              {/* Action buttons */}
              <div
                className="fade-in-up flex flex-col gap-4 pt-4 sm:flex-row"
                style={{ animationDelay: "0.7s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <Link href="/">
                    <span className="relative z-10">Go To Home</span>
                    <div className="bg-primary-foreground/20 absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden"
                >
                  <Link href="/courses">
                    <span className="relative z-10">Browse Courses</span>
                    <div className="bg-accent absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="animate-float bg-primary/30 absolute h-1 w-1 rounded-full"
                  style={{
                    left: `${10 + i * 8}%`,
                    top: `${20 + (i % 5) * 15}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2.5 + (i % 3)}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default GlobalNotFound;

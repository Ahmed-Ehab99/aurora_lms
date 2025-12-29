import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import Link from "next/link";

const NotAdminPage = () => {
  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Animated background gradient - Orange/Yellow theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 size-[800px] animate-pulse rounded-full bg-orange-500/10 blur-3xl" />
        <div
          className="absolute -right-1/2 -bottom-1/2 size-[800px] animate-pulse rounded-full bg-yellow-500/5 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main content */}
      <div className="fade-in-up relative z-10 flex flex-col items-center space-y-8 text-center">
        {/* Animated icon */}
        <div className="relative">
          <div
            className="fade-in-scale flex items-center justify-center"
            style={{ animationDelay: "0.1s" }}
          >
            <ShieldX
              className="size-32 text-orange-500 md:size-40"
              strokeWidth={1.5}
            />
          </div>
          {/* Glowing effect */}
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-orange-500/20 blur-3xl" />
          </div>
        </div>

        {/* Error message */}
        <div
          className="fade-in-up flex flex-col items-center space-y-4"
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Access Restricted! 🔒
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg md:text-xl">
            Hey! You are not an admin, which means you can&apos;t access this
            route
          </p>
        </div>

        {/* Action buttons */}
        <div
          className="fade-in-up flex flex-col gap-4 pt-4 sm:flex-row"
          style={{ animationDelay: "0.5s" }}
        >
          <Button asChild size="lg" className="group relative overflow-hidden">
            <Link href="/">
              <span className="relative z-10">Back to Home</span>
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
            className="animate-float absolute h-1 w-1 rounded-full bg-orange-500/30"
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
  );
};

export default NotAdminPage;

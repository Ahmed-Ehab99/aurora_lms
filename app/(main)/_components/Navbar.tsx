"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Logo from "@/public/logo.webp";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

interface NavigationItemT {
  id: number;
  name: string;
  href: string;
}

const navigationItems: NavigationItemT[] = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Courses", href: "/admin/courses" },
  { id: 3, name: "Dashboard", href: "/admin" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" className="size-9 rounded-[0.5rem]" />
          <span className="font-bold">AuroraLMS.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mx-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
              />
            ) : (
              <>
                <Button asChild variant="secondary">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

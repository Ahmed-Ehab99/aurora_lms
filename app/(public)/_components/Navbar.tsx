import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Role } from "@/prisma/generated/prisma/enums";
import Logo from "@/public/logo.webp";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
// import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavigationItemT {
  id: number;
  name: string;
  href: string;
}
const navigationItems: NavigationItemT[] = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Courses", href: "/courses" },
  { id: 3, name: "Dashboard", href: "/dashboard" },
];

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.role === Role.admin;

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex min-h-16 items-center justify-between">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={Logo}
                alt="Logo"
                className="size-9 rounded-[8px]"
                loading="eager"
              />
              <span className="font-bold">AuroraLMS.</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:justify-center">
            <div className="flex items-center space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="hover:text-primary font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="hover:text-primary font-medium transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </nav>

          <div className="flex items-center justify-end space-x-4">
            <AnimatedThemeToggler />
            {/* <ThemeToggle/> */}

            {session ? (
              <UserDropdown
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
                isAdmin={isAdmin}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;

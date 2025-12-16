import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Logo from "@/public/logo.webp";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex min-h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" className="size-9 rounded-md" />
          <span className="font-bold">AuroraLMS.</span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          <AnimatedThemeToggler />

          {session ? (
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

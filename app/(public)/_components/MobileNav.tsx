"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavigationItemT {
  id: number;
  name: string;
  href: string;
}

interface MobileNavProps {
  navigationItems: NavigationItemT[];
  isAdmin: boolean;
  session: Session | null;
}

const MobileNav = ({ navigationItems, isAdmin, session }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-3 p-4">
          {navigationItems.map((item) => (
            <DrawerClose asChild key={item.id}>
              <Link
                href={item.href}
                className="hover:text-primary rounded-md px-3 py-2 text-lg font-medium transition-colors"
              >
                {item.name}
              </Link>
            </DrawerClose>
          ))}
          {isAdmin && (
            <DrawerClose asChild>
              <Link
                href="/admin"
                className="hover:text-primary rounded-md px-3 py-2 text-lg font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
            </DrawerClose>
          )}

          {!session && (
            <>
              <Separator className="mb-3" />
              <DrawerClose asChild>
                <Button asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </DrawerClose>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;

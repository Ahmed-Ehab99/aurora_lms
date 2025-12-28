"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignout } from "@/hooks/use-signout";
import { BookOpen, Home, LayoutDashboard, LogOutIcon } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  name: string;
  email: string;
  image?: string | null;
  isAdmin: boolean;
}

const UserDropdown = ({ name, email, image, isAdmin }: UserDropdownProps) => {
  const handleSignout = useSignout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image || `https://avatar.vercel.sh/${email}`}
            alt="Profile Image"
          />
          <AvatarFallback>
            {name && name.length > 0
              ? name[0].toUpperCase()
              : email[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name && name.length > 0 ? name : email.split("@")[0]}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/">
            <Home size={16} className="opacity-60" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/courses">
            <BookOpen size={16} className="opacity-60" aria-hidden="true" />
            <span>Courses</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

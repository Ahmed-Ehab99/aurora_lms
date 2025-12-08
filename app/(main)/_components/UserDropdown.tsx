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
import { authClient } from "@/lib/auth-client";
import { BookOpen, Home, LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
  name: string;
  email: string;
  image?: string | null;
}

const UserDropdown = ({ name, email, image }: UserDropdownProps) => {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed Out Successfully");
          router.refresh();
          router.push("/");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to Sign Out");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={image || ""} alt="Profile Image" />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name}
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
            <LayoutDashboardIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
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

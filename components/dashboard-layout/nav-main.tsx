"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconCertificate,
  IconCirclePlusFilled,
  IconDashboard,
  IconHome,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    title: "Home",
    url: "/",
    icon: IconHome,
  },
  {
    title: "Dashboard",
    url: "/admin",
    icon: IconDashboard,
  },
  {
    title: "Create Course",
    url: "/admin/courses/create",
    icon: IconCirclePlusFilled,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: IconCertificate,
  },
];

const studentNavItems = [
  {
    title: "Home",
    url: "/",
    icon: IconHome,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
];

export function NavMain({
  dashboardType,
}: {
  dashboardType: "admin" | "student";
}) {
  const pathname = usePathname();
  const navItems =
    dashboardType === "student" ? studentNavItems : adminNavItems;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90 data-[active=true]:hover:text-primary-foreground data-[active=true]:active:bg-primary/90 data-[active=true]:active:text-primary-foreground data-[active=true]:min-w-8 data-[active=true]:duration-200 data-[active=true]:ease-linear"
                  isActive={isActive}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

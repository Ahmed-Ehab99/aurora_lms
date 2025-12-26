import { NavMain } from "@/components/dashboard-layout/nav-main";
import { NavUser } from "@/components/dashboard-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/public/logo.webp";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  dashboardType: "admin" | "student";
}

export function AppSidebar({ dashboardType, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image src={Logo} alt="Logo" className="size-5 rounded-xl" />
                <span className="text-base font-semibold">AuroraLMS.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain dashboardType={dashboardType} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

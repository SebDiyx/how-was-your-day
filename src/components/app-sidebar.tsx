"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, MessageSquare } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-amber-50 border-r border-amber-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-800 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="hover:bg-amber-100 data-[active=true]:bg-amber-200 data-[active=true]:text-amber-900"
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-amber-700" />
                      <span className="text-amber-800">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

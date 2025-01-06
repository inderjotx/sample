"use client";

import * as React from "react";
import {
  Cable,
  Play,
  SlidersHorizontal,
  StickyNote,
  Users,
} from "lucide-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "BSE Socket Connection",
      url: "bse-socket-connection",
      icon: Cable,
      items: [
        {
          title: "API Configuration",
          url: "api-config",
          icon: SlidersHorizontal,
        },
        {
          title: "Test Configuration",
          url: "test-config",
          icon: StickyNote,
        },
        {
          title: "Execution",
          url: "execution",
          icon: Play,
        },
        {
          title: "Load Execution",
          url: "load-execution",
          icon: Users,
        },
      ],
    },
    {
      title: "BSE API Connection",
      url: "bse-api-connection",
      icon: Cable,
      items: [
        {
          title: "API Configuration",
          url: "api-config",
          icon: SlidersHorizontal,
        },
        {
          title: "Test Configuration",
          url: "test-config",
          icon: StickyNote,
        },
        {
          title: "Execution",
          url: "execution",
          icon: Play,
        },
        {
          title: "Load Execution",
          url: "load-execution",
          icon: Users,
        },
      ],
    },
    {
      title: "BSE Socket Connection 2",
      url: "bse-socket-connection-2",
      icon: Cable,
      items: [
        {
          title: "API Configuration",
          url: "api-config",
          icon: SlidersHorizontal,
        },
        {
          title: "Test Configuration",
          url: "test-config",
          icon: StickyNote,
        },
        {
          title: "Execution",
          url: "execution",
          icon: Play,
        },
        {
          title: "Load Execution",
          url: "load-execution",
          icon: Users,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

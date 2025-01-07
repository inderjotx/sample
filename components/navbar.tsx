"use client";

import { Button } from "@/components/ui/button";
import {
  Settings,
  Wrench,
  Play,
  Cog,
  FileText,
  Users,
  FolderGit2,
  Framer,
} from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const menuItems = [
    { label: "Configuration", icon: Settings, href: "/configuration" },
    { label: "Develop", icon: Wrench, href: "/develop" },
    { label: "Execution", icon: Play, href: "/execution" },
    { label: "Load Module", icon: Cog, href: "/load-module" },
    { label: "Reports", icon: FileText, href: "/reports" },
    { label: "LMR", icon: FileText, href: "/lmr" },
    { label: "User Management", icon: Users, href: "/user-management" },
    {
      label: "Project Management",
      icon: FolderGit2,
      href: "/project-management",
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 flex justify-between items-center px-4 ">
      <div className="flex items-center gap-2">
        <Framer />
        <span>Dashboard</span>
      </div>
      <div className="flex h-14 items-center px-4">
        <ul className="flex items-center space-x-8">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className=" bg-primary/10 hover:bg-primary/20"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm "
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

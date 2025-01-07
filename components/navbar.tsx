"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Settings,
  Wrench,
  Play,
  Cog,
  FileText,
  Users,
  FolderGit2,
  Framer,
  Menu,
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

  const NavItems = () => (
    <ul
      className={`flex flex-col items-start space-y-4 w-[260px] 
      lg:w-auto lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 xl:space-x-8`}
    >
      {menuItems.map((item) => (
        <li key={item.label} className="w-full lg:w-auto">
          <Button
            variant="ghost"
            className="bg-primary/10 hover:bg-primary/20 w-full lg:w-auto"
          >
            <Link
              href={item.href}
              className="flex items-center gap-2 text-sm w-full lg:w-auto"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        <Framer />
        <span>Dashboard</span>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <div className="mt-8 w-full">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex h-14 items-center">
        <NavItems />
      </div>
    </nav>
  );
}

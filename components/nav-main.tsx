"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
      icon: LucideIcon;
    }[];
  }[];
}) {
  const pathname = usePathname();

  const isParentActive = (baseUrl: string, parentUrl: string) => {
    const fullPath = `/${baseUrl}/${parentUrl}`;
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  };

  const isChildActive = (baseUrl: string, parentUrl: string, url: string) => {
    const fullPath = `/${baseUrl}/${parentUrl}/${url}`;
    return pathname === fullPath;
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isParentActive("dashboard", item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    isParentActive("dashboard", item.url)
                      ? "text-primary bg-primary/10 hover:bg-primary/20 data-[state=open]:hover:bg-primary/20 !hover:text-primary data-[state=closed]:hover:text-primary data-[state=open]:hover:text-primary  "
                      : ""
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="">
                <SidebarMenuSub className="border-none">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className={
                          isChildActive("dashboard", item.url, subItem.url)
                            ? "text-primary hover:text-primary bg-primary/10 hover:bg-primary/10"
                            : ""
                        }
                      >
                        <Link href={`/dashboard/${item.url}/${subItem.url}`}>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

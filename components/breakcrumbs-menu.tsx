"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbsMenu() {
  const pathname = usePathname();
  const breadcrumbs = pathname
    .split("/")
    .filter((path) => path !== "" && path !== "dashboard")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1));

  return (
    <Breadcrumb>
      <BreadcrumbList className="">
        {breadcrumbs.map((breadcrumb, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${breadcrumbs.slice(0, index + 1).join("/")}`}
                className="text-primary"
              >
                {breadcrumb}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="last:hidden" />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

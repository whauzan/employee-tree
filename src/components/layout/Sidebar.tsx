"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import React from "react";
import { Network, Users, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  url: string;
  isActive?: boolean;
}

const SIDEBAR_ITEMS: SidebarItemProps[] = [
  { label: "Home", icon: <Home />, url: "/" },
  { label: "Employees", icon: <Users />, url: "/employees" },
  { label: "Organizational Hierarchy", icon: <Network />, url: "/hierarchy" },
];

const SidebarItem = ({ label, icon, url, isActive }: SidebarItemProps) => {
  return (
    <Link href={url}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className="w-full justify-start gap-x-2"
      >
        {icon}
        <div className="max-w-sm truncate">{label}</div>
      </Button>
    </Link>
  );
};

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={cn(className)}>
      <div className="flex h-full flex-col justify-between">
        <div className="py-4">
          <div className="mb-4 flex h-10 items-center">
            <h2 className="flex px-7 text-lg font-semibold tracking-tight">
              Employee Tree
            </h2>
          </div>
          <div className="mt-4 space-y-1 px-3">
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarItem
                {...item}
                key={item.url}
                isActive={item.url === pathname}
              />
            ))}
          </div>
        </div>
        <div>
          <Separator />
          <div className="flex justify-center py-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Employee Tree
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

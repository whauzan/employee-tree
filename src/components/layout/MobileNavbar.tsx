"use client";

import { cn } from "@/lib/utils";
import { Home, Users, Network } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MobileNavbarProps {
  label: string;
  icon: React.ReactNode;
  url: string;
  dis: string;
  isActive?: boolean;
}

const MOBILE_NAVBAR_ITEMS: MobileNavbarProps[] = [
  {
    label: "Employees",
    icon: <Users className="z-10" />,
    url: "/employees",
    dis: "translate-x-0",
  },
  { label: "Home", icon: <Home />, url: "/", dis: "translate-x-16" },
  {
    label: "Hierarchy",
    icon: <Network />,
    url: "/hierarchy",
    dis: "translate-x-32",
  },
];

const MobileNavbar = () => {
  const pathName = usePathname();
  const active = MOBILE_NAVBAR_ITEMS.findIndex((item) => item.url === pathName);

  return (
    <nav className="fixed bottom-0 w-full rounded-t-xl bg-muted px-6 py-3 sm:hidden">
      <ul className="flex justify-between">
        {MOBILE_NAVBAR_ITEMS.map((item, index) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className={cn(
                "flex p-2 flex-col items-center",
                active === index
                  ? "text-white bg-primary rounded-md"
                  : "text-muted-foreground",
              )}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {/* <span className="text-xs">{item.label}</span> */}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;

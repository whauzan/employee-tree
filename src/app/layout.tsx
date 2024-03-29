import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ContextProvider } from "@/lib/provider";
import Sidebar from "@/components/layout/Sidebar";
import MobileNavbar from "@/components/layout/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Tree",
  description:
    "A web application that allows you to visualize the hierarchy of employees within an organization. It takes a list of employees, each with an ID, a manager ID, and a list of direct reports, and builds a tree structure that represents the hierarchy of the organization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <main className="relative min-h-screen bg-background">
            <div className="grid h-full lg:grid-cols-5">
              <Sidebar className="sticky top-0 hidden h-screen lg:block" />
              <section className="col-span-3 min-h-screen border-border bg-white lg:col-span-4 lg:mt-4 lg:min-h-[calc(100vh-1rem)] lg:rounded-tl-3xl lg:border-l lg:border-t">
                <div className="p-4 pb-24 sm:p-8">{children}</div>
              </section>
              <MobileNavbar />
            </div>
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}

import Sidebar from "@/app/(home)/_components/layout/Sidebar";
import SearchBar from "@/app/(home)/_components/layout/SearchBar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <SearchBar />
      <section className="min-h-screen flex-1 flex-col pt-24">
        <div className="w-full lg:max-w-[calc(100vw-20rem)]">{children}</div>
      </section>
      <Sidebar />
    </main>
  );
}

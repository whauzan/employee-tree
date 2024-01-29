"use client";

import React from "react";
import { Input } from "../../../../components/ui/Input";
import { useSearchParams } from "next/navigation";
import { useSearchInput } from "@/lib/hooks/useSearchInput";
import { useUpdateURL } from "@/lib/hooks/useUpdateURL";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("employee");
  const { search, handleInputChange } = useSearchInput(query);

  useUpdateURL(search);

  return (
    <div className="fixed z-50 flex w-full items-center justify-between gap-6 bg-white p-4">
      <Input
        placeholder="Search for an employee"
        onChange={handleInputChange}
        value={search}
        type="text"
      />
      <div>Profile</div>
    </div>
  );
};

export default SearchBar;

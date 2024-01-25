import React, { useState } from "react";

export const useSearchInput = (initialValue: string | null) => {
  const [search, setSearch] = useState(initialValue || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return { search, handleInputChange };
};

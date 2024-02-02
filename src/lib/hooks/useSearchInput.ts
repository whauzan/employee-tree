import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "../utils";

export const useSearchInput = (initialValue: string | null) => {
  const [search, setSearch] = useState(initialValue || "");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "employee",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (searchParams) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["employee"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, searchParams]);

  return { search, handleInputChange };
};

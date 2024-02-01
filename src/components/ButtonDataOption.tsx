"use client";

import { DATAMAP } from "@/lib/constant";
import React, { useCallback } from "react";
import { Button } from "./ui/Button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ButtonDataOptionProps {
  searchParams: { [key: string]: string | undefined };
}

const ButtonDataOption = ({ searchParams }: ButtonDataOptionProps) => {
  const router = useRouter();
  const activeData = searchParams?.data || "correct-data";

  const handleActiveData = useCallback(
    (url: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "data",
        value: url,
      });
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      {DATAMAP.map((item) => (
        <Button
          variant={item.url === activeData ? "default" : "outline"}
          key={item.label}
          onClick={() => handleActiveData(item.url)}
        >
          {item.label}
        </Button>
      ))}
    </>
  );
};

export default ButtonDataOption;

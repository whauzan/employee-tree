"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import React, { useCallback } from "react";
import { useEmployeeData } from "@/lib/hooks/useEmployeeData";
import { TabData } from "@/interfaces";
import EmployeeTree from "./contents/EmployeeTree";

interface TabContentDataProps {
  dataMap: TabData;
  searchParams: { [key: string]: string | undefined };
}

const TabContentData = ({ searchParams, dataMap }: TabContentDataProps) => {
  const { activeTab, setActiveTabHandler: setActiveTab } = useEmployeeData({
    searchParams,
    dataMap,
  });

  const handleValueChange = useCallback(
    (value: string) => {
      setActiveTab(value);
    },
    [setActiveTab],
  );

  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full"
      onValueChange={handleValueChange}
    >
      <div className="flex justify-center xl:px-10 2xl:px-20">
        <TabsList className="grid w-full grid-cols-3 ">
          {Object.entries(dataMap).map(([value, { label }]) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {Object.keys(dataMap).map((value) => (
        <TabsContent key={value} value={value}>
          <EmployeeTree />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabContentData;

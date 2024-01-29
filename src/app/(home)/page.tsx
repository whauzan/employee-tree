import TabContentData from "./_components/TabContentData";
import { SearchParamsProps, TabData } from "@/interfaces";
import correctEmployeeData from "@/data/correct-employees.json";
import faultyEmployeeData from "@/data/faulty-employees.json";
import anotherFaultyEmployeeData from "@/data/another-faulty-employees.json";

const dataMap: TabData = {
  "correct-data": {
    data: correctEmployeeData,
    label: "Correct Employee Data",
  },
  "faulty-data": { data: faultyEmployeeData, label: "Faulty Employee Data" },
  "another-faulty-data": {
    data: anotherFaultyEmployeeData,
    label: "Another Faulty Employee Data",
  },
};

export default function Home({ searchParams }: SearchParamsProps) {
  return (
    <div className="flex w-full items-center justify-center px-10">
      <TabContentData searchParams={searchParams} dataMap={dataMap} />
    </div>
  );
}

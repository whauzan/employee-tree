import React from "react";
import { SearchParamsProps } from "@/interfaces";
import ButtonDataOption from "@/components/ButtonDataOption";
import { getEmployees } from "@/lib/actions/getEmployees";
import DataTable from "@/app/employees/_components/table/DataTable";
import { columns } from "@/app/employees/_components/table/Columns";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const activeData = searchParams?.data || "correct-data";
  const employees = await getEmployees(activeData);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-primary">Our Employees</h3>
      <div className="flex gap-x-2">
        <ButtonDataOption searchParams={searchParams} />
      </div>
      <DataTable data={employees} columns={columns} />
    </div>
  );
};

export default Page;

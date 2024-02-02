import { SearchParamsProps } from "@/interfaces";
import ButtonDataOption from "@/components/ButtonDataOption";
import EmployeeTree from "@/app/hierarchy/_components/EmployeeTree";
import { getEmployees } from "@/lib/actions/getEmployees";
import EmployeeInfo from "./_components/EmployeeInfo";

export default async function Page({ searchParams }: SearchParamsProps) {
  const activeData = searchParams?.data || "correct-data";
  const employees = await getEmployees(activeData);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-primary">
        Organizational Hierarchy
      </h3>
      <div className="flex gap-x-2">
        <ButtonDataOption searchParams={searchParams} />
      </div>
      <EmployeeTree searchParams={searchParams} employees={employees} />
      <EmployeeInfo />
    </div>
  );
}

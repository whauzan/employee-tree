import { useEffect, useMemo, useState } from "react";
import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { fetchEmployeeData } from "@/lib/FetchEmployeeData";
import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import { TabData } from "@/interfaces";
import { formUrlQuery } from "../utils";
import { useRouter } from "next/navigation";

interface UseEmployeeDataProps {
  dataMap: TabData;
  searchParams: { [key: string]: string | undefined };
}

export const useEmployeeData = ({
  searchParams,
  dataMap,
}: UseEmployeeDataProps) => {
  const activeTab = searchParams.tabs || "correct-data";
  const { dispatch } = useEmployeeContext();
  const router = useRouter();

  const [state, setState] = useState({
    active: activeTab,
    activeData: dataMap[activeTab].data,
  });

  const setActiveTabHandler = (tab: string) => {
    const newActiveData = dataMap[tab].data;
    setState({ active: tab, activeData: newActiveData });

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "tabs",
      value: tab,
    });
    router.push(newUrl, { scroll: false });
  };

  const employees = useMemo(
    () =>
      state.activeData.map(
        (employee) =>
          new Employee(employee.name, {
            id: employee.id,
            managerId: employee.managerId,
            position: employee.position,
            bio: employee.bio,
            profilePic: employee.profilePic,
          }),
      ),
    [state.activeData],
  );

  const employeeService = useMemo(
    () => new EmployeeService(employees),
    [employees],
  );

  useEffect(() => {
    fetchEmployeeData(searchParams, employeeService, dispatch);
  }, [state.active, searchParams, employeeService, dispatch]);

  return { activeTab, setActiveTabHandler, dataMap };
};

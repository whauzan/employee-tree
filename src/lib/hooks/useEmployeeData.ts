import { useCallback, useEffect, useRef, useState } from "react";
import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { fetchEmployeeData } from "@/lib/FetchEmployeeData";
import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import { TabData } from "@/interfaces";
import { formUrlQuery } from "../utils";
import { useRouter } from "next/navigation";
import { useErrorContext } from "./useErrorContext";

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
  const { setError } = useErrorContext();

  const activeRef = useRef(activeTab);
  const [activeData, setActiveData] = useState(dataMap[activeTab].data);

  const setActiveTabHandler = useCallback(
    (tab: string) => {
      const newActiveData = dataMap[tab].data;
      setActiveData(newActiveData);
      activeRef.current = tab;

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "tabs",
        value: tab,
      });
      router.push(newUrl, { scroll: false });
    },
    [dataMap, searchParams, router],
  );

  const [employeeService, setEmployeeService] =
    useState<EmployeeService | null>(null);

  useEffect(() => {
    const employees = activeData.map(
      (employee) =>
        new Employee(employee.name, {
          id: employee.id,
          managerId: employee.managerId,
          position: employee.position,
          bio: employee.bio,
          profilePic: employee.profilePic,
        }),
    );

    try {
      const service = new EmployeeService(employees);
      setEmployeeService(service);
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
  }, [activeData, setError]);

  useEffect(() => {
    if (employeeService) {
      fetchEmployeeData(searchParams, employeeService, dispatch);
    }
  }, [searchParams, employeeService, dispatch]);

  return { activeTab, setActiveTabHandler, dataMap };
};

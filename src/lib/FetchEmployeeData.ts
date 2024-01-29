import { Dispatch } from "react";
import { EmployeeService } from "@/services/Employee";
import { Action } from "./reducer/EmployeeReducer";
import { EmployeeState } from "@/interfaces/Employee";

const createPayload = (
  employeeService: EmployeeService,
  employeeName?: string,
) => {
  const foundEmployee = employeeName
    ? employeeService.searchEmployee(employeeName)
    : null;
  const employeeId = foundEmployee?.attributes.id;

  return [
    {
      employeeTree: employeeService.getEmployeeTree(employeeName),
      employee: foundEmployee,
      totalDirectReports: employeeId
        ? employeeService.getDirectReportsCount(employeeId)
        : 0,
      totalIndirectReports: employeeId
        ? employeeService.getIndirectReportsCount(employeeId)
        : 0,
      totalReports: employeeId
        ? employeeService.getTotalReports(employeeId)
        : 0,
    },
  ];
};

export const fetchEmployeeData = (
  searchParams: { [key: string]: string | undefined },
  employeeService: EmployeeService,
  dispatch: Dispatch<Action>,
) => {
  const payload: EmployeeState[] = createPayload(
    employeeService,
    searchParams?.employee,
  ).map((item) => ({
    ...item,
    employee: item.employee || null,
  }));
  dispatch({
    type: "SET_EMPLOYEE_INFO",
    payload,
  });
};

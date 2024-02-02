"use client";

import { Employee as EmployeeSchema } from "@/data/schema";
import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { useEmployeeContext } from "./useEmployeeContext";
import { useErrorContext } from "./useErrorContext";
import { useEffect, useState } from "react";
import { fetchEmployeeData } from "../FetchEmployeeData";

interface UseEmployeeTreeProps {
  employees: EmployeeSchema[];
  searchParams: { [key: string]: string | undefined };
}

export const useEmployeeTree = ({
  employees,
  searchParams,
}: UseEmployeeTreeProps) => {
  const { dispatch } = useEmployeeContext();
  const { setError } = useErrorContext();
  const [employeeService, setEmployeeService] =
    useState<EmployeeService | null>(null);

  useEffect(() => {
    const employeeModel = employees.map(
      (employee) =>
        new Employee(employee.name, {
          id: employee.id,
          managerId: employee.managerId,
          position: employee.position,
          bio: employee.bio,
          profilePic: employee.profilePic,
          department: employee.department,
        }),
    );

    try {
      const service = new EmployeeService(employeeModel);
      setEmployeeService(service);
      setError(null);
    } catch (error) {
      setError(error as Error);
    }
  }, [employees, setError]);

  useEffect(() => {
    if (employeeService) {
      fetchEmployeeData(searchParams, employeeService, dispatch);
    }
  }, [searchParams, employeeService, dispatch]);
};

"use client";

import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { useState } from "react";
import correctEmployeeData from "@/data/correct-employees.json";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState<{
    employee?: Employee;
    managerChain?: Employee[];
    totalDirectReports?: number;
    totalIndirectReports?: number;
    totalReports?: number;
  }>({});

  const employees = correctEmployeeData.map(
    (employee) => new Employee(employee.id, employee.name, employee.managerId),
  );

  const employeeService = new EmployeeService(employees);

  const handleSearch = () => {
    const foundEmployee = employeeService.searchEmployee(searchTerm);
    if (foundEmployee) {
      setEmployeeInfo({
        employee: foundEmployee,
        managerChain: employeeService.getManagerChain(foundEmployee.id),
        totalDirectReports: employeeService.getDirectReportsCount(
          foundEmployee.id,
        ),
        totalIndirectReports: employeeService.getIndirectReportsCount(
          foundEmployee.id,
        ),
        totalReports: employeeService.getTotalReports(foundEmployee.id),
      });
    } else {
      // Handle the case where the employee is not found
      setEmployeeInfo({});
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2>Employee Tree</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Employee"
        className="text-black"
      />
      <button onClick={handleSearch}>Search</button>

      {employeeInfo.employee && (
        <div>
          <h2>Employee Details</h2>
          <p>Name: {employeeInfo.employee.name}</p>
          <p>
            Manager Chain:{" "}
            {employeeInfo.managerChain
              ?.map((manager) => manager.name)
              .join(", ")}
          </p>
          <p>Total Direct Reports: {employeeInfo.totalDirectReports}</p>
          <p>Total Indirect Reports: {employeeInfo.totalIndirectReports}</p>
          <p>Total Reports: {employeeInfo.totalReports}</p>
        </div>
      )}
    </main>
  );
}

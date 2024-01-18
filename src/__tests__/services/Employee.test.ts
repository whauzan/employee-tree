import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { describe, expect, test } from "@jest/globals";

const mockData: Employee[] = [
  new Employee(1, "raelynn", null),
  new Employee(2, "darin", 1),
  new Employee(3, "kacie", 1),
  new Employee(4, "jordana", 2),
  new Employee(5, "everett", 2),
  new Employee(6, "bertha", 2),
  new Employee(7, "peg", 3),
  new Employee(8, "hugh", 3),
  new Employee(9, "eveleen", 3),
  new Employee(10, "evelina", 9),
];

const employeeService = new EmployeeService(mockData);

describe("EmployeeService", () => {
  describe("getDirectReportsCount Method", () => {
    test("returns correct count for an employee with direct reports", () => {
      const directReportsCount = employeeService.getDirectReportsCount(1); // Assuming employee with ID 1 has direct reports
      expect(directReportsCount).toBe(2);
    });

    test("returns 0 for an employee with no direct reports", () => {
      const directReportsCount = employeeService.getDirectReportsCount(10); // Assuming employee with ID 10 has no direct reports
      expect(directReportsCount).toBe(0);
    });
  });

  describe("getIndirectReportsCount Method", () => {
    test("returns correct count for an employee with indirect reports", () => {
      const indirectReportsCount = employeeService.getIndirectReportsCount(1); // Assuming employee with ID 1 has indirect reports
      expect(indirectReportsCount).toBe(7);
    });

    test("returns 0 for an employee with no indirect reports", () => {
      const indirectReportsCount = employeeService.getIndirectReportsCount(10); // Assuming employee with ID 10 has no indirect reports
      expect(indirectReportsCount).toBe(0);
    });
  });

  describe("getTotalReports Method", () => {
    test("returns correct count for an employee with direct and indirect reports", () => {
      const totalReports = employeeService.getTotalReports(1); // Assuming employee with ID 1 has direct and indirect reports
      expect(totalReports).toBe(9);
    });

    test("returns 0 for an employee with no direct and indirect reports", () => {
      const totalReports = employeeService.getTotalReports(10); // Assuming employee with ID 10 has no direct and indirect reports
      expect(totalReports).toBe(0);
    });
  });
});

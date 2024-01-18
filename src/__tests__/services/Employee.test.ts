import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("EmployeeService", () => {
  let employeeSercice: EmployeeService;
  let mockData: Employee[];

  beforeEach(() => {
    // Setup mock data
    mockData = [new Employee(1, "Raelynn", null), new Employee(2, "Darin", 1)];
    employeeSercice = new EmployeeService(mockData);
  });

  test("getDirectReportsCount returns correct count", () => {
    const directReportsCount = employeeSercice.getDirectReportsCount(1);
    expect(directReportsCount).toBe(1);
  });
});

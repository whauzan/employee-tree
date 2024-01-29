import { Employee } from "@/models/Employee";
import { EmployeeService } from "@/services/Employee";
import { beforeEach, describe, expect, test } from "@jest/globals";

const EMPLOYEE_ID_WITH_REPORTS = 1;
const EMPLOYEE_ID_WITHOUT_REPORTS = 10;
const NON_EXISTENT_EMPLOYEE_ID = 11;
const EXISTING_EMPLOYEE_NAME = "eveleen";
const NON_EXISTENT_EMPLOYEE_NAME = "john";

let employeeService: EmployeeService;

beforeEach(() => {
  const mockData: Employee[] = [
    new Employee("raelynn", {
      id: 1,
      managerId: null,
      position: "CEO",
      bio: "CEO",
      profilePic: "",
    }),
    new Employee("darin", {
      id: 2,
      managerId: 1,
      position: "CTO",
      bio: "CTO",
      profilePic: "",
    }),
    new Employee("kacie", {
      id: 3,
      managerId: 1,
      position: "CFO",
      bio: "CFO",
      profilePic: "",
    }),
    new Employee("jordana", {
      id: 4,
      managerId: 2,
      position: "VP of Engineering",
      bio: "VP of Engineering",
      profilePic: "",
    }),
    new Employee("everett", {
      id: 5,
      managerId: 2,
      position: "Software Engineer",
      bio: "Software Engineer",
      profilePic: "",
    }),
    new Employee("bertha", {
      id: 6,
      managerId: 2,
      position: "Software Engineer",
      bio: "Software Engineer",
      profilePic: "",
    }),
    new Employee("peg", {
      id: 7,
      managerId: 3,
      position: "Financial Analyst",
      bio: "Financial Analyst",
      profilePic: "",
    }),
    new Employee("hugh", {
      id: 8,
      managerId: 3,
      position: "Accountant",
      bio: "Accountant",
      profilePic: "",
    }),
    new Employee("eveleen", {
      id: 9,
      managerId: 3,
      position: "Financial Adviser",
      bio: "Financial Adviser",
      profilePic: "",
    }),
    new Employee("evelina", {
      id: 10,
      managerId: 9,
      position: "Junior Financial Adviser",
      bio: "Junior Financial Adviser",
      profilePic: "",
    }),
  ];

  employeeService = new EmployeeService(mockData);
});

describe("EmployeeService", () => {
  describe("getDirectReportsCount Method", () => {
    test("returns correct count for an employee with direct reports", () => {
      const directReportsCount = employeeService.getDirectReportsCount(
        EMPLOYEE_ID_WITH_REPORTS,
      ); // Assuming employee with ID 1 has direct reports
      expect(directReportsCount).toBe(2);
    });

    test("returns 0 for an employee with no direct reports", () => {
      const directReportsCount = employeeService.getDirectReportsCount(
        EMPLOYEE_ID_WITHOUT_REPORTS,
      ); // Assuming employee with ID 10 has no direct reports
      expect(directReportsCount).toBe(0);
    });

    test("returns 0 for an employee with an id that does not exist", () => {
      const directReportsCount = employeeService.getDirectReportsCount(
        NON_EXISTENT_EMPLOYEE_ID,
      ); // Assuming employee with ID 11 does not exist
      expect(directReportsCount).toBe(0);
    });
  });

  describe("getIndirectReportsCount Method", () => {
    test("returns correct count for an employee with indirect reports", () => {
      const indirectReportsCount = employeeService.getIndirectReportsCount(
        EMPLOYEE_ID_WITH_REPORTS,
      ); // Assuming employee with ID 1 has indirect reports
      expect(indirectReportsCount).toBe(7);
    });

    test("returns 0 for an employee with no indirect reports", () => {
      const indirectReportsCount = employeeService.getIndirectReportsCount(
        EMPLOYEE_ID_WITHOUT_REPORTS,
      ); // Assuming employee with ID 10 has no indirect reports
      expect(indirectReportsCount).toBe(0);
    });

    test("returns 0 for an employee with an id that does not exist", () => {
      const indirectReportsCount = employeeService.getIndirectReportsCount(
        NON_EXISTENT_EMPLOYEE_ID,
      ); // Assuming employee with ID 11 does not exist
      expect(indirectReportsCount).toBe(0);
    });
  });

  describe("getTotalReports Method", () => {
    test("returns correct count for an employee with direct and indirect reports", () => {
      const totalReports = employeeService.getTotalReports(
        EMPLOYEE_ID_WITH_REPORTS,
      ); // Assuming employee with ID 1 has direct and indirect reports
      expect(totalReports).toBe(9);
    });

    test("returns 0 for an employee with no direct and indirect reports", () => {
      const totalReports = employeeService.getTotalReports(
        EMPLOYEE_ID_WITHOUT_REPORTS,
      ); // Assuming employee with ID 10 has no direct and indirect reports
      expect(totalReports).toBe(0);
    });

    test("returns 0 for an employee with an id that does not exist", () => {
      const totalReports = employeeService.getTotalReports(
        NON_EXISTENT_EMPLOYEE_ID,
      ); // Assuming employee with ID 11 does not exist
      expect(totalReports).toBe(0);
    });
  });

  describe("searchEmployee Method", () => {
    test("returns correct employee for a given name", () => {
      const employee = employeeService.searchEmployee(EXISTING_EMPLOYEE_NAME);
      expect(employee).toEqual(
        expect.objectContaining({
          name: "eveleen",
          attributes: {
            id: 9,
            managerId: 3,
            position: "Financial Adviser",
            bio: "Financial Adviser",
            profilePic: "",
          },
          children: expect.arrayContaining([
            expect.objectContaining({
              name: "evelina",
              attributes: {
                id: 10,
                managerId: 9,
                position: "Junior Financial Adviser",
                bio: "Junior Financial Adviser",
                profilePic: "",
              },
            }),
          ]),
        }),
      );
    });

    test("returns undefined for a given name that does not exist", () => {
      const employee = employeeService.searchEmployee(
        NON_EXISTENT_EMPLOYEE_NAME,
      ); // Assuming employee with name "john" does not exist
      expect(employee).toBeUndefined();
    });
  });

  describe("getEmployeeTree Method", () => {
    test("returns correct employee tree for a given name", () => {
      const employeeTree = employeeService.getEmployeeTree(
        EXISTING_EMPLOYEE_NAME,
      );

      expect(employeeTree).toEqual(
        expect.objectContaining({
          name: "raelynn",
          attributes: {
            id: 1,
            managerId: "",
            position: "CEO",
            bio: "CEO",
            profilePic: "",
          },
          children: [
            {
              name: "kacie",
              attributes: {
                id: 3,
                managerId: 1,
                position: "CFO",
                bio: "CFO",
                profilePic: "",
              },
              children: [
                {
                  name: "eveleen",
                  attributes: {
                    id: 9,
                    managerId: 3,
                    position: "Financial Adviser",
                    bio: "Financial Adviser",
                    profilePic: "",
                  },
                  children: [],
                },
              ],
            },
          ],
        }),
      );
    });

    test("returns root employee tree for a non-existent name", () => {
      const employeeTree = employeeService.getEmployeeTree(
        NON_EXISTENT_EMPLOYEE_NAME,
      );
      expect(employeeTree).toEqual(
        expect.objectContaining({
          name: "raelynn",
          attributes: {
            id: 1,
            managerId: "",
            position: "CEO",
            bio: "CEO",
            profilePic: "",
          },
        }),
      );
    });

    test("returns root employee tree when no name is provided", () => {
      const employeeTree = employeeService.getEmployeeTree();
      expect(employeeTree).toEqual(
        expect.objectContaining({
          name: "raelynn",
          attributes: {
            id: 1,
            managerId: "",
            position: "CEO",
            bio: "CEO",
            profilePic: "",
          },
        }),
      );
    });
  });

  describe("EmployeeTreeBuilder", () => {
    test("should throw an error when there are employees without hierarchy", () => {
      const employees = [
        new Employee("Employee 1", {
          id: 1,
          managerId: null,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 2", {
          id: 2,
          managerId: 1,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 3", {
          id: 3,
          managerId: 1,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 4", {
          id: 4,
          managerId: null,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 5", {
          id: 5,
          managerId: null,
          position: "",
          bio: "",
          profilePic: "",
        }),
      ];

      expect(() => new EmployeeService(employees)).toThrowError(
        new Error(
          "Unable to process employee hierarchy. Employee 4, Employee 5 not having hierarchy",
        ),
      );
    });

    test("should throw an error when an employee reports to multiple superiors", () => {
      const employees = [
        new Employee("Employee 1", {
          id: 1,
          managerId: null,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 2", {
          id: 2,
          managerId: 1,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 3", {
          id: 3,
          managerId: 1,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 4", {
          id: 4,
          managerId: 2,
          position: "",
          bio: "",
          profilePic: "",
        }),
        new Employee("Employee 4", {
          id: 4,
          managerId: 3,
          position: "",
          bio: "",
          profilePic: "",
        }),
      ];

      expect(() => new EmployeeService(employees)).toThrowError(
        new Error(
          "Hierarchy error: Employee 4 reports to multiple superiors: Employee 2, Employee 3.",
        ),
      );
    });
  });
});

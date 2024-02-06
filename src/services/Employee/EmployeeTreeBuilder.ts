/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";

export class EmployeeTreeBuilder {
  constructor(private employees: Employee[]) {}

  build(): Employee {
    const employeeMap = this.employees.reduce((map, employee) => {
      map.set(employee.attributes.id, employee);
      return map;
    }, new Map<number, Employee>());

    const root = this.employees.find(
      (employee) => !employee.attributes.managerId,
    );
    if (!root) {
      throw new Error("No root employee found");
    }

    this.buildTree(root, employeeMap);

    return root;
  }

  private buildTree(employee: Employee, employeeMap: Map<number, Employee>) {
    const directReports = this.employees.filter(
      (e) => e.attributes.managerId === employee.attributes.id,
    );
    directReports.forEach((report) => {
      if (
        !employee.children.some(
          (child) => child.attributes.id === report.attributes.id,
        )
      ) {
        employee.children.push(report);
      }
      this.buildTree(report, employeeMap);
    });
  }
}

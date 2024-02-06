/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";

export class EmployeeHierarchyChecker {
  constructor(private employees: Employee[]) {}

  checkForIssues(root: Employee) {
    const employeesWithoutConnection = new Set<string>();
    const employeeMap = this.employees.reduce((map, employee) => {
      map.set(employee.attributes.id, employee);
      return map;
    }, new Map<number, Employee>());

    this.employees.forEach((employee) => {
      if (employee.attributes.id === employee.attributes.managerId) {
        throw new Error(
          `Employee ${employee.name} reports to self. Please correct the hierarchy.`,
        );
      }

      if (
        !employee.attributes.managerId &&
        employee !== root &&
        employee.children.length === 0
      ) {
        employeesWithoutConnection.add(employee.name);
      }

      if (this.hasCircularReference(employee, employeeMap)) {
        throw new Error(
          `Circular reference detected for employee ${employee.name}. Please correct the hierarchy.`,
        );
      }
    });

    if (employeesWithoutConnection.size > 0) {
      throw new Error(
        `Unable to process employee hierarchy. ${Array.from(employeesWithoutConnection).join(", ")} not having hierarchy`,
      );
    }
  }

  private hasCircularReference(
    employee: Employee,
    employeeMap: Map<number, Employee>,
  ): boolean {
    let currentManagerId = employee.attributes.managerId;
    const visited = new Set<number>();

    while (currentManagerId) {
      if (visited.has(currentManagerId)) {
        return true;
      }

      visited.add(currentManagerId);
      const currentManager = employeeMap.get(currentManagerId);
      if (!currentManager) {
        throw new Error(
          `Manager with id ${currentManagerId} does not exist for employee ${employee.name}. Please correct the hierarchy.`,
        );
      }

      currentManagerId = currentManager.attributes.managerId;
    }

    return false;
  }
}

/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";

export class ManagerChecker {
  constructor(private employees: Employee[]) {}

  checkForMultipleManagers() {
    const managerMap = new Map<number, Set<number>>();

    this.employees.forEach((employee) => {
      if (!managerMap.has(employee.attributes.id)) {
        managerMap.set(employee.attributes.id, new Set());
      }
      if (employee.attributes.managerId !== null) {
        managerMap
          .get(employee.attributes.id)
          ?.add(employee.attributes.managerId);
      }
    });

    managerMap.forEach((managers, employeeId) => {
      if (managers.size > 1) {
        const employee = this.employees.find(
          (e) => e.attributes.id === employeeId,
        );
        const managerNames = Array.from(managers)
          .map(
            (managerId) =>
              this.employees.find((e) => e.attributes.id === managerId)?.name,
          )
          .filter((name) => name !== undefined) as string[];
        throw new Error(
          `Hierarchy error: ${employee?.name} reports to multiple superiors: ${managerNames.join(", ")}.`,
        );
      }
    });
  }
}

/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";
import { RawNodeDatum } from "react-d3-tree";

class EmployeeTreeBuilder {
  constructor(private employees: Employee[]) {}

  build(): Employee {
    const employeeMap = new Map<number, Employee>();
    const employeesWithoutConnections = new Set<string>();

    // Create a map of all employees
    this.employees.forEach((employee) => {
      employeeMap.set(
        employee.attributes.id,
        new Employee(employee.name, employee.attributes),
      );
    });

    // Build the tree structure
    employeeMap.forEach((employee) => {
      if (employee.attributes.managerId !== null) {
        const manager = employeeMap.get(employee.attributes.managerId);
        if (manager !== undefined) {
          manager.children.push(employee);
        }
      } else {
        employeesWithoutConnections.add(employee.name);
      }
    });

    // Remove employees who have direct reports
    employeeMap.forEach((employee) => {
      if (employee.children.length > 0) {
        employeesWithoutConnections.delete(employee.name);
      }
    });

    // Check if there are multiple employees without a manager
    if (employeesWithoutConnections.size > 1) {
      const names = Array.from(employeesWithoutConnections).join(", ");
      throw new Error(
        `Unable to process employee hierarchy. ${names} not having hierarchy`,
      );
    }

    // Find the root node (employee without a manager)
    return Array.from(employeeMap.values()).find(
      (employee) => !employee.attributes.managerId,
    ) as Employee;
  }
}

class ManagerChecker {
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

class EmployeeSearcher {
  constructor(private root: Employee) {}

  byName(name: string): Employee | undefined {
    return this.recursiveSearch(this.root, name);
  }

  byId(id: number): Employee | undefined {
    return this.findEmployeeById(id, this.root);
  }

  private recursiveSearch(node: Employee, name: string): Employee | undefined {
    if (node.name.toLowerCase() === name.toLowerCase()) {
      return node;
    }

    for (const child of node.children) {
      const found = this.recursiveSearch(child, name);
      if (found) return found;
    }

    return undefined;
  }

  private findEmployeeById(
    employeeId: number,
    node: Employee,
  ): Employee | undefined {
    if (node.attributes.id === employeeId) {
      return node;
    }

    for (const child of node.children) {
      const found = this.findEmployeeById(employeeId, child);
      if (found) return found;
    }

    return undefined;
  }
}

class ManagerChainBuilder {
  constructor(private searcher: EmployeeSearcher) {}

  build(name: string): RawNodeDatum | null {
    const employee = this.searcher.byName(name);
    if (!employee) {
      return null;
    }

    const managerChain: RawNodeDatum[] = [];

    let currentEmployee = employee;
    while (currentEmployee) {
      managerChain.push({
        name: currentEmployee.name,
        attributes: {
          id: currentEmployee.attributes.id,
          managerId: currentEmployee.attributes.managerId ?? "",
          position: currentEmployee.attributes.position,
          bio: currentEmployee.attributes.bio,
          profilePic: currentEmployee.attributes.profilePic,
        },
        children: [],
      });

      currentEmployee = currentEmployee.attributes.managerId
        ? (this.searcher.byId(currentEmployee.attributes.managerId) as Employee)
        : null!;
    }

    // Reverse the manager chain and build the hierarchy
    managerChain.reverse().reduce((prev, curr) => {
      prev.children = [curr];
      return curr;
    });

    return managerChain[0];
  }
}

class ReportCounter {
  constructor(private root: Employee) {}

  getTotal(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.root);
    return employee ? this.countAllReports(employee) : 0;
  }

  getDirect(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.root);
    return employee ? employee.children.length : 0;
  }

  getIndirect(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.root);
    return employee
      ? this.countAllReports(employee) - this.getDirect(employeeId)
      : 0;
  }

  private findEmployeeById(
    employeeId: number,
    node: Employee,
  ): Employee | undefined {
    if (node.attributes.id === employeeId) {
      return node;
    }

    for (const child of node.children) {
      const found = this.findEmployeeById(employeeId, child);
      if (found) return found;
    }

    return undefined;
  }

  private countAllReports(employee: Employee): number {
    return employee.children.reduce(
      (count, child) => count + 1 + this.countAllReports(child),
      0,
    );
  }
}

export class EmployeeService {
  private treeBuilder: EmployeeTreeBuilder;
  private managerChecker: ManagerChecker;
  private searcher: EmployeeSearcher;
  private chainBuilder: ManagerChainBuilder;
  private counter: ReportCounter;

  constructor(private employees: Employee[]) {
    this.managerChecker = new ManagerChecker(employees);
    this.managerChecker.checkForMultipleManagers();
    this.treeBuilder = new EmployeeTreeBuilder(employees);
    const root = this.treeBuilder.build();
    this.searcher = new EmployeeSearcher(root);
    this.chainBuilder = new ManagerChainBuilder(this.searcher);
    this.counter = new ReportCounter(root);
  }

  getEmployeeTree(name?: string): RawNodeDatum {
    if (name) {
      const result = this.chainBuilder.build(name);
      if (result !== null) {
        return result;
      }
    }
    return this.treeBuilder.build().toRawNodeDatum();
  }

  searchEmployee(name: string): Employee | undefined {
    return this.searcher.byName(name);
  }

  getTotalReports(employeeId: number): number {
    return this.counter.getTotal(employeeId);
  }

  getDirectReportsCount(employeeId: number): number {
    return this.counter.getDirect(employeeId);
  }

  getIndirectReportsCount(employeeId: number): number {
    return this.counter.getIndirect(employeeId);
  }
}

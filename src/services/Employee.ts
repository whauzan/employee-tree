/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";
import { RawNodeDatum } from "react-d3-tree";

class EmployeeTreeBuilder {
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

class EmployeeHierarchyChecker {
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
  constructor(
    private root: Employee,
    private searcher: EmployeeSearcher,
  ) {}

  getTotal(employeeId: number): number {
    const employee = this.searcher.byId(employeeId);
    return employee ? this.countAllReports(employee) : 0;
  }

  getDirect(employeeId: number): number {
    const employee = this.searcher.byId(employeeId);
    return employee ? employee.children.length : 0;
  }

  getIndirect(employeeId: number): number {
    const employee = this.searcher.byId(employeeId);
    return employee
      ? this.countAllReports(employee) - this.getDirect(employeeId)
      : 0;
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
  private hierarchyChecker: EmployeeHierarchyChecker;
  private managerChecker: ManagerChecker;
  private searcher: EmployeeSearcher;
  private chainBuilder: ManagerChainBuilder;
  private counter: ReportCounter;

  constructor(private employees: Employee[]) {
    this.managerChecker = new ManagerChecker(employees);
    this.managerChecker.checkForMultipleManagers();
    this.treeBuilder = new EmployeeTreeBuilder(employees);
    const root = this.treeBuilder.build();
    this.hierarchyChecker = new EmployeeHierarchyChecker(employees);
    this.hierarchyChecker.checkForIssues(root);
    this.searcher = new EmployeeSearcher(root);
    this.chainBuilder = new ManagerChainBuilder(this.searcher);
    this.counter = new ReportCounter(root, this.searcher);
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

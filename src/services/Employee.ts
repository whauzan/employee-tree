import { Employee } from "@/models/Employee";

export class EmployeeService {
  private employeeTree: Employee;

  constructor(private employees: Employee[]) {
    this.employeeTree = this.buildTree();
  }

  private buildTree(): Employee {
    const employeeMap = new Map<number, Employee>();

    // Create a map of all employees
    this.employees.forEach((employee) => {
      employeeMap.set(
        employee.id,
        new Employee(employee.id, employee.name, employee.managerId),
      );
    });

    // Build the tree structure
    employeeMap.forEach((employee) => {
      if (employee.managerId !== null) {
        const manager = employeeMap.get(employee.managerId);
        if (manager !== undefined) {
          manager.children.push(employee);
        }
      }
    });

    // Find the root node (employee without a manager)
    return Array.from(employeeMap.values()).find(
      (employee) => !employee.managerId,
    ) as Employee;
  }

  searchEmployee(name: string): Employee | undefined {
    return this.recursiveSearch(this.employeeTree, name);
  }

  getManagerChain(employeeId: number): Employee[] {
    const employee = this.findEmployeeById(employeeId, this.employeeTree);
    return employee ? this.buildManagerChain(employee, []) : [];
  }

  getTotalReports(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.employeeTree);
    return employee ? this.countAllReports(employee) : 0;
  }

  getDirectReportsCount(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.employeeTree);
    return employee ? employee.children.length : 0;
  }

  getIndirectReportsCount(employeeId: number): number {
    const employee = this.findEmployeeById(employeeId, this.employeeTree);
    return employee
      ? this.countAllReports(employee) - this.getDirectReportsCount(employeeId)
      : 0;
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
    if (node.id === employeeId) {
      return node;
    }

    for (const child of node.children) {
      const found = this.findEmployeeById(employeeId, child);
      if (found) return found;
    }

    return undefined;
  }

  private buildManagerChain(employee: Employee, chain: Employee[]): Employee[] {
    if (!employee.managerId) {
      return chain;
    }

    const manager = this.findEmployeeById(
      employee.managerId,
      this.employeeTree,
    );
    if (manager) {
      chain.push(new Employee(manager.id, manager.name, manager.managerId));
      return this.buildManagerChain(manager, chain);
    }

    return chain;
  }

  private countAllReports(employee: Employee): number {
    return employee.children.reduce(
      (count, child) => count + 1 + this.countAllReports(child),
      0,
    );
  }
}

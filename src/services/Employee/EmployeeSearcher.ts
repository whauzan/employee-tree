/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";

export class EmployeeSearcher {
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

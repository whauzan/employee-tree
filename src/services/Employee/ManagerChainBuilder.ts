/* eslint-disable no-useless-constructor */
import { RawNodeDatum } from "react-d3-tree";
import { EmployeeSearcher } from "./EmployeeSearcher";
import { Employee } from "@/models/Employee";

export class ManagerChainBuilder {
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
          department: currentEmployee.attributes.department,
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

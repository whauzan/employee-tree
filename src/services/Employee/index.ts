/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";
import { RawNodeDatum } from "react-d3-tree";
import { EmployeeTreeBuilder } from "./EmployeeTreeBuilder";
import { EmployeeHierarchyChecker } from "./EmployeeHierarchyChecker";
import { ManagerChecker } from "./ManagerChecker";
import { EmployeeSearcher } from "./EmployeeSearcher";
import { ManagerChainBuilder } from "./ManagerChainBuilder";
import { ReportCounter } from "./ReportCounter";

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

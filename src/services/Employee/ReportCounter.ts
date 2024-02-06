/* eslint-disable no-useless-constructor */
import { Employee } from "@/models/Employee";
import { EmployeeSearcher } from "./EmployeeSearcher";

export class ReportCounter {
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

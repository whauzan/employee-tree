import { IEmployee } from "@/interfaces/Employee";

type EmployeeType = IEmployee & { children: EmployeeType[] };

export class Employee implements IEmployee {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: number,
    public name: string,
    public managerId: number | null,
    public children: EmployeeType[] = [],
  ) {}
}

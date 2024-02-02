import { Employee } from "@/models/Employee";
import { RawNodeDatum } from "react-d3-tree";

export interface IEmployee {
  name: string;
  attributes: {
    id: number;
    managerId: number | null;
    position: string;
    bio: string;
    profilePic: string;
    department: string;
  };
}

export interface EmployeeState {
  employeeTree: RawNodeDatum | undefined;
  employee: Employee | null;
  totalDirectReports: number;
  totalIndirectReports: number;
  totalReports: number;
}

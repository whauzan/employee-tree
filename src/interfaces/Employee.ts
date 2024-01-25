import { Employee } from "@/models/Employee";

export interface IEmployee {
  name: string;
  attributes: {
    id: number;
    managerId: number | null;
    position: string;
    bio: string;
    profilePic: string;
  };
}

export interface EmployeeState {
  employee: Employee | null;
  totalDirectReports: number;
  totalIndirectReports: number;
  totalReports: number;
}

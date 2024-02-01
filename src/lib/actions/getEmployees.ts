import { promises as fs } from "fs";
import path from "path";
import { DATAMAP } from "../constant";
import { z } from "zod";
import { employeeSchema } from "@/data/schema";

// Simulate fetching data from a file
export async function getEmployees(url: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), DATAMAP.find((d) => d.url === url)?.path || ""),
  );

  const employees = JSON.parse(data.toString());

  const employeesMap = employees.map((employee: any) => {
    const manager = employees.find((e: any) => e.id === employee.managerId);
    return {
      ...employee,
      manager: manager?.name || "",
    };
  });

  return z.array(employeeSchema).parse(employeesMap);
}

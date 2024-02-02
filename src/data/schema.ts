import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  managerId: z.union([z.number(), z.null()]),
  manager: z.string(),
  position: z.string(),
  department: z.string(),
  bio: z.string(),
  profilePic: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;

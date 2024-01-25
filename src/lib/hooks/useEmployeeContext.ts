import { EmployeeContext } from "@/lib/context/EmployeeContext";
import { useContext } from "react";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeContextProvider",
    );
  }
  return context;
};

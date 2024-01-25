"use client";

import { EmployeeState } from "@/interfaces/Employee";
import { FC, ReactNode, useReducer } from "react";
import { EmployeeReducer } from "../reducer/EmployeeReducer";
import { EmployeeContext } from "../context/EmployeeContext";

const initialState: EmployeeState[] = [
  {
    employee: null,
    totalDirectReports: 0,
    totalIndirectReports: 0,
    totalReports: 0,
  },
];

export const EmployeeContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(EmployeeReducer, initialState);
  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

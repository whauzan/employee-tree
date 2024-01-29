import React, { FC, ReactNode } from "react";
import { EmployeeContextProvider } from "./EmployeeContextProvider";
import { ErrorContextProvider } from "./ErrorContextProvider";

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorContextProvider>
      <EmployeeContextProvider>{children}</EmployeeContextProvider>
    </ErrorContextProvider>
  );
};

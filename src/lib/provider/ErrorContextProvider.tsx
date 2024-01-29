"use client";

import React, { FC, ReactNode } from "react";
import { ErrorContext } from "../context/ErrorContext";

export const ErrorContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = React.useState<Error | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

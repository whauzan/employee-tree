import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error(
      "useErrorContext must be used within a ErrorContextProvider",
    );
  }
  return context;
};

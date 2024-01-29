"use client";

import { ErrorContextState } from "@/interfaces/Error";
import { createContext } from "react";

export const ErrorContext = createContext<ErrorContextState>({
  error: null,
  setError: () => {},
});

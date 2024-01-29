"use client";

import { Dispatch, createContext } from "react";
import { Action } from "../reducer/EmployeeReducer";
import { EmployeeState } from "@/interfaces/Employee";

export const EmployeeContext = createContext<
  { state: EmployeeState[]; dispatch: Dispatch<Action> } | undefined
>(undefined);

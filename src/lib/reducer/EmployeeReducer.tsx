import { EmployeeState } from "@/interfaces/Employee";

export type Action = { type: "SET_EMPLOYEE_INFO"; payload: EmployeeState[] };

const setEmployeeInfo = (action: Action): EmployeeState[] => {
  return action.payload;
};

export const EmployeeReducer = (
  state: EmployeeState[],
  action: Action,
): EmployeeState[] => {
  switch (action.type) {
    case "SET_EMPLOYEE_INFO":
      return setEmployeeInfo(action);
    default:
      return state;
  }
};

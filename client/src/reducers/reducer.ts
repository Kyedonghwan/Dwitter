export default function Reducer (state = [], action:CreateAction) {
  switch (action.type) {
    case CREATE:
      return action.payload
    default:
      return state;
  }
}

export const CREATE = "create";

export interface CreateAction {
  type: typeof CREATE;
  payload: [];
}

export type TodoActionTypes = CreateAction;
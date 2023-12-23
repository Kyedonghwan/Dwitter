import { CREATE, ILeague, IleagueAction } from "../actions/actions";

const initialState: ILeague[] = [];

export default function leagueReducer (state = initialState, action:IleagueAction) {
  switch (action.type) {
    case CREATE:
      return action.payload
    default:
      return state
  }
}
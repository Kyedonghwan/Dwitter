import axios from "axios";
import {Dispatch} from 'redux';

export const CREATE = "create" as const;

export type ILeague = {
  league : {
    id: string
    name: string
    logo: string
  }
}

export interface createLeagueActionType {
  type: typeof CREATE
  payload: ILeague[]
}

export type IleagueAction = 
| createLeagueActionType

export const createLeagueAction = () => async (dispatch: Dispatch<IleagueAction>) => {
  const { data : { response }} = await axios("https://v3.football.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
	}
  });

  dispatch({
    type: CREATE,
    payload: response
  })
}
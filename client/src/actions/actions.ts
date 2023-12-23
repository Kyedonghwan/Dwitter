import axios from "axios";
import { CREATE } from "../reducers/reducer";

export const createAction = async () => {
  const res = await axios("https://v3.football.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
	}
  });
  return (
    {
      type: CREATE,
      payload: res
    }
  )
}
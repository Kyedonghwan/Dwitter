import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import style from './football.module.scss';
import classnames from 'classnames';

const IS_TEAMS = "is_teams";
const IS_PLAYERS = "is_players";
const IS_TOP_SCORERS = "is_top_scorers";

export default function Football () {
  const [isLoading, setIsLoading] = useState(true);
  const [leagueList, setLeagueList] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [topScorerPlayers, setTopScorerPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [whichClick ,setWhichClick] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const leagueDomId = useRef("ad");
  

  const useDidMountEffect = (func:any, deps:any) => {
    const didMount = useRef(false);

    useEffect(() => {
      console.log(didMount.current);
      if(didMount.current) {console.log("@@");func();}
      else didMount.current = true;
    }, deps);
  }

  const IS_TOP_SCORERS_API = `https://v3.football.api-sports.io/players/topscorers?league=${leagueId}&season=2021`
  const IS_PLAYERS_API = `https://v3.football.api-sports.io/players?league=${leagueId}&season=2021`;
  const IS_TEAMS_API = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=2021`;

    useEffect(() => {
    fetchLeagueData();
  }, []);

  useDidMountEffect(()=>{
    render();
  }, [leagueId]);

const fetchLeagueData = async () => {
  const res = await axios("https://v3.football.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
	}
  });
  let array:any = [];
  let i = 0;
  res.data.response.map(
    (item:any) => {
      array[i] = item;
      i++;
    }
  )
  setIsLoading(false);
  setLeagueList(array);
}

const fetchData = async (api:string) => {
  const { data: { response }} = await axios(api , {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
    }
    });
  return response;
}

const render = async () => {
  switch(whichClick) {
    case IS_TOP_SCORERS:
      setTopScorerPlayers(await fetchData(IS_TOP_SCORERS_API));
      break;
    case IS_TEAMS:
      setTeams(await fetchData(IS_TEAMS_API));
      break;
    case IS_PLAYERS:
      setPlayers(await fetchData(IS_PLAYERS_API));
      break;
    default:
      window.confirm("분류를 선택하세요!");
  }
}

const onClickLeague = async (e:React.MouseEvent) => {
  leagueDomId.current = e.currentTarget?.id;
  console.log(leagueDomId);
  setIsLoading(true);
  console.log("##");
  if(leagueId!==e.currentTarget?.id){
    setLeagueId(e.currentTarget?.id);
  }else {
    render();
  }
  setTeams([]);
  setPlayers([]);
  setTopScorerPlayers([]);
}

  return (
    <>
      <div className={style.total_wrap}>  
        <h1 className={style.title}>2021시즌 원하시는 리그를 선택해주세요.</h1>
        <div className={style.select_league_list}>
          <button type="button" className={classnames(style.btn, { [style.is_selected] : whichClick === IS_PLAYERS })} onClick={async ()=>{
            setWhichClick(IS_PLAYERS); 
            }}>리그별 선수</button>
          <button type="button" className={classnames(style.btn, { [style.is_selected] : whichClick === IS_TEAMS })} onClick={async ()=>{
            setWhichClick(IS_TEAMS);}}>리그별 팀</button>
          <button type="button" className={classnames(style.btn, { [style.is_selected] : whichClick === IS_TOP_SCORERS })} onClick={async ()=>{
            setWhichClick(IS_TOP_SCORERS);
            ;}}>득점 순위</button>
        </div>
        <ul className={style.leagues_list}>
        {
          leagueList.map(item => {
            const league = item.league;
            console.log(leagueId);
            return (
              <li key={league.id} className={style.league}>
                <button id={league.id} onClick={onClickLeague} type="button" className ={classnames(style.btn, "ellipsis", { [style.is_selected] : leagueId === leagueDomId.current })}  style={{background: `url(${league.logo}) no-repeat`, backgroundSize: "contain"}}>
                  {league.name}
                </button>
              </li>
            )
          })
        }
        </ul>
        <table summary="팀 순위" cellSpacing={0} border={1}>
          <caption>팀 순위</caption>
          <colgroup>
            <col width="200" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                { whichClick === IS_TEAMS ? "팀명": "이름"}
              </th>
              <th scope="col">
                { whichClick === IS_TEAMS ? "설립연도" : "나이"}
              </th>
              <th scope="col">
                { whichClick === IS_TEAMS ? "로고" : "국적"}
              </th>
              <th scope="col">
                { whichClick === IS_TEAMS ? "경기장" : "키"}
              </th>
              <th scope="col">
                { whichClick === IS_TEAMS ? "연고지" : "몸무게"}
              </th>
              <th scope="col">
                { whichClick === IS_TEAMS ? "표면" : "프로필"}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              topScorerPlayers.map((item) => {
                return (
                  <tr>
                    <td>{item.player.name}</td>
                    <td>{item.player.age}</td>
                    <td>{item.player.nationality}</td>
                    <td>{item.player.height}</td>
                    <td>{item.player.weight}</td>
                    <td><img src={item.player.photo} /></td>
                  </tr>
                )
              })
            }
            {
              players.map((item) => {
                return (
                  <tr>
                    <td>{item.player.name}</td>
                    <td>{item.player.age}</td>
                    <td>{item.player.nationality}</td>
                    <td>{item.player.height}</td>
                    <td>{item.player.weight}</td>
                    <td><img src={item.player.photo} /></td>
                  </tr>
                )
              })
            }
            {
              teams.map((item) => {
                return (
                  <tr>
                    <td>{item.team.name}</td>
                    <td>{item.team.founded}</td>
                    <td><img src={item.team.logo} /></td>
                    <td>{item.venue.name}</td>
                    <td>{item.venue.city}</td>
                    <td>{item.venue.surface}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    <div style={{color: "red"}}>{isLoading? "로딩중" : "로딩끝"}</div>
    </>
  )
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from './football.module.scss';
import classnames from 'classnames';

export default function Football () {
  const [isLoading, setIsLoading] = useState(true);
  const [LeagueList, setLeagueList] = useState<any[]>([]);
  const [selectLeagueList, setSelectLeagueList] = useState<any[]>([]);

  useEffect(() => {
    fetchLeagueData();
  }, []);

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

const onClickLeague = async (e:React.MouseEvent) => {
  const leagueId = e.currentTarget?.id;
  const res = await axios(`https://v3.football.api-sports.io/teams?league=${leagueId}&season=2020`, {
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
  setSelectLeagueList(array);
}

  return (
    <>
      <div className={style.total_wrap}>  
        <h1 className={style.title}>조회하시려는 리그를 선택해주세요.</h1>
        <ul className={style.leagues_list}>
        {
          LeagueList.map(item => {
            const league = item.league;
            return (
              <li key={league.id} className={style.league}>
                <button id={league.id} onClick={onClickLeague} type="button" className ={classnames(style.btn , "ellipsis")} style={{background: `url(${league.logo}) no-repeat`, backgroundSize: "contain"}}>
                  {league.name}
                </button>
              </li>
            )
          })
        }
        </ul>
        <ul className={style.select_league_list}>
          {
            selectLeagueList.map(item => {
              const team = item.team;
              const venue = item.venue;
              return (
                <li key={team.id} className={style.team}>
                  <button id={team.id} type="button" className ={classnames(style.btn , "ellipsis")} style={{background: `url(${team.logo}) no-repeat`, backgroundSize: "contain"}}>
                    {team.name}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
      <ul>
      
    </ul>
    <div style={{color: "red"}}>{isLoading? "로딩중" : "로딩끝"}</div>
    </>
  )
}
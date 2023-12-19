import axios from "axios";
import React, { useEffect, useState } from "react";
import style from './football.module.scss';
import classnames from 'classnames';

export default function Football () {
  const [isLoading, setIsLoading] = useState(true);
  const [leagueList, setLeagueList] = useState<any[]>([]);
  const [leagueRenderJsx, setLeagueRenderJsx] = useState<any[]>([]);

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
  setIsLoading(true);
  const leagueId = e.currentTarget?.id;
  const res = await axios(`https://v3.football.api-sports.io/teams?league=${leagueId}&season=2019`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
	}
  });
  let array:any[] = res.data.response;
  let arr:any[] = [];

  const sortOrderFunc = () => {
    arr.sort((a:any, b:any) => {
      const aScore = a.fixtures.wins.total*3 + a.fixtures.draws.total;
      const bScore = b.fixtures.wins.total*3 + b.fixtures.draws.total;
  
      if(aScore > bScore) return -1;
      else if( aScore === bScore) return 0;
      else return 1;
    })
  }

  const leagueRendering = () => {
    const renderArr = [];
    for(let index in arr){
      const item = arr[index];
      renderArr.push(<tr>
        <td>{Number(index)+1}</td>
        <td >{item.team.name}
        </td>
        <td>
          {item.fixtures.played.total}
        </td>
        <td>
          {item.fixtures.wins.total*3 + item.fixtures.draws.total}
        </td>
        <td>
          {item.fixtures.wins.total}
        </td>
        <td>
          {item.fixtures.draws.total}
        </td>
        <td>
          {item.fixtures.loses.total}
        </td>
        <td>
          {item.goals.for.total.total}
        </td>
      </tr>);
    }
    return renderArr;
  }

  const fetchDetailStatistics = async (leagueId: string, teamId:string) => {
    const res = await axios(`https://v3.football.api-sports.io/teams/statistics?team=${teamId}&league=${leagueId}&season=2019`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2969331eb0477f82f87ccdbd49f51c09"
    }
    });
    
    arr.push(res.data.response);
  }

  for(let i =0 ; i< 5; i++) {
    await fetchDetailStatistics(leagueId, array[i].team.id);
  }

  sortOrderFunc();
  setLeagueRenderJsx(leagueRendering);
  setIsLoading(false);
}

  return (
    <>
      <div className={style.total_wrap}>  
        <h1 className={style.title}>조회하시려는 리그를 선택해주세요.</h1>
        <ul className={style.leagues_list}>
        {
          leagueList.map(item => {
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
        <table summary="팀 순위" cellSpacing={0} border={1}>
          <caption>팀 순위</caption>
          <colgroup>
            <col width="45" />
            <col width="*" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                순위
              </th>
              <th scope="col">
                팀
              </th>
              <th scope="col">
                경기수
              </th>
              <th scope="col">
                승점
              </th>
              <th scope="col">
                승
              </th>
              <th scope="col">
                무
              </th>
              <th scope="col">
                패
              </th>
              <th scope="col">
                득점
              </th>
            </tr>
          </thead>
          <tbody>
            {
              leagueRenderJsx
            }
          </tbody>
        </table>
      </div>
    <div style={{color: "red"}}>{isLoading? "로딩중" : "로딩끝"}</div>
    </>
  )
}
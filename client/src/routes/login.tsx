import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Ires {
  data: {
    loginSuccess: Boolean,
    message: String
  }
}

const Login = () => {
  const [id,setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name==="id") {
      setId(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const res:Ires = await axios.post("/api/users/login", {
      id, password
    });

    if(!res.data.loginSuccess){
      window.confirm(res.data.message+"");
    }
    else {
      navigate('/home');
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="id">ID</label>
      <input onChange={onChange} name="id" type="text" placeholder="ID를 입력하세요" value={id} required/>
      <label htmlFor="password">PASSWORD</label>
      <input onChange={onChange} name="password" type="password" placeholder="비밀번호를 입력하세요" value={password} required/>
      <input type="submit" value={isLoading ? "로그인 중 ..." : "로그인하기"} disabled={isLoading}/>
      <Link to="/home" >홈으로 가기</Link>
    </form>
  )
}

export default Login;
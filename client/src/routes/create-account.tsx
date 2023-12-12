import axios from 'axios';
import React, { useState } from 'react';

const CreateUser = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [warn1, setWarn1] = useState("");
  const [warn2, setWarn2] = useState("");
  const [warn3, setWarn3] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/user/create" , {
      id, nickname, password, introduce
    });
    setIsLoading(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if(e.target.name === "id") {
      if(!(value.length <20 || value.length >= 6)) {
        setWarn1("아이디는 6자리 이상이거나 20자리 이하이어야 합니다.");
      }else {
        setId(value);
      }
    }else if(e.target.name === "password") {
      if(!(value.length <20 || value.length >= 6)) {
        setWarn2("비밀번호는 6자리 이상이거나 20자리 이하이어야 합니다.");
      }else {
        setPassword(value);
      }
    }else if(e.target.name === "nickname") {
      if(!(value.length <20 || value.length >= 6)) {
        setWarn3("닉네임은 6자리 이상이거나 20자리 이하이어야 합니다.")
      }else {
        setNickname(value);
      }
    }else {
      setIntroduce(introduce);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="id">ID</label>
      <input onChange={onChange} name="id" type="text" placeholder="ID를 입력하세요" value={id} required/>
      <div style={{ color: "red"}} >{warn1}</div>
      <label htmlFor="password">PASSWORD</label>
      <input onChange={onChange} name="password" type="password" placeholder="비밀번호를 입력하세요" value={password} required/>
      <div style={{ color: "red"}} >{warn2}</div>
      <label htmlFor="nickname">닉네임</label>
      <input onChange={onChange} type="text" name="nickname" placeholder="사용하실 닉네임을 입력해주세요" value={nickname}></input>
      <textarea placeholder="자기소개를 입력해주세요" value={introduce}/>
      <div style={{ color: "red"}} >{warn3}</div>
      <input type="submit" value={isLoading ? "제출 중 ..." : "제출하기"} />
    </form>
  )
}

export default CreateUser;
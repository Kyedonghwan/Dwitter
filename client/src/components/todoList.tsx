import React, { useState } from "react"
import axios from 'axios'

export default function TodoList () {
  const [content, setContent] = useState("");

  const onTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/post", {
      content
      });
      console.log(res);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onTextChange} type="text" placeholder="내용을 작성해주세요 !" value={content}/>
        <input type="submit" value="올리기" />
      </form>
    </div>
  )
}
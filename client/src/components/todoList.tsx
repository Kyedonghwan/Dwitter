import React, { useEffect, useState } from "react"
import axios from 'axios'
import Todo, { ITodo } from "./todo";

export default function TodoList () {
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => {
    fetchTodoList();
  },[]);

  const fetchTodoList = async () => {
    const fetchTodoList = await axios.get("/api/get");
    setTodoList(fetchTodoList.data);
  }

  const onTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const res = await axios.post("/api/post", {
      content
      });
      console.log(res);
      await fetchTodoList();
      setIsLoading(false);
      setContent("");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onTextChange} type="text" placeholder="내용을 작성해주세요 !" value={content}/>
        <input type="submit" value={isLoading ? "로딩중 ..." : "올리기"} />
      </form>
      <ul>
        {
          todoList.map((todo) => {
            return <Todo key={todo.id} {...todo} />
          })
        }
      </ul>
    </div>
  )
}
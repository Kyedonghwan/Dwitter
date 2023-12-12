import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import CreateUser from './routes/create-account';
import TodoList from './components/todoList';

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [
    {
      path: "",
      element: <TodoList />,
    },
    {
      path: "create-user",
      element: <CreateUser />,
    }
  ]
},
  {
    path: "/create-user",
    element: <CreateUser />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

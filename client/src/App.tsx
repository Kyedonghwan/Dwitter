import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Home';
import CreateUser from './routes/create-account';
import TodoList from './components/todoList';
import Home from './routes/Home';
import Login from './routes/login';
import Football from './routes/Football';

const router = createBrowserRouter([
  {
    path: "/create-user",
    element: <CreateUser />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/football",
    element: <Football />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

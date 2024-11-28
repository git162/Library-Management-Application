import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Home/Header";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Account from "./components/Home/Account";
import Container from "./components/Home/Container";
import Dashboard from "./components/Home/Dashboard";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
  { future: {
    v7_relativeSplatPath: true,
  },
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {path:"/home",element:<Home/>},
      {path:"/books",element:<Container type={"display"}/>},
      {path:"/signup",element:<SignUp/>},
      {path:"/signin",element:<SignIn/>},
      {path:"/account",element:<Account/>},
      {path:"/dashboard",element:<Dashboard/>},
      {
        path:"/books/:bookType",
        element: <Container type={"description"}/>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


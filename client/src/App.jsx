import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Home/Header";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Card from "./components/Home/Card";
import Container from "./components/Home/Container";
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
      {path:"/books",element:<Container type={"display"}/>},
      {path:"/signup",element:<SignUp/>},
      {path:"/signin",element:<SignIn/>},
      {
        path:"/books/:bookType",
        element: <Container type={"description"}/>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


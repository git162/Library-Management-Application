import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Home/Header";
import SignUp from "./components/Auth/SignUp";
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
      {path:"/",element:<Container/>},
      {path:"/signup",element:<SignUp/>},
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
// root.render(<App/>);

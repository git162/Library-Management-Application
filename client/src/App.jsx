import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Home/Header";
import SignUp  from "./components/Auth/SignUp";
export default function App() {
  return (
    <>
      <Header/>
      <SignUp/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
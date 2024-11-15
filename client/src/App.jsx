import React from "react";
import ReactDOM from "react-dom/client";
import SignUp  from "./components/Auth/SignUp"
export default function App() {
  return (
    <>
      <SignUp/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
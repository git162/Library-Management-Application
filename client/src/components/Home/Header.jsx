import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto mt-2">
        <ul className="flex justify-center items-center gap-32 font-semibold text-xl cursor-pointer">
          <li className="hover:text-red-400">
            <Link to={"/"} className="no-underline text-inherit">Home</Link>
          </li>
          <li className="hover:text-red-400">
            <Link to={"#"} className="no-underline text-inherit">Books</Link>
          </li>
          <li className="hover:text-red-400">
            <Link to={"#"} className="no-underline text-inherit">Account</Link>
          </li>
          <li>
            <button className="bg-black text-white rounded-md px-4 py-2 hover:bg-red-500">
              <Link to={"/signup"} className="no-underline text-inherit">Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

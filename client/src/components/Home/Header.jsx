import React from "react";

const Header = () => {
  return (
    <div>
      <div className="container mt-2">
        <ul className="flex justify-center items-center gap-32 font-semibold text-xl cursor-pointer">
          <li className="hover:text-red-400">Home</li>
          <li className="hover:text-red-400">Books</li>
          <li className="hover:text-red-400">Account</li>
          <li>
            <button className="bg-black text-white rounded-md px-4 py-2 hover:bg-red-500">
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

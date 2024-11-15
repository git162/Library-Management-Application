import React from "react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from "react-bootstrap/Carousel";

const Signup = () => {
  const img1 =
    "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img2 =
    "https://images.unsplash.com/photo-1647288020655-6b3e2fc5916b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img3 =
    "https://images.unsplash.com/photo-1645199055608-fce5ca0d098e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  console.log(user);
  return (
    <>
      <div className="flex mt-20 justify-center gap-20">
        <div className="form-area  bg-slate-200 w-[40vw] h-[80vh] gap-1 rounded-md flex flex-col items-center">
          <h1 className="text-5xl mt-5 mb-3 text-slate-900">
            Create an account
          </h1>
          <h4 className="text-lg">Welcome to Library</h4>
          <div className="buttons flex gap-32 mt-8">
            <button className="border-2 flex gap-2 font-semibold border-slate-950 px-6 py-3 rounded-md ">
              <BsGoogle className="mt-0.5 text-xl" />
              Google
            </button>
            <button className="border-2 flex gap-2 font-semibold border-slate-950 px-6 py-3 rounded-md">
              <MdPhoneIphone className="mt-0.5 text-xl" /> Phone
            </button>
          </div>
          <div className="flex items-center w-full my-8 max-w-[90%]">
            <hr className="flex-grow border-t border-slate-950 mx-2" />
            <span className="px-4 font-semibold text-black">Or</span>
            <hr className="flex-grow border-t border-slate-950 mx-2" />
          </div>
          <select
            name="type-of-user"
            id="userType"
            className="w-[80%] h-[7%] rounded-md px-10 border-slate-700 border-2"
            value={user}
            onChange={(e)=>setUser(e.target.value)}
          >
            <option value="admin" className="hover:bg-slate-950">
              Admin
            </option>
            <option value="librarian">Librarian</option>
            <option value="user">User</option>
          </select>
          {/* <input type="submit"/> */}

          <input
            type="text"
            placeholder="Enter your name"
            className="w-[80%] h-[7%] rounded-md px-10 border-slate-700 border-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter email"
            className="w-[80%] h-[7%] rounded-md px-10 border-slate-700 border-2"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-[80%] h-[7%] rounded-md px-10 border-slate-700 border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-[80%] bg-slate-950 text-white h-[7%] rounded-md font-semibold ">
            Sign Up
          </button>
        </div>
        <div className="image-area bg-slate-200 w-[40vw] h-[60vh] rounded-md self-center">
          <div className="carousel-wrapper isolate">
            <Carousel>
              <Carousel.Item interval={500}>
                <img
                  className="d-block w-100 h-[60vh] object-cover rounded-md"
                  src={img1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>All Books in One Place</h3>
                  {/* <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img
                  className="d-block w-100 h-[60vh] object-cover rounded-md"
                  src={img2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Science Technology Mathematics</h3>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 h-[60vh] object-cover rounded-md"
                  src={img3}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Novels, Fiction, Biography</h3>
                  {/* <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

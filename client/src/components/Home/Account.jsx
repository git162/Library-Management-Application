import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const [bookData, setBookData] = useState([]);
  const [fine, setFine] = useState([]);

  const fetchFine = async () => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Please log in to issue a book.");
      return;
    }

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/fine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const fineJson = await response.json();
        setFine(fineJson);
        console.log("Fetched fine", fineJson);
      } else {
        console.error("Error fetching fine:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching fine:", error);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Please log in to issue a book.");
      return;
    }

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/borrowedbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        setBookData(jsonData);
        console.log("Fetched data:", jsonData);
      } else {
        console.error("Error fetching data:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFine();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-200 p-20">
      <ToastContainer />
      <h4 className="font-roboto self-center fixed bg-white p-2 rounded-md font-semibold">
        BOOKS ISSUED TO YOU 
      </h4>

      <h4 className="font-roboto self-center fixed top-20 right-6 p-2 rounded-md font-semibold">
      <span className="bg-red-500 p-2 rounded-md text-white">TOTAL FINE:{fine.totalfine}</span>
      </h4>
      
      <div
        id="tabs-container"
        className="bg-slate-200 min-h-screen flex flex-col items-center overflow-x-hidden flex-wrap gap-7 min-w-screen mt-10 pt-20"
      >
        {bookData.map((elem) => (
          <Tab
            key={elem.bookid}
            photolink={elem.photolink}
            bookname={elem.bookname}
            author={elem.author}
            isbn={elem.isbn}
            bookcategory={elem.bookcategory}
            bookcode={elem.bookcode}
            rackno={elem.rackno}
            borrowdate={elem.borrowdate}
            returndate={elem.returndate}
            fine={elem.calculatedfine}
            refetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default Account;

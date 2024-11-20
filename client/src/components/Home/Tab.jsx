import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Tab = ({
  photolink,
  bookname,
  author,
  isbn,
  bookcategory,
  bookcode,
  rackno,
  borrowdate,
  refetchData,
}) => {
  const handleReturn = async (bookCode) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      console.log("Attempting to return book with bookCode:", bookCode);

      const response = await fetch(`http://localhost:5000/user/return/${bookCode}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Book returned successfully:", data);
        toast.success("Book returned successfully", {
          position: "top-center"
        });
        refetchData();
      } else {
        const errorData = await response.json();
        console.error("Failed to return the book:", errorData);
        alert("Failed to return the book.");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error returning the book. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-[60vw] flex gap-5 bg-white rounded-md p-2">
        <div className="rounded-md flex flex-col justify-center" id="tab-image">
          <img
            className="object-cover rounded-md h-[32vh] w-[20vw]"
            src={photolink}
            alt="book cover"
          />
        </div>

        <div id="tab-description">
          <h4 className="font-robotoCondensed font-bold">{bookname}</h4>
          <h4 className="font-robotoCondensed">
            <span className="font-robotoCondensed font-bold text-green-700">
              AUTHOR:
            </span>
            {" " + author}
          </h4>
          <h4 className="font-robotoCondensed">
            <span className="font-bold">ISBN: </span>
            {" " + isbn}
          </h4>
          <h4 className="font-robotoCondensed">
            <span className="font-bold">CATEGORY:</span>
            {" " + bookcategory}
          </h4>
          <h4 className="font-robotoCondensed">
            <span className="font-bold">BORROW DATE:</span>
            {" " + borrowdate}
          </h4>
        </div>

        <div id="return" className="flex flex-col justify-center items-center gap-2">
          <button
            className="bg-blue-500 rounded-sm px-3 py-1 font-robotoCondensed font-bold text-white"
            onClick={() => handleReturn(bookcode)}
          >
            RETURN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab;

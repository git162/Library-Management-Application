import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashTab = ({
  photolink,
  bookname,
  author,
  isbn,
  bookcategory,
  booktype,
  bookcode,
  rackno,
  onUpdate,
  refetchData,
}) => {
  const handleDelete = async (bookCode) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      console.log("Attempting to delete book with bookCode:", bookCode);

      const response = await fetch(
        `http://localhost:5000/librarian/remove/${bookCode}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Check if the response has JSON data
        const data = await response.json();
        console.log(data);
        console.log("Delete response:", data);
        toast.success("Book deleted successfully", {
          position: "top-center",
        });
        refetchData(); // Trigger UI update
      } else {
        // Handle errors returned by the server
        const errorData = await response.json();
        console.error("Failed to delete the book:", errorData);
        toast.error(errorData.message || "Failed to delete book!", {
          position: "top-center",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during delete operation:", error);
      toast.error("Unexpected error occurred while deleting the book!", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <div className="w-[60vw] flex justify-evenly bg-white rounded-md p-2">
        <div className="rounded-md flex flex-col justify-center" id="tab-image">
          <img
            className="object-cover rounded-md h-[40vh] w-[22vw]"
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
            <span className="font-bold">BOOK CODE: </span>
            {" " + bookcode}
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
            <span className="font-bold">BOOK TYPE:</span>
            {" " + booktype}
          </h4>
          <h4 className="font-robotoCondensed">
            <span className="font-bold">RACK NO:</span>
            {" " + rackno}
          </h4>
        </div>

        <div
          id="buttons"
          className="flex flex-col justify-center items-center gap-2"
        >
          <button
            className="bg-blue-500 rounded-sm px-3 py-1 font-robotoCondensed font-bold text-white"
            onClick={onUpdate}
          >
            UPDATE
          </button>

          <button
            className="bg-red-500 rounded-sm px-3 py-1 font-robotoCondensed font-bold text-white"
            onClick={() => handleDelete(bookcode)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashTab;

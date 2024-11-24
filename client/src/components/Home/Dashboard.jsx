import React, { useState,useEffect } from "react";
import DashTab from "./DashTab";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";

const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-[100%] h-8 rounded-md px-10 border-slate-700 placeholder-black border-2"
      value={value}
      onChange={onChange}
    />
  );
};

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [bookData, setBookData] = useState([]);

  // Zod schema for validation
  const schema = z.object({
    bookName: z.string().min(1, { message: "Book Name is required" }),
    bookCode: z.string().min(7, { message: "Book Code is required" }), // Ensure this is needed to be 7 characters
    author: z.string().min(3, { message: "Author is required" }),
    rackNumber: z.string().min(1, { message: "Rack Number is required" }),
    photolink: z.string().optional(), // Allows empty or undefined value
    isbn: z
      .string()
      .min(10, { message: "ISBN must be at least 10 characters" })
      .max(13, { message: "ISBN must be at most 13 characters" }), // ISBN usually 13 digits
    bookCategory: z.string().min(3, { message: "Book Category is required" }),
  });

  const inputFields = [
    { id: "bookName", placeholder: "Enter Book Name" },
    { id: "bookCode", placeholder: "Enter Book Code" },
    { id: "author", placeholder: "Enter Book Author" },
    { id: "rackNo", placeholder: "Enter Rack Number" },
    { id: "photoLink", placeholder: "Enter a Link of the Book Photo" },
    { id: "bookType", placeholder: "Enter Type number of book" },
    { id: "isbn", placeholder: "Enter Book ISBN" },
    { id: "bookCategory", placeholder: "Enter Book Category" },
  ];

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/librarian/books",

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const jsonData = await response.json();
        setBookData(jsonData);
      } else {
        console.error("Error fetching data:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async () => {
    const data = formData;
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      setIsLoading(true);
      const url = "http://localhost:5000/librarian/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      console.log("Success:", result);

      toast.success("Book posted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message, { position: "top-center" });
        });
      } else {
        toast.error("Unable to post book!", { position: "top-center" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center bg-slate-100">
      <ToastContainer />
      <button
        className="py-2 px-2 bg-blue-600 rounded-md text-white"
        onClick={() => setVisible(!visible)}
      >
        Post a Book
      </button>
      <CModal
        className="mt-20"
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="OptionalSizesExample1"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample1">
            <div>
              <h4 className="font-robotoCondensed">Post a Book</h4>
            </div>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="flex flex-col gap-3">
            {inputFields.map(({ id, placeholder }) => (
              <TextInput
                key={id}
                placeholder={placeholder}
                value={formData[id] || ""}
                onChange={(e) => handleInputChange(id, e.target.value)}
              />
            ))}
            <button
              className={`py-2 px-2 rounded-md text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
              }`}
              onClick={handlePost}
              disabled={isLoading} // Optional: Disable button while loading
            >
              {isLoading ? "Loading..." : "Post"}
            </button>
          </div>
        </CModalBody>
      </CModal>
      <div className="flex flex-col gap-2 mt-3">
      {bookData.map((elem) => (
          <DashTab
            key={elem.id}
            photolink={elem.photolink}
            bookname={elem.bookname}
            author={elem.author}
            isbn={elem.isbn}
            bookcategory={elem.bookcategory}
            booktype={elem.booktype}
            bookcode={elem.bookcode}
            rackno={elem.rackno}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

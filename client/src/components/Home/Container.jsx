import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = ({ type }) => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [noBooksToastShown, setNoBooksToastShown] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false); 

  const params = useParams();
  const bookType = type === "description" ? params.bookType : undefined;

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch(
        type === "display"
          ? "http://localhost:5000/user/booksbyname"
          : "http://localhost:5000/user/booksbytype/" + bookType,
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
        setFilteredData(jsonData);
        setIsDataFetched(true); 
      } else {
        console.error("Error fetching data:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, bookType]);

  useEffect(() => {
    if (isDataFetched) {
      if (filteredData.length === 0 && !noBooksToastShown) {
        toast.warning("No books found", { position: "top-center" });
        setNoBooksToastShown(true); 
      } else if (filteredData.length > 0 && noBooksToastShown) {
        setNoBooksToastShown(false); 
      }
    }
  }, [filteredData, isDataFetched, noBooksToastShown]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(bookData);
    }
  }, [searchText, bookData]);

  const handleSearch = () => {
    const filtered = bookData.filter((book) =>
      book.bookname.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.bookcategory.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <ToastContainer />
      <div className="flex fixed top-20">
        <input
          type="text"
          placeholder="Search for books, authors, book genre"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          value={searchText}
          className="bg-white w-60 p-2 placeholder:italic placeholder:text-slate-400 h-10 ml-3 rounded-md cursor-text focus:border-black focus:w-[500px] focus:ring-2 focus:ring-black transition-all duration-500 ease-in-out"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white h-10 w-16 ml-2 rounded-md p-1 font-semibold active:bg-slate-300 transition-all duration-300 ease-in-out"
        >
          Search
        </button>
      </div>

      <div
        id="cards-container"
        className="bg-slate-200 min-h-screen flex overflow-x-hidden justify-center flex-wrap gap-16 min-w-screen mt-12 pt-20"
      >
        {filteredData.map((elem) => (
          <Card
            key={elem.id}
            photolink={elem.photolink}
            bookname={elem.bookname}
            author={elem.author}
            isbn={elem.isbn}
            bookcategory={elem.bookcategory}
            booktype={elem.booktype}
            pageType={type}
            status={elem.status}
            rackno={elem.rackno}
            bookcode={elem.bookcode}
            refetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;

import React, { useState,useEffect } from 'react';
import Card from './Card';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Container = ({type}) => {

    const navigate = useNavigate();
    const [bookData, setBookData] = useState([]);

    const { bookType } = type === "description" ? useParams() : {};
    
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
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setBookData(jsonData);
          console.log(jsonData);
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
  
    

  return (
    <div className='w-full h-full flex justify-center bg-slate-200'>
      <ToastContainer />
      <h4 className='font-roboto font-semibold'>ALL BOOKS</h4>
      <div id="cards-container" className='bg-slate-200 min-h-screen flex overflow-x-hidden flex-wrap gap-7 min-w-screen mt-10 pt-20'>
       
        {
          bookData.map((elem) => (
            <Card 
              key={elem.id} 
              photolink={elem.photolink} 
              bookname={elem.bookname} 
              author={elem.author} 
              isbn={elem.isbn} 
              bookcategory={elem.bookcategory}
              booktype={elem.booktype}
              pageType = {type}
              status = {elem.status}
              bookcode = {elem.bookcode}
              refetchData = {fetchData}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Container;

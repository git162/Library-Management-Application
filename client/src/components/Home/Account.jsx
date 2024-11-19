import React, { useState, useEffect }from 'react';
import Tab from './Tab';

const Account = () => {
    const [bookData, setBookData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const token = localStorage.getItem("authToken");
    
          if (!token) {
            console.error("No token found. Please log in.");
            navigate("/signin");
            return;
          }
    
          try {
            const response = await fetch(
              "http://localhost:5000/user/borrowedbooks",
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
    
        fetchData();
      }, []);

    return (
        <div className='w-full h-full flex flex-col items-center bg-slate-200 p-20'>
          <h4 className='font-roboto self-center fixed bg-white p-2 rounded-md font-semibold'>BOOKS ISSUED TO YOU</h4>
          <div id="tabs-container" className='bg-slate-200 min-h-screen flex flex-col items-center overflow-x-hidden flex-wrap gap-7 min-w-screen mt-10 pt-20'>
          {
          bookData.map((elem) => (
            <Tab 
              key={elem.bookid} 
              photolink={elem.photolink} 
              bookname={elem.bookname} 
              author={elem.author} 
              isbn={elem.isbn} 
              bookcategory={elem.bookcategory}
              bookcode = {elem.bookcode}
              rackno = {elem.rackno}
              borrowdate = {elem.borrowdate}
            />
          ))
        }
          </div>
        </div>
      )
    }


export default Account

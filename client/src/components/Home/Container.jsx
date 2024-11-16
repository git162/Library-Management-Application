import React, { useState,useEffect } from 'react';
import Card from './Card';

const Container = () => {

    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/user/booksbyname");
            const jsonData = await response.json();
            setBookData(jsonData);
            console.log(jsonData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData(); 
      }, []); 
    

  return (
    <div>
      <h4 className='font-roboto font-semibold'>ALL BOOKS</h4>
      <div id="cards-container" className='bg-slate-200 min-h-screen flex overflow-x-hidden flex-wrap gap-7 min-w-screen mt-10 p-20'>
       
        {
          bookData.map((elem) => (
            <Card 
              key={elem.id} 
              photolink={elem.photolink} 
              bookname={elem.bookname} 
              author={elem.author} 
              isbn={elem.isbn} 
              bookcategory={elem.bookcategory}
              pageType = {"display"}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Container;

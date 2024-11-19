import React from "react";

const Tab = ({
    photolink,
    bookname,
    author,
    isbn,
    bookcategory,
    bookcode,
    rackno,
    borrowdate
  }) => {
//   const photolink = "https://tinyurl.com/59sk2kde";
  return (
    <div>
      <div className="w-[60vw]  flex gap-5 bg-white rounded-md p-2">
        <div className="rounded-md" id="tab-image">
          <img
            className="object-cover rounded-md h-[25vh] w-[20vw]"
            src={photolink}
            alt="book cover"
          />
        </div>

        <div id="tab-description" >
          <h4 className="font-robotoCondensed font-bold">{bookname}</h4>
          <h4 className="font-robotoCondensed">
            <span className="font-robotoCondensed font-bold text-green-700">
              AUTHOR: 
            </span>
            {" "+ author}
          </h4>
          <h4 className="font-robotoCondensed"><span className="font-bold">ISBN: </span>{" " + isbn}</h4>
          <h4 className="font-robotoCondensed"><span className="font-bold">CATEGORY:</span>{" " + bookcategory}</h4>
          <h4 className="font-robotoCondensed"><span className="font-bold">BORROW DATE:</span>{" " + borrowdate}</h4>
        </div>

        <div id="return" className="flex flex-col justify-center items-center gap-2">
            <button className="bg-blue-500 rounded-sm px-3 py-1 font-robotoCondensed font-bold text-white">
                    RETURN
            </button>

            {/* <button className="bg-blue-500 rounded-sm px-3 py-1 font-robotoCondensed font-bold text-white">
                FINE: 
            </button> */}
        </div>
      </div>
    </div>
  );
};

export default Tab;

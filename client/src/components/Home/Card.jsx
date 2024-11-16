import React from "react";

const Card = ({
  photolink,
  bookname,
  author,
  isbn,
  bookcategory,
  pageType,
}) => {
  return (
    <div>
      <div
        className="p-1 w-[20vw] bg-white shadow-md rounded-lg overflow-hidden"
        id="card-container"
      >
        <div className="rounded-md" id="card-image">
          <img
            className="object-cover rounded-md h-[25vh] w-[20vw]"
            src={photolink}
            alt="book cover"
          />
        </div>
        <div className="p-3" id="description">
          <h4 className="text-lg font-robotoCondensed font-bold">{bookname}</h4>
          <h4 className="text-sm">
            <span className="font-robotoCondensed font-bold text-green-700">
              AUTHOR:
            </span>
            {" " + author}
          </h4>
          {pageType === "description" && (
            <h4 className="text-sm">
              <span className="font-robotoCondensed font-bold">ISBN:</span>
              {" " + isbn}
            </h4>
          )}

          <h4 className="text-sm">
            <span className="font-robotoCondensed font-bold">CATEGORY:</span>{" "}
            {" " + bookcategory}
          </h4>
        </div>
        <button className="ml-4 bg-black text-white px-3 py-1 font-robotoCondensed rounded-sm">
          Get a Copy
        </button>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  photolink,
  bookname,
  author,
  isbn,
  bookcategory,
  pageType,
  booktype,
  status,
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
          {pageType === "description" && (
            <h4
              className={`text-sm font-robotoCondensed font-bold ${
                status === "available" ? "text-green-500" : "text-red-500"
              }`}
            >
              <span className="text-black">STATUS:</span>
              {" " + status}
            </h4>
          )}
        </div>
        {pageType === "display" ? (
          <button className="ml-4 bg-black text-white px-3 py-1 font-robotoCondensed rounded-sm">
            <Link
              to={"/books/" + booktype}
              className="no-underline text-inherit"
            >
              Get a Copy
            </Link>
          </button>
        ) : (
          <button className={`ml-4 text-white px-3 py-1 font-robotoCondensed rounded-sm ${
            status === "available" ? "bg-green-500" : "bg-red-500"
          }`}>
            <Link
              className="no-underline text-inherit"
            >
              Issue
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

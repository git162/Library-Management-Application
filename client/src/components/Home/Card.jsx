import React from "react";

const Card = () => {
  const imageLink = "https://m.media-amazon.com/images/I/81rEY-cvtDL.jpg";
  // "https://media.istockphoto.com/id/1321255090/vector/brochure-template-layout-blue-cover-design-business-annual-report-flyer-magazine.jpg?s=2048x2048&w=is&k=20&c=FENmtLucI3oUZ9S5594rqAtxSrUbuepgoIyl5TGSnpg=";
  const bookTitle = "Database Management Systems";
  const author = "Elmasri, Navathe";
  const isbn = "978-0132142176";
  const pageType = "description";
  const bookCategory = "Engineering,Technology";

  return (
    <div >
      <div
        className="p-1 w-[20vw] bg-white shadow-md rounded-lg overflow-hidden"
        id="card-container"
      >
        <div className="rounded-md" id="card-image">
          <img
            className=" object-cover rounded-md h-[25vh] w-[20vw] "
            src={imageLink}
            alt="book cover"
          />
        </div>
        <div className="p-3" id="description">
          <h4 className="text-lg font-robotoCondensed font-bold">
            {bookTitle}
          </h4>
          <h4 className="text-sm">
            <span className="font-robotoCondensed font-bold text-green-700">
              AUTHOR:
            </span>
            {author}
          </h4>

          {pageType === "description" && (
            <h4 className="text-sm">
              <span className="font-robotoCondensed font-bold">ISBN:</span>
              {isbn}
            </h4>
          )}

          <h4 className="text-sm">
            <span className="font-robotoCondensed font-bold">CATEGORY:</span> {bookCategory}
          </h4>
        </div>
        <button className=" ml-4  bg-black text-white px-3 py-1 font-robotoCondensed rounded-sm">Get a Copy</button>
      </div>
    </div>
  );
};

export default Card;

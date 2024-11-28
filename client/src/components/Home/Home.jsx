import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Footer } from "flowbite-react";

const Home = () => {
  const img1 =
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img2 =
    "https://images.unsplash.com/photo-1457276587196-a9d53d84c58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img3 =
    "https://images.unsplash.com/photo-1505063366573-38928ae5567e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="mt-20 bg-slate-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center mb-4 font-robotoCondensed">
              Welcome to Library
            </h1>
            <p className="text-center mb-5 font-roboto">
              Explore a world of books! Find your next great read from our vast
              collection of genres, including science, fiction, technology, and
              more.
            </p>

            {/* Carousel Section */}
            <div className="carousel-wrapper mb-5">
              <Carousel>
                <Carousel.Item interval={500}>
                  <img
                    className="d-block w-100 h-[60vh] object-cover rounded-md"
                    src={img1}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>All Books in One Place</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <img
                    className="d-block w-100 h-[60vh] object-cover rounded-md"
                    src={img2}
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Science, Technology, Mathematics</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-[60vh] object-cover rounded-md"
                    src={img3}
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Novels, Fiction, Biography</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;

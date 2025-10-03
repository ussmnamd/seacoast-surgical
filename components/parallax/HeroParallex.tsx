import React from "react";

const HeroParallax = () => {
  return (
    <>
      <div className="hidden md:block h-full">
        {[...Array(9)].map((_, index) => {
          const imageNumber = index + 2;
          const imageUrl = `/images/parallax/${imageNumber}.jpg`; // Assuming the images are named from 2.jpg to 11.jpg
          return (
            <div
              key={index}
              className="min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default HeroParallax;

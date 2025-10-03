"use client";
import { dummytestominal } from "@/constant/Testominals";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestominalCarosal = () => {
  return (
    <div className="mx-auto container justify-center mt-10">
      <div className="flex flex-col justify-center items-center p-4">
      <span className="text-5xl font-semibold">Testimonials</span>
      </div>
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          useKeyboardArrows={true}
          swipeable={true}
          stopOnHover={true}
        >
          {dummytestominal.map((testominal, index) => (
            <section key={index}>
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  <blockquote>
                    <p className="text-xl md:text-2xl font-normal text-gray-900 ">
                      &quot;{testominal.message}&quot;
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    <div className="flex items-center divide-x-2 divide-gray-500 ">
                      <div className="pr-3 text-xl font-bold text-gray-900 ">
                        {testominal.user.name}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestominalCarosal;

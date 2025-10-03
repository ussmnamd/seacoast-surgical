/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import Image from "next/image";

const HomeCarosal = () => {
  return (
    <>
      <div className=" w-full mx-auto ">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          useKeyboardArrows={false}
          swipeable={false}
        >
          <div>
            <img src="/images/heroimage.jpg" alt="heroimage1" />
          </div>
          <div>
            <img src="/images/heroimage2.jpg" alt="heroimage2" />
          </div>
          <div>
            <img src="/images/heroimage3.jpg" alt="heroimage2" />
          </div>
        </Carousel>
      </div>

      <div className="flex flex-col justify-evenly items-center space-y-10 py-8 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-cyan-800 font-bold">
            Welcome to Seacoast Surgical
          </h1>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-cyan-700">
            <strong>
              We believe in the strength of hard work, innovation, and
              consistency and make a difference through them.
            </strong>
          </h2>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-700">
            We have a long tradition of manufacturing surgical instruments and
            have proven ourselves in providing them with top-quality and 100%
            customer satisfaction. We manufacture and sell a wide range of
            instruments at affordable prices. For spinal and neurosurgery
            instruments, we have set a different standard; they are a symbol of
            recognition for us. Our hard work and consistency have always made
            us proud and enabled us to spread our service nationwide.
          </h3>
        </div>



        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-700">
          We provide a wide range of{" "}
            <Link href="https://www.dynamicmedicalsolution.com/categories/general-instrumentation" legacyBehavior>
              <a className="text-cyan-800 underline font-bold">
                surgical instruments
              </a>
            </Link>
            , which include{" "}
            <Link href="https://www.dynamicmedicalsolution.com/products/retractor" legacyBehavior>
              <a className="text-cyan-800 underline font-bold">
              retractors
              </a>
            </Link>
            ,{" "}
            <Link href="https://www.dynamicmedicalsolution.com/products/scalpels" legacyBehavior>
              <a className="text-cyan-800 underline font-bold">scalpel</a>
            </Link>
            ,{" "}
            <Link
              href="https://www.dynamicmedicalsolution.com/products/suture"
              legacyBehavior
            >
              <a className="text-cyan-800 underline font-bold">
              suture
              </a>
            </Link>
           
            , and many more. Some of them are discussed below:
          </h3>
        </div>



        <section className="text-light-accent body-font flex justify-center items-center text-justify py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                href: "https://www.dynamicmedicalsolution.com/categories/neurological-spine-instruments",
                src: "/images/NI.jpg",
                alt: "Neurosurgical Instruments",
                title: "Neurosurgical Instruments",
                description:
                  "We are known for our top-quality neurosurgery instruments. It includes both electrical and non-electrical instruments such as skull instruments, bipolar cables, bipolar forceps, etc.",
              },
              {
                href: "https://www.dynamicmedicalsolution.com/products/gynae-set",
                src: "/images/SSI.jpg",
                alt: "Spiral Surgery Instruments",
                title: "Spiral Surgery Instruments",
                description:
                  "Our surgical spine instruments also hold great importance for their quality and design. It includes a variety of instruments such as suction tubes, nerve root retractors, spinal gouges, etc.",
              },
              {
                href: "https://www.dynamicmedicalsolution.com/products/needle-holders",
                src: "/images/NH.jpg",
                alt: "Needle Holders",
                title: "Needle Holders",
                description:
                  "Needle holders of different sizes and designs are manufactured in Dynamic Medical. They are carefully designed to provide strong grip and precise control.",
              },
              {
                href: "https://www.dynamicmedicalsolution.com/products/scissors",
                src: "/images/SS.jpg",
                alt: "Surgical Scissors",
                title: "Surgical Scissors",
                description:
                  "A wide variety of surgical scissors is designed in dynamic medical keeping in mind the requirement of every surgical domain. They differ greatly in design and size.",
              },
              {
                href: "https://www.dynamicmedicalsolution.com/categories/orthopedic-instruments",
                src: "/images/OI.jpg",
                alt: "Surgical Orthopedics",
                title: "Surgical Orthopedics",
                description:
                  "The surgical orthopedics of Dynamic Medical hold special importance for their quality and designs. It includes a variety of massive instruments.",
              },
              {
                href: "https://www.dynamicmedicalsolution.com/products/dental-instruments",
                src: "/images/DI.jpg",
                alt: "Dental Instruments",
                title: "Dental Instruments",
                description:
                  "Our dental instruments are of good quality with a suitable price range. They are available in single, pairs, or surgical trays.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col shadow-lg justify-center items-center w-full mb-8 px-4 transform transition-transform hover:scale-105"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex flex-col items-center"
                >
                  <Image
                    width={300}
                    height={200}
                    src={item.src}
                    alt={item.alt}
                    className="h-40 w-auto md:h-48 lg:h-56 object-contain"
                  />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 text-center text-gray-700">
                    {item.title}
                  </h2>
                  <div className="text-center mt-2">
                    <p className="text-sm sm:text-base md:text-lg text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </a>
                {/* <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 text-white bg-orange-500 rounded-lg transition-transform transform hover:scale-105 text-sm sm:text-base"
                >
                  {item.title}
                </a> */}
              </div>
            ))}
          </div>
        </section>

        {/* <div className="text-center max-w-4xl mx-auto py-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-bold">
            All of our products are certified by four of the major international
            organizations
          </h3>
        </div>

        <section className="text-light-accent body-font">
          <div className="flex flex-wrap justify-center items-center gap-10 py-10">
            {[
              {
                href: "/",
                src: "",
                alt: "CE Mark",
              },
              {
                href: "/",
                src: "",
                alt: "FDA",
              },
              {
                href: "/",
                src: "",
                alt: "ISO",
              },
              {
                href: "/",
                src: "/images/astm.png",
                alt: "ASTM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-8 px-4 transform transition-transform hover:scale-105"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center"
                >
                  <Image
                    width={300}
                    height={200}
                    src={item.src}
                    alt={item.alt}
                    className="h-24 w-auto sm:h-32 md:h-40 lg:h-42"
                  />
                </a>
              </div>
            ))}
          </div>
        </section> */}

        <div className="text-center max-w-5xl mx-auto py-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-cyan-700 font-bold">
            Why choose us?
          </h3>

          <h3 className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-700">
            Several healthcare industries rely upon our surgical instruments and
            want to collaborate with us. Here are some points that can help you
            choose our services.
          </h3>
          <ul className="text-left list-disc list-inside mt-4 text-gray-600">
            <li>
              We have decades of experience that prove our integrity and
              liability.
            </li>
            <li>We provide instruments at affordable prices with discounts.</li>
            <li>
              We have a team of experienced instrument specialists who are
              dedicated to ensuring customer satisfaction.
            </li>
            <li>
              We always provide updated and accurate descriptions of products
              with prices to help customers compare them easily.
            </li>
          </ul>
          <h3 className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-700">
            Want to know more about us or have any queries? Feel free to{" "}
            <Link
              href="https://www.dynamicmedicalsolution.com/contact"
              legacyBehavior
            >
              <a className="text-blue-800 underline font-bold">contact us.</a>
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
};

export default HomeCarosal;

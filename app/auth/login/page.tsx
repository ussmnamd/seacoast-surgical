import Link from "next/link";
import React from "react";
import LoginForm from "./form";

const login = () => {
  return (
    <>
      <section className="">
        <div className=" flex  flex-col items-center justify-center lg:justify-normal px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-4xl ">
                Login into your account
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;

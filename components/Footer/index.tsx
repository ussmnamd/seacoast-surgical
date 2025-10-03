"use client";
import Image from "next/image";
import React from "react";
import { ImFacebook } from "react-icons/im";
import { SiInstagram } from "react-icons/si";
import Link from "next/link";
import { Label } from "../ui/label";
import { LiaLinkedin } from "react-icons/lia";
const Footer = () => {
  // To Open Terms & Conditions to new Tab
  const handleOpenInNewTab = (url: any) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const handleTermsConditionClick = () => {
    const Url = "/TermsConditions";
    handleOpenInNewTab(Url);
  };
  const linkedInUrl = 'https://www.linkedin.com'; 

  return (
    <>
      <div className="pt-10 bottom-0 w-full ">
        <div className=" py-10">
          <div className="flex flex-col space-y-4 justify-center items-center">
            <Image
              width={300}
              height={20}
              src="/images/logo.png"
              alt="gryphon"
              className="h-40 w-fit"
            />
            <div>
              <ul className="flex flex-col space-y-4 md:space-y-0 space-x-0 md:space-x-20  justify-center items-center md:flex-row ">
                <li className="  ">
                  <Link href={"/"}>
                    <Label className="text-lg">Home</Label>
                  </Link>
                </li>
                <li className="">
                  <Link href={"/about"}>
                    <Label className="text-lg">About us</Label>
                  </Link>
                </li>
                <li className="">
                  <Link href={"/contact"}>
                    {" "}
                    <Label className="text-lg">Contact</Label>
                  </Link>
                </li>
                <li className="">
                  <Label>
                    <button
                      className="text-lg"
                      onClick={handleTermsConditionClick}
                    >
                      Terms & Conditions
                    </button>{" "}
                  </Label>
                </li>
                <li className="">
                  <Link href={"/blogs"}>
                    {" "}
                    <Label className="text-lg">Blogs</Label>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2  font-thin">
              <Label className="text-center">© Copy Rights 2026</Label>
              <Label className="text-center">
                All Rights Reserved.{" "}
                {/*<span className="text-red-700">Design By Artema Medical</span>*/}
              </Label>
              <div>
                <ul className="flex flex-row items-center justify-center space-x-3 pt-2">
                  
                  <li>
                    {" "}
                    <Link href={"https://www.linkedin.com/company/seacoast-surgical-llc"} target="_blank">
                      {" "}
                      <LiaLinkedin className="h-11 w-11" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaMapMarked } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-10 px-6 py-12 lg:py-20 w-full">
      <div className="flex flex-row items-center space-x-4">
        <BiSolidPhoneCall className="w-8 h-8 " />
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-lg">
            +(321) 345-7969
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <MdEmail className="w-8 h-8 " />
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-lg">
            sales-team@seacoastsurgical.com
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <FaMapMarked className="w-8 h-8 " />
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-lg">
            1480 Voyager Street NE Palm Bay, FL 32905, USA
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

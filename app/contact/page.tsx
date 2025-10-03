import { BiMap } from "react-icons/bi";
import { BsEnvelope, BsTelephoneForward } from "react-icons/bs";
import ContactForm from "./form";
export default function Contact() {
  return (
    <>
      <div className="">
        {/* Information of the office  */}
        <div className="flex justify-center items-center flex-col">
          <h1 className=" text-3xl md:text-6xl text-center font-semibold text-cyan-800 py-3 ">
            Head Office
          </h1>
          <div>
            <div className="flex flex-row justify-center items-center   py-2">
              <BiMap className="w-10 h-10 text-gray-600 " />
              {/* <span className="text-gray-800 font-medium text-base">10151 Deerwood Park Boulevard Building 200 Suite 250 Jacksonville, FL 32256</span> */}
              <div className="flex flex-col">
                <span className="text-black font-semibold ">
                1480 Voyager Street NE Palm Bay, FL 32905, USA
                </span>
                {/* <span className="text-black font-semibold ">FL 32256</span> */}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between pt-3 space-y-5 md:space-y-0 md:space-x-5 items-center">
              <div className="flex flex-row justify-center items-center space-x-3">
                <BsEnvelope className="w-10 h-10 text-gray-600" />
                <div className="flex flex-col  text-gray-800">
                  <span className="font-bold text-lg text-cyan-700">GENERAL ENQUIRES</span>
                  <span className="text-sm md:text-md">
                   sales-team@seacoastsurgical.com
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center space-x-3">
                <BsTelephoneForward className="w-10 h-10 text-gray-600" />
                <div className="flex flex-col  text-gray-800">
                  <span className="font-bold text-lg text-cyan-700 ">TELEPHONE NUMBER</span>
                  <span>+(321) 345-7969</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Form title  */}
          <h2 className="text-4xl text-center  pr-0  font-semibold text-cyan-700 pt-5 md:py-4">
            Contact Form
          </h2>

          <div className="flex justify-center items-center pt-5 pb-3 px-5 ">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddOTP = () => {
  const router = useRouter();

  //   useEffect(() => {
  //     const { stepgetEmail } = router.query;

  //     // Check if stepgetEmail is not present or is not true
  //     if (!stepgetEmail || stepgetEmail !== "true") {
  //       // Redirect to the forgot password route if stepgetEmail is not true
  //       router.push("/auth/forgot-password");
  //     }
  //   }, []);
  const [input, setinput] = React.useState({
    OTP: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const HandleResendOTP = () => {
    console.log("resend");
  };
  const HandleVerify = async () => {
    console.log("verify", input);
    const res = await axios.post("/api/Email/otp/verify", { OTP: input.OTP });
    const data = res.data;
    if (data.success) {
      router.push("add-otp/UpdatePassword");
    } else {
      toast.error("OTP is not correct");
    }
    const OTPGET = getCookie("Verification-OTP");
    console.log(OTPGET);
    if (OTPGET === input.OTP) {
      console.log("OTP is correct");
    } 
  };
  return (
    <>
      <div className="max-w-md mx-auto  my-20 ">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-4xl ">
          Enter the OTP whose we send to your email
        </h1>
        <form className=" rounded px-8 py-6">
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="OTP"
            >
              OTP:
            </Label>
            <input
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="OTP"
              name="OTP"
              value={input.OTP}
              onChange={handleChange}
              type="text"
              placeholder="Enter OTP"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-5  focus:outline-none focus:shadow-outline"
              type="button"
              onClick={HandleVerify}
            >
              Verify OTP
            </Button>
            <Button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 bg-transparent hover:bg-blue-100">
              Resend OTP
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddOTP;

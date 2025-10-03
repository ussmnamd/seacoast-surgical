"use client";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Registerform = () => {
  const [isloading, setisloading] = useState<boolean>(false);
  const router = useRouter();
  // we use Yup - library for Form Validation
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone number is required"),
  });
  // type of the login form inputs
  type IRegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  };
  // state where we store out Login form inputs
  const [input, setinput] = useState<IRegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  // its help the user to write something in the Login input field
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // Handle the submit Form
  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Validate the form data
      await validationSchema.validate(input, { abortEarly: false });
    } catch (error: any) {
      // If validation fails, display validation errors to the user using toast
      const errString: string = "Please fill all the fields";
      toast.error(errString, {
        style: { backgroundColor: "#d41212", color: "white" },
      });
    }

    try {
      const res = await axios.post("/api/auth/register", {...input});

      const data = res.data;
      if (data.success) {
        setisloading(false);
        toast.success("registered successfully");
        router.push("/auth/login");
      } else {
        // Authentication failed, display error message
        console.log(data.message);
        toast.error("Registration failed, Please try again");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        // If there's a specific error message from the backend, display it
        toast.error(error.response.data.message || "An error occurred");
      } else {
        // If no specific error message is available, display a generic error message
        toast.error("An error occurred");
      }
    } finally {
      setisloading(false);
    }
  };
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0  md:justify-around md:space-x-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={input.first_name}
              id="first_name"
              placeholder="john"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required={true}
              autoComplete={"true"}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={input.last_name}
              id="last_name"
              placeholder="Bride"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required={true}
              autoComplete={"true"}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            id="email"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            id="phone"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="11198272983"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Address
          </label>
          <input
            type="text"
            name="address"
            value={input.address}
            id="address"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            autoComplete={"true"}
            onChange={handleChange}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmitLogin}
          disabled= {isloading}
          className="w-full text-white bg-blue-800 hover:bg-blue-600/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Create an account
        </button>
        <p className="text-base font-normal text-gray-800 ">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="font-medium text-primary-600 hover:underline "
          >
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Registerform;

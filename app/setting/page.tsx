"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchLoggedUser } from "@/lib/Fetcher/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/getToken";
import axiosInstance from "@/config/axios";

export default function Setting() {
  // Query to get User
  const {
    data: User,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["User"],
    queryFn: fetchLoggedUser,
  });

  const [isloading, setisloading] = useState<boolean>(false);
  const router = useRouter();
  // we use Yup - library for Form Validation
  const validationSchema = Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string(),

    current_password: Yup.string(),
    // new_password: Yup.string(),
    address: Yup.string().nullable(),
  });
  // type of the login form inputs
  type IRegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    current_password: string;
    new_password: string;
  };
  // state where we store out Login form inputs
  const [input, setinput] = useState<IRegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    current_password: "",
    new_password: "",
  });
  // Function to split user name into first name and last name and update the input state
  const splitNameAndUpdateInput = () => {
    if (!isUserLoading && User && User.name) {
      const splitName = User.name.split(" ");
      const firstName = splitName[0];
      const lastName = splitName.slice(1).join(" "); // in case last name has multiple parts
      const { email, phone, address } = User;
      setinput((prevState) => ({
        ...prevState,
        email,
        phone,
        address,
        current_password: "",
        new_password: "",
        first_name: firstName,
        last_name: lastName,
      }));
    }
  };
  // Check if user data is loaded and update input fields with user data
  React.useEffect(() => {
    splitNameAndUpdateInput();
  }, [isUserLoading, User]);

  // its help the user to write something in the Login input field
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle mutation
  const token = getToken();
  const client = useQueryClient();
  const SubmitChanges = useMutation({
    mutationFn: ({ updatedFields }: { updatedFields: any }) => {
      console.log(updatedFields);
      return axiosInstance.post(`api/update-user`, updatedFields, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["User"] });
      client.refetchQueries({ queryKey: ["User"] });
      toast.success("Profile Updated Successfully");
    },
    onError(error) {
      console.log(error);
      toast.error(`Error : ${error.message}`);
    },
  });
  // Handle the submit Form
  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const nonPasswordModified =
      input.first_name !== User?.name.split(" ")[0] ||
      input.last_name !== User?.name.split(" ").slice(1).join(" ") ||
      input.address !== User?.address;

    if (!nonPasswordModified) {
      toast.error("No changes detected in non-password fields.");
      return;
    }

    if (nonPasswordModified && input.current_password === "") {
      toast.error(
        "Please enter your current password to update non-password fields."
      );
      return;
    }

    if (input.current_password === input.new_password) {
      toast.error("New password must be different from current password");
      return;
    }

    try {
      // Validate the form data
      await validationSchema.validate(input, { abortEarly: false });
    } catch (error: any) {
      console.log(error);
      // If validation fails, display validation errors to the user using toast
      const errString: string = error.errors[0];
      toast.error(errString, {
        style: { backgroundColor: "#d41212", color: "white" },
      });
      return;
    }

    // Create a new object excluding the 'input' fields
    const updatedFields = { ...input };
    delete (updatedFields as Partial<typeof updatedFields>).email;
    delete (updatedFields as Partial<typeof updatedFields>).phone;

    console.log(updatedFields);
    SubmitChanges.mutate({ updatedFields });
  };
  return (
    <div className="px-5 flex justify-center items-center">
      <div className="px-5 space-y-4">
        <div className="text-center text-xl font-semibold">Update Profile</div>{" "}
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
              disabled={true}
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
              disabled={true}
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
              htmlFor="current_password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              value={input.current_password}
              autoComplete={"true"}
              onChange={handleChange}
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={input.new_password}
              autoComplete={"true"}
              onChange={handleChange}
              id="new_password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={true}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmitLogin}
            disabled={isloading}
            className="w-full text-white bg-blue-800 hover:bg-blue-600/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import axiosInstance from "@/config/axios";
import { getToken } from "@/lib/getToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Page = (props: any) => {
  const email: string = props.params.email;
  console.log(email);
  type IUpdateForm = {
    new_password: string;
    again_Password: string;
  };
  // state where we store out IUpdateForm form inputs
  const [input, setinput] = React.useState<IUpdateForm>({
    new_password: "",
    again_Password: "",
  });
  // its help the user to write something in the input field
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // handle mutation
  const token = getToken();
  const client = useQueryClient();
  const router = useRouter();
  const SubmitChanges = useMutation({
    mutationFn: ({
      updatedFields,
      email,
    }: {
      updatedFields: any;
      email: any;
    }) => {
      console.log(updatedFields);
      return axiosInstance.post(
        `api/update-user-password`,
        { email, password: input.new_password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Password Updated Successfully");
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
      toast.error(`Error : ${error.message}`);
    },
  });
  const handleSubmit = () => {
    if (input.new_password !== input.again_Password) {
      toast.error("Password is not match");
    }
    const email = getCookie("Verification-Email");

    SubmitChanges.mutate({ updatedFields: input, email });
  };
  return (
    <>
      <div className=" flex  flex-col items-center justify-center lg:justify-normal px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-4xl ">
              Write Your New Password
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={input.new_password}
                  autoComplete={"true"}
                  onChange={handleChange}
                  name="new_password"
                  id="new_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="again_Password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={input.again_Password}
                  autoComplete={"true"}
                  onChange={handleChange}
                  name="again_Password"
                  id="again_Password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-blue-800 hover:bg-blue-600/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

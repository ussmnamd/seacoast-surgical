/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios";
import { fetchCart } from "@/lib/Fetcher/Cart";
import { fetchLoggedUser } from "@/lib/Fetcher/User";
import { getEdgePoint } from "@/lib/getEdge";
import { getToken } from "@/lib/getToken";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import axios from "axios";
const Page = () => {
  // Query to get all Cart
  const {
    data: allCart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: fetchCart,
  });
  const {
    data: User,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["User"],
    queryFn: fetchLoggedUser,
  });

  const edge = getEdgePoint();
  const token = getToken();

  const client = useQueryClient();
  const deleteCart = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return axiosInstance.delete(`api/delete-from-cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Cart"] });
      client.refetchQueries({ queryKey: ["Cart"] });
      toast.success("Item Deleted");
    },
    onError(error) {
      toast.error(`Error : ${error.message}`);
    },
  });
  const HandleDeleteItem = (cardId: number) => {
    // console.log("cardId:    ", cardId);
    if (token.length > 0) {
      deleteCart.mutate({
        id: cardId,
      });
    } else {
      // console.log("function called");
      const localCartJSON = localStorage.getItem("cart");
      // console.log(localCartJSON);
      if (localCartJSON) {
        // console.log("function called");
        const localCart = JSON.parse(localCartJSON);
        const updatedCart = localCart.filter(
          (item: any) =>
            // console.log(item.id),
            item.id !== cardId
        );
        // console.log(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      window.location.reload();
    }
  };
  const addQRF = useMutation({
    mutationFn: () => {
      return axiosInstance.get(`api/add-client-query`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Cart"] });
      client.refetchQueries({ queryKey: ["Cart"] });
      toast.success("Inquiry Sent Successfully");
    },
    onError(error) {
      toast.error(`Error ${error.message}`);
    },
  });
  

  const HandleSendQuery = async () => {
    // console.log("Sending email..., allCart:", allCart);
    // Log the data being sent
    const dataToSend = {
      email: User?.email,
      cartItems: allCart.map((item: any) => ({
        product_name: item.product?.product_name || item?.product_name,
        product_description: item.product?.product_description || item?.product_description,
        sku: item.sku,
        size: item.product_size || item.size,
        quantity: item.quantity,
        price_per_item: item.product?.price || item.product_price,
        total_price: item.totalPriceOfProduct || item.product_price * item.quantity,
      })),
    };

  
    try {
      const response = await axios.post(
        "/api/send_quote",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check the response
      console.log("Response data:", response.data);
  
      if (response.data.message === "Emails sent successfully") {
        toast.success("Emails Sent Successfully");
        addQRF.mutate();
      } else {
        throw new Error(response.data.message || "Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "An unknown error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  
  
  
  
  if (isError) {
    return <div className="text-center py-10">Error Occurred</div>;
  }
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="md:text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[28px]  font-semibold leading-tight">Cart</div>
        </div>
      </div>
    );
  }
  if (allCart) {
    return (
      <div className="min-h-screen">
        <div className="md:text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[28px]  font-semibold leading-tight">Cart</div>
        </div>
        {allCart.length == 0 ? (
          <div className="text-center py-10">No item added</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 py-10 px-4">
            <div className="flex-[2] px-5">
              <div className="text-lg font-bold">Cart Items</div>
              {allCart &&
                allCart.map((item: any, key: number) => {
                  return (
                    <div key={key}>
                      <div className="flex  py-5 gap-3 md:gap-5 border-b ">
                        {/* IMAGE START */}
                        <div className="shrink-0 aspect-square  w-[80px] md:w-[120px]">
                          <img
                            src={`${edge}/product_images/${
                              item.product?.product_image || item.product_image
                            }`}
                            alt={""}
                            className="h-40 w-[90px]"
                            width={140}
                            height={120}
                          />
                        </div>
                        {/* IMAGE END */}

                        <div className="w-full flex flex-col">
                          <div className="">
                            {/* PRODUCT TITLE */}
                            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                              <div>
                                {item.product?.product_name ||
                                  item?.product_name}
                              </div>
                            </div>
                            {/* PRODUCT SUBTITLE */}
                            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                              {item.product?.product_description ||
                                item?.product_description}
                            </div>
                            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                              <b>SKU : </b>
                              {item.sku}
                            </div>

                            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                              <b> Size : </b>
                              {item.product_size || item.size}
                            </div>
                            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                              <b>Quantity : </b>
                              {item.quantity}
                            </div>
                            <div className="text-md font-medium text-black/[0.5]  block md:hidden">
                              <b>Price per item :</b> $
                              {item.product?.price || item.product_price}
                            </div>
                            <div className="text-md font-medium text-black/[0.5]  block md:hidden">
                              <b>Total price of item :</b> $
                              {item.totalPriceOfProduct ||
                                item.product_price * item.quantity}
                            </div>
                          </div>
                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>Product Description :</b>{" "}
                            {item.product?.product_description ||
                              item.product_description}
                          </div>
                          {/* PRODUCT Sku */}
                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>SKU :</b> {item.sku}
                          </div>
                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>Size :</b> {item.size || item.product_size}
                          </div>

                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>Quantity :</b> {item.quantity}
                          </div>
                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>Price per item :</b> $
                            {item.product?.price || item.product_price}
                          </div>
                          <div className="text-md font-medium text-black/[0.5] hidden md:block">
                            <b>Total price of item :</b> $
                            {item.quantity * item.product?.price ||
                              item.product_price * item.quantity}
                          </div>
                          <div className="flex items-center justify-end mt-4">
                            <Button
                              className=" bg-white hover:bg-gray-100 "
                              onClick={() => HandleDeleteItem(item.id)}
                            >
                              <RiDeleteBin6Line className="  text-[16px] md:text-[19px] text-black hover:text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex-[1] ">
              <div className="w-full lg:max-w-xl sticky top-10">
                <div className="text-lg font-bold pb-3">Action</div>
                {token.length == 0 ? (
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button className="w-full mb-2 bg-blue-700 text-center hover:bg-blue-600  text-white ">
                        Request Quote
                      </Button>
                    </DialogTrigger>
                    <div className="bg-white">
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Login Required</DialogTitle>
                          <DialogDescription>
                            Login with your account to Proceed further 👉
                            <Link
                              href={"/auth/login"}
                              className="font-bold text-mdl animate-pulse text-orange-400"
                            >
                              {" "}
                              Login
                            </Link>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              className="bg-blue-700 hover:bg-blue-500 hover:text-gray-100 text-white"
                              // variant="secondary"
                            >
                              Close
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Link href={"/auth/register"}>
                              <Button
                                type="submit"
                                className="hidden lg:block hover:bg-blue-500 hover:text-gray-100  px-5 py-2.5 text-sm font-medium bg-blue-700 text-white"
                              >
                                Create Account
                              </Button>
                            </Link>
                            {/* <Link href={"/auth/login"}>
                              <Button
                                type="submit"
                                className="hidden lg:block  px-5 py-2.5 text-sm font-medium text-white hover:bg-black hover:scale-105 duration-500 rounded-xl bg-gradient-to-br from-black to-slate-600"
                              >
                                Login
                              </Button>
                            </Link> */}
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </div>
                  </Dialog>
                ) : (
                  <Button
                    className="w-full mb-2  text-center bg-blue-600 text-white rounded-xl"
                    onClick={HandleSendQuery}
                  >
                    Request Quote
                  </Button>
                )}
                {/* <CheckOut deleteProduct={HandleDeleteItem} /> */}
                {token.length != 0 ? (
                  <div>
                    <div className="text-lg font-bold pt-3">
                      Your Information{" "}
                    </div>
                    <ul>
                      <li>
                        <span className="font-semibold">Name : </span>
                        <span>{User && User.name}</span>
                      </li>
                      <li>
                        <span className="font-semibold">Email : </span>
                        <span>{User && User.email}</span>
                      </li>
                      <li>
                        <span className="font-semibold">Phone : </span>
                        <span>{User && User.phone}</span>
                      </li>
                      <li>
                        <span className="font-semibold">Address : </span>
                        <span>{User && User.address}</span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="text-center mt-14 text-xl font-bold animate-pulse">
                    You are Not Signed in!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Page;

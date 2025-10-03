"use client";

import axiosInstance from "@/config/axios";
import { fetchSearchProducts } from "@/lib/Fetcher/Search";
import { getToken } from "@/lib/getToken";

import { NextPage } from "next";

import toast from "react-hot-toast";
import {
  ParticularSubCategoryProducts,
  fetchCategoriesNames,
} from "@/lib/Fetcher/Categories";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { getEdgePoint } from "@/lib/getEdge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface Props {
  query: string;
}
// TSX
const SearchedProducts: NextPage<Props> = ({ query }) => {
  // Query to get Searched Products
  const {
    data: Products,
    isFetching,
    isLoading: isProductsLoading,
    isError,
  } = useQuery({
    queryKey: ["query", query],
    queryFn: () => fetchSearchProducts(query),
  });

  const [productQuantities, setProductQuantities] = React.useState<{
    [key: number]: number;
  }>({});
  const [productSKUs, setProductSKUs] = React.useState<{
    [key: number]: string;
  }>({});
  const [productTotalPrices, setProductTotalPrices] = useState<{ [key: number]: number }>({});

  const handleIncrementQuantity = (productId: number,price:any) => {
    const priceNumber = parseFloat(price);
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,

    }));
    setProductTotalPrices((prevTotalPrices) => ({
      ...prevTotalPrices,
      [productId]: (prevTotalPrices[productId] || priceNumber) + priceNumber,
     
    }));

  };

  const handleDecrementQuantity = (productId: number,price: number) => {
    if (productQuantities[productId] && productQuantities[productId] > 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
    setProductTotalPrices((prevTotalPrices) => {
      const currentTotalPrice = prevTotalPrices[productId] || 0;
      return {
        ...prevTotalPrices,
        [productId]: currentTotalPrice > price ? currentTotalPrice - price : 0,
      };
    });
  };
  const token = getToken();
  const client = useQueryClient();
  const AddCart = useMutation({
    mutationFn: ({
      product_id,
      quantity,
      sku,
    }: {
      product_id: number;
      quantity: number;
      sku: string;
    }) => {
      return axiosInstance.post(
        `api/add-to-cart`,
        {
          product_id,
          quantity,
          sku,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Cart"] });
      client.refetchQueries({ queryKey: ["Cart"] });
      toast.success("Cart Updated");
    },
    onError(error: any) {
      toast.error(`Error : ${error.message} `);
    },
  });
  const edge = getEdgePoint();
  const handleAddToCart = (product: any) => {
    product.product_sizes.product_size
        const quantity = productQuantities[product.id] || 1;
        let selectedSKU: string = productSKUs[product.id];
        const totalPriceOfProduct=productTotalPrices[product.id];
        if (!selectedSKU && product.product_sizes.length > 0) {
            selectedSKU = product.product_sizes[0].product_sku;
        }
        const addedProduct = {
            id: product.id,
            quantity,
            sku: selectedSKU,
            product_name: product.product_name,
            product_image: product.product_image,
            product_description:product.product_description,
            product_price:product.price
        };
    
        const addedLocalProduct={
          id: product.id,
            quantity,
            sku: selectedSKU,
            product_name: product.product_name,
            product_image: product.product_image,
            product_description:product.product_description,
            product_price:product.price,
            totalPriceOfProduct
        }

    
        if (token.length == 0) {
            // No token, store in local storage
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(addedLocalProduct);
            localStorage.setItem('cart', JSON.stringify(cart));
            toast.success("Product added to cart");
        } else {
            // User is logged in, add directly to server-side cart
            AddCart.mutate({
                product_id: product.id,
                quantity,
                sku: addedProduct.sku,
            });
        }
      };
  if (isFetching && isProductsLoading) {
    return (
      <div className="h-screen bg-gray-100 rounded-xl animate-pulse p-20">
        {" "}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-screen bg-gray-100 rounded-xl  p-20 flex justify-center items-center">
        <h1 className="font-semibold text-2xl">No Result found</h1>
      </div>
    );
  }
  if (Products.length == 0) {
    return (
      <div className="h-screen bg-gray-100 rounded-xl  p-20 flex justify-center items-center">
        <h1 className="font-semibold text-2xl">No Result found</h1>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-2 pt-5 ">
          {Products &&
            Products.map((product: any, index: any) => {
              return (
                <div
                  key={index}
                  className="  p-2 hover:shadow-md flex flex-col justify-between "
                >
                  <div>
                    <Image
                      width={450}
                      height={700}
                      alt="Product image"
                      className="object-contain h-[300px]   min-h-[300px] rounded-2x"
                      src={`${edge}/product_images/${product.product_image}`}
                    />
                  </div>
                  <div className="pt-2">
                    <div className="">
                      <div className="flex justify-between items-start ">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {product.product_name}
                        </h5>
                      </div>
                      <div className="flex my-1 text-lg">
                        <b>Price:</b>
                        <div className="ml-3">${product.price}</div>
                      </div>
                      <div className="bottom-0">
                        <div className="flex flex-col md:flex-row md:justify-between  space-x-0.5">
                          <select
                            id="quantities"
                            onChange={(e) => {
                              const selectedOption = e.target.value;
                              const extractedSKU =
                                selectedOption.split("SKU : ")[1];
                              setProductSKUs({
                                ...productSKUs,
                                [product.id]: extractedSKU,
                              });
                            }}
                            className=" bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {product.product_sizes.map((sk: any, i: any) => {
                              return (
                                <option
                                  key={i}
                                  className="flex justify-around items-center "
                                >
                                  <span>Size : {sk.product_size}</span>{" "}
                                  <span>SKU : {sk.product_sku}</span>
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex items-center justify-center pt-4 space-x-3">
                                <Button
                                  className=" rounded-full bg-blue-800 hover:bg-blue-700 py-2 px-4 "
                                  onClick={() =>
                                    handleDecrementQuantity(product.id,product.price)
                                  }
                                >
                                  -
                                </Button>
                                <div
                                  id="number-input"
                                  aria-describedby="helper-text-explanation"
                                  className="bg-gray-50 border mt-4 md:mt-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-light-secondary focus:border-light-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-light-secondary dark:focus:border-light-secondary text-center"
                                >
                                  {" "}
                                  {productQuantities[product.id] || 1}
                                </div>
                                <Button
                                  className=" rounded-full  py-2 px-4 bg-blue-800 hover:bg-blue-700"
                                  onClick={() =>
                                    handleIncrementQuantity(product.id,product.price)
                                  }
                                >
                                  +
                                </Button>
                              </div>
                      </div>

                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="flex justify-end items-center">
                            Description
                          </AccordionTrigger>
                          <AccordionContent>
                            {product.product_description}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="py-2">
                              {/* {token.length == 0 ? (
                                <Dialog>
                                  <DialogTrigger className="w-full">
                                    <Button
                                      className="w-full bg-gradient-to-tr
                                      from-orange-600 to-orange-300"
                                    >
                                      Add to cart
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Login Required</DialogTitle>
                                      <DialogDescription>
                                        Login with your account to add products
                                        into your cart
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          // variant="secondary"
                                        >
                                          Close
                                        </Button>
                                      </DialogClose>
                                      <DialogClose asChild>
                                        <Link href={"/auth/register"}>
                                          <Button
                                            type="submit"
                                            className="hidden lg:block rounded-md px-5 py-2.5 text-sm font-medium text-white transition  bg-light-secondary hover:bg-light-secondary/80"
                                          >
                                            Create Account
                                          </Button>
                                        </Link>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              ) :
                               ( */}
                                <Button
                                  onClick={() => handleAddToCart(product)}
                                  className="w-full bg-blue-800 hover:bg-blue-700"
                                >
                                  Add to cart
                                </Button>
                              {/* )} */}
                            </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default SearchedProducts;

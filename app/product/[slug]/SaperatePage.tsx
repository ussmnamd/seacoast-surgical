"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getEdgePoint } from "@/lib/getEdge";
import { getToken } from "@/lib/getToken";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchParticularProduct } from "@/lib/Fetcher/Categories";
import axiosInstance from "@/config/axios";
import { AnyARecord } from "dns";
import Image from "next/image";

const SeparatePage = ({ slug }: { slug: any }) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["SeparateProduct", slug],
    queryFn: () => FetchParticularProduct(slug),
  });

  // const [productQuantities, setProductQuantities] = useState<number>(1);
  // const [productSKUs, setProductSKUs] = useState<string>();
  const [productQuantities, setProductQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [productSKUs, setProductSKUs] = useState<{
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
  const edge = getEdgePoint();
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
    onError(error) {
      toast.error(`Error : ${error.message} `);
    },
  });

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
      console.log(addedLocalProduct);
    
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
  if (isLoading) {
    return <div className="min-h-screen"></div>;
  }

  if (isError || !product) {
    return <div>Error loading product details.</div>;
  }
  if (!isError && product) {
    return (
      <>
        <section className="overflow-hidden bg-white  font-poppins dark:bg-gray-800">
          <div className="max-w-7xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full  h-64 pb-6 px-4 md:w-1/2 ">
                <Image
                  src={`${edge}/product_images/${product.product_image}`}
                  alt=""
                  height={200}
                  width={500}
                  className="md:w-1/2 object-contain  lg:object-center w-full  h-64 shadow-lg md:h-96  rounded"
                />
              </div>
              <div className="w-full px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="mb-8 ">
                    <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                      {product.product_name}
                    </h2>
                    <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                      {product.product_description}
                    </p>
                  </div>

                  {/* <div className="flex my-1 text-lg">
                    <b>Price:</b>
                    <div className="ml-3">${product.price}</div>
                  </div> */}

                  <div className="flex flex-col justify-start items-start mb-8 space-y-3">
                    <h1 className="w-full text-xl font-bold dark:text-gray-400">
                      SKU&apos;s & Size :
                    </h1>
                    <ToggleGroup
                      onValueChange={(value: any) => {
                        console.log(value);
                        setProductSKUs(value);
                      }}
                      type="single"
                      className="flex flex-col space-y-3 justify-start items-start"
                    >
                      {product.product_sizes.map((sk: any, index: number) => {
                        return (
                          <ToggleGroupItem value={sk.product_sku} key={index}>
                            <div>
                              <span>
                                <b> SKU :</b> <span>{sk.product_sku}</span>
                              </span>{" "}
                              <span>
                                <b> Size :</b> <span>{sk.product_size}</span>
                              </span>{" "}
                            </div>
                          </ToggleGroupItem>
                        );
                      })}
                    </ToggleGroup>
                  </div>
                  <div className="w-full mb-8 ">
                    <label className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">
                      Quantity
                    </label>
                    <div className="flex items-center justify-center pt-4 space-x-3">
                      <Button
                        className=" rounded-full bg-gradient-to-tr
                            from-blue-800 to-blue-700 py-2 px-4 "
                        onClick={() =>  handleDecrementQuantity(product.id,product.price)}
                      >
                        -
                      </Button>
                      <div
                        id="number-input"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border lg:mt-4 md:mt-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                      >
                        {" "}
                        {productQuantities[product.id] || 1}
                      </div>
                      <Button
                        className=" rounded-full  py-2 px-4 bg-gradient-to-tr
                        from-blue-800 to-blue-700"
                        onClick={() =>  handleIncrementQuantity(product.id,product.price)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="w-full  mb-4  lg:mb-0">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-tr
                      from-blue-800 to-blue-700"
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default SeparatePage;

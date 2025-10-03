"use client";
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
import { getToken } from "@/lib/getToken";
import axiosInstance from "@/config/axios";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { ChevronDownIcon, XIcon } from "lucide-react";

const SubCategoryProducts = ({ slug }: { slug: any }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [selectedSize, setSelectedSize] = useState("");
  const handleSelectChange = (e:any, productId:number) => {
    const selectedOption = e.target.value;
    console.log(selectedOption);
    const extractedSKU = selectedOption.split("SKU : ")[1];
    const extractedSize = selectedOption.split("SKU : ")[0].split("Size : ")[1].trim();
  
    setProductSKUs({
      ...productSKUs,
      [productId]: extractedSKU,
    });
  
    setSelectedSize(extractedSize);
  };
  const edge = getEdgePoint();
  // Query to get all Categories names
  const { ref, inView } = useInView();
  const {
    data: allProducts,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetching,
    isError,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["subCategoriesProducts", slug],
    queryFn: ({ pageParam }) =>
      ParticularSubCategoryProducts(slug, pageParam),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage: any) =>
      firstPage.current_page - 1 ?? undefined,
    getNextPageParam: (lastPage: any) => lastPage.current_page + 1 ?? undefined,
  });
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  // Query to get all Categories names
  const { data: allCategories, isLoading: isCategoriesloading } = useQuery({
    queryKey: ["Categories"],
    queryFn: fetchCategoriesNames,
  });

  const [productQuantities, setProductQuantities] = React.useState<{
    [key: number]: number;
  }>({});
  const [productSKUs, setProductSKUs] = React.useState<{
    [key: number]: string;
  }>({});
  const [productTotalPrices, setProductTotalPrices] = useState<{ [key: number]: number }>({});

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleIncrementQuantity = (productId: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleDecrementQuantity = (productId: number) => {
    if (productQuantities[productId] && productQuantities[productId] > 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
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
    onError(error) {
      toast.error(`Error : ${error.message} `);
    },
  });
  const handleAddToCart = (product:any) => {
    const quantity = productQuantities[product.id] || 1;
    
    const totalPriceOfProduct = productTotalPrices[product.id];
    let selectedSKU = productSKUs[product.id];
    let size = selectedSize;
  
    if (!selectedSKU && product.product_sizes.length > 0) {
      selectedSKU = product.product_sizes[0].product_sku;
      size = product.product_sizes[0].product_size;
    }
    const addedProduct = {
      id: product.id,
      quantity,
      sku: selectedSKU,
      product_name: product.product_name,
      product_image: product.product_image,
      product_description: product.product_description,
      product_price: product.price,
      product_size: selectedSize,
    };
    const addedLocalProduct = {
      id: product.id,
      quantity,
      sku: selectedSKU,
      product_name: product.product_name,
      product_image: product.product_image,
      product_description: product.product_description,
      product_price: product.price,
      product_size: selectedSize,
      totalPriceOfProduct,
    };
  
   
  
    if (token.length == 0) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(addedLocalProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart");
    } else {
      AddCart.mutate({
        product_id: product.id,
        quantity,
        sku: addedProduct.sku,
      });
    }
  };
  
  if (isFetching && isLoading) {
    return (
      <div className="h-screen bg-gray-100 rounded-xl animate-pulse p-20">
        {" "}
      </div>
    );
  }
  if (!isError && allProducts) {
    return (
      <div className="flex flex-col lg:flex-row  gap-4 ">
         <div className="hidden lg:block lg:w-1/3 xl:w-1.5/5 2xl:w-1/4 flex flex-col space-y-2 justify-start items-start p-4 rounded-lg bg-gray-200 text-gray-800 ">
          <h1 className="text-2xl pb-3">Categories</h1>
          {allCategories &&
            allCategories.map((category: any, index: number) => (
              <div
                key={index}
                className="flex space-x-2"
              >
                <span>{index + 1}.</span>
                <Link href={`/categories/${category.category_slug}`}>
                  {category.category_name}
                </Link>
              </div>
            ))}
        </div>
        <button
      className="lg:hidden flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mb-4"
      onClick={toggleDropdown}
    >
      {showDropdown ? (
        <>
          <XIcon className="w-4 h-4 mr-2" /> Close Categories
        </>
      ) : (
        <>
          <ChevronDownIcon className="w-4 h-4 mr-2" /> Categories
        </>
      )}
    </button>

        {/* Dropdown menu for categories */}
        <div
          className={`lg:w-1/3 xl:w-1/5 flex flex-col space-y-2 justify-start items-start p-4 rounded-lg bg-gray-200 text-gray-800 ${
            showDropdown ? "block" : "hidden"
          }`}
        >
          <h2 className="text-2xl pb-3">Categories</h2>
          {allCategories &&
            allCategories.map((category: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-2"
              >
                <span>{index + 1}.</span>
                <Link href={`/categories/${category.category_slug}`}>
                  {category.category_name}
                </Link>
              </div>
            ))}
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-2 pt-5 ">
          {allProducts &&
  allProducts.pages.map((page) => (
    <React.Fragment key={page.currentPage}>
      {page.data.map((product:any, index:number) => (
        <div key={index} className="p-2 hover:shadow-md flex flex-col justify-between">
          <div>
            <Dialog>
              <DialogTrigger>
                <img
                  width={450}
                  height={700}
                  alt="Product image"
                  className="object-contain h-[300px] min-h-[300px] rounded-2x"
                  src={`${edge}/product_images/${product.product_image}`}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{product.product_name}</DialogTitle>
                  <DialogDescription>
                    <img
                      width={450}
                      height={700}
                      alt="Product image"
                      className="object-contain h-[500px] min-h-[500px] rounded-2x"
                      src={`${edge}/product_images/${product.product_image}`}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="pt-2">
            <div>
              <div className="flex justify-between items-start">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link
                    href={`/product/${product.slug}`}
                    className="mb-2 text-2xl font-bold hover:underline tracking-tight text-gray-900 dark:text-white"
                  >
                    {product.product_name}
                  </Link>
                </h5>
              </div>
              <div className="flex my-1 text-lg">
                <b>Price:</b>
                <div className="ml-3">${product.price}</div>
              </div>
              <div className="bottom-0">
                <div className="flex flex-col md:flex-row md:justify-between space-x-0.5">
                  <select
                    id="quantities"
                    onChange={(e) => handleSelectChange(e, product.id)}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {product.product_sizes.map((sk:any, i:any) => (
                      <option key={i} className="flex justify-around items-center">
                        <span>Size : {sk.product_size}</span>{" "}
                        <span>SKU : {sk.product_sku}</span>
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-center pt-4 space-x-3">
                  <Button
                    className="rounded-full bg-blue-800 hover:bg-blue-700 py-2 px-4"
                    onClick={() => handleDecrementQuantity(product.id)}
                  >
                    -
                  </Button>
                  <div
                    id="number-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border mt-4 md:mt-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                  >
                    {productQuantities[product.id] || 1}
                  </div>
                  <Button
                    className="rounded-full py-2 px-4 bg-blue-800 hover:bg-blue-700"
                    onClick={() => handleIncrementQuantity(product.id)}
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
                  <AccordionContent>{product.product_description}</AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="py-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-800 hover:bg-blue-700"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  ))}
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="flex justify-center items-center"
            >
              {isFetchingNextPage ? (
                <div
                  role="status "
                  className="flex justify-center items-center"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : hasNextPage ? (
                ""
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SubCategoryProducts;

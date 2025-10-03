"use client";
import {
  ParticularSubCategory,
  fetchCategoriesNames,
} from "@/lib/Fetcher/Categories";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";



const Category = ({ slug }: { slug: any }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

    // Query to get all Categories names
   
    const { data: allSubCategories } = useQuery({
      queryKey: ["subCategories", slug],
      queryFn: () => ParticularSubCategory(slug),
    });
    // Query to get all Categories names
    const { data: allCategories, isLoading: isCategoriesloading } = useQuery({
      queryKey: ["Categories"],
      queryFn: fetchCategoriesNames,
    });

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    if (!allSubCategories && !allCategories) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
      );
    }
  
    
  
    return (
      <div className="p-4">
        <div className="flex flex-col lg:flex-row  gap-4 ">
        <div className="hidden lg:block lg:w-1/3 xl:w-1/5 flex flex-col space-y-2 justify-start items-start p-4 rounded-lg bg-gray-200 text-gray-800 ">
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
          <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
            <h2 className="text-2xl py-3">
              {allSubCategories && allSubCategories.category.category_name}
            </h2>
            <div className=" rounded-lg grid md:grid-cols-3 xl:grid-cols-5   gap-5 ">
              {allSubCategories &&
                allSubCategories.subcategories.map((sub: any, index: any) => {
                  return (
                    <Link
                      href={`/products/${sub.sub_category.sub_category_slug}`}
                      key={index}
                      className=" border border-gray-200 text-center p-3 w-56 shadow-sm hover:shadow-gray-900 rounded-lg cursor-pointer"
                    >
                      {sub.sub_category.sub_category_name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Category;
  
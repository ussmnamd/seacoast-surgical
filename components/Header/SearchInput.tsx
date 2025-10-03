"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (searchInput.trim() !== "") {
      const formattedInput = searchInput.trim().replace(/[\s/]+/g, " ");
      router.push(`/search/${formattedInput}`);
    }
  };

  const handleButtonClick = () => {
    if (searchInput.trim() !== "") {
      const formattedInput = searchInput.trim().replace(/[\s/]+/g, " ");
      router.push(`/search/${formattedInput}`);
    }
  };

  if (pathname == "/auth/login" || pathname == "/auth/register") {
    return <></>;
  } else {
    return (
      <>
        <form
          onSubmit={handleFormSubmit}
          className="relative border rounded-md p-0.5"
        >
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="Search"
            placeholder="Search Products..."
            className="w-full rounded-md border-accent px-2 py-2.5 pe-10 shadow-sm sm:text-sm"
            value={searchInput}
            onChange={handleInputChange}
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-accent-foreground hover:text-dark-secondSecondary"
              onClick={handleButtonClick}
            >
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </form>
      </>
    );
  }
};

export default SearchInput;

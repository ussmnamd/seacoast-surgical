/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import ProductDropDown from "./ProductDropDown";
import { getToken } from "@/lib/getToken";
import UserDropDown from "../UserDropDown/UserDropDown";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import InfoButton from "./InfoButton";
import Image from "next/image";

const Header = () => {

  const [Navbar, setNavbar] = React.useState<"hidden" | "">("hidden");
  const ToggleNavbar = () => {
    setNavbar((prev) => {
      if (prev == "hidden") {
        return "";
      } else {
        return "hidden";
      }
    });
  };

  return (
    <div className="w-full top-0 start-0 pb-5  z-10">
      <header className=" bg-cyan-600 ">
        <div className=" flex h-16 py-10 items-center gap-0  sm:px-6 lg:px-3">
          <Link className="block text-teal-600 lg:mt-4 2xl:mr-3" href="/">
            <span className="sr-only">Home</span>

            <Image src="/images/logo.png" className="xl:w-36" height={100} width={100} alt=" Logo" />

          </Link>

          <div className="flex flex-1 items-center justify-end lg:justify-between">
            <nav aria-label="Global" className="hidden lg:block ml-6">
              <ul className="flex items-center justify-between gap-6 2xl:gap-8 text-sm">
                <li>
                  <Link
                    className="text-emerald-50 font-semibold text-lg transition hover:text-cyan-200"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-emerald-50 font-semibold text-lg transition hover:text-cyan-200"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-emerald-50 font-semibold text-lg transition hover:text-cyan-200"
                    href="/certification"
                  >
                    Certification
                  </Link>
                </li>
                <li>
                  <ProductDropDown />
                </li>
                <li>
                  <Link
                    className="text-emerald-50 font-semibold text-lg transition hover:text-cyan-200"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <InfoButton />
              <CartButton />
              <div className="sm:flex sm:gap-4 hidden md:block">
                <UserDropDown />
              </div>

              <button
                className="block rounded bg-gray-100 p-2.5 pr-5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
                onClick={ToggleNavbar}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 flex justify-end ">
          <div className="sm:flex  w-[40%] sm:gap-4 hidden md:block">
            <SearchInput />
          </div>
        </div>
        {/* // Mobile Navbar */}
        <nav className={`lg:hidden ${Navbar}`} id="navbar-dropdown">
          <div className="px-5 pb-5">
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  className="text-emerald-50 font-semibold text-lg transition hover:text-emerald-200"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-emerald-50 font-semibold text-lg transition hover:text-emerlad-200"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-emerald-50 font-semibold text-lg transition hover:text-emerald-200"
                  href="/certification"
                >
                  Certification
                </a>
              </li>
              <li>
                <ProductDropDown />
              </li>
              <li>
                <a
                  className="text-emerald-50 font-semibold text-lg transition hover:text-emerald-200"
                  href="/contact"
                >
                  Contact
                </a>
              </li>

              <li className=" md:hidden ">
                <SearchInput />
              </li>
              <li className=" md:hidden ">
                <UserDropDown />
              </li>
            </ul>
          </div>
        </nav>
        {/* // Mobile Navbar */}
      </header>
    </div>
  );
};

export default Header;

"use client";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { Badge } from "@nextui-org/react"; // Ensure this library is installed or use a custom Badge component
import { useQuery } from "@tanstack/react-query";
import { fetchLoggedUser } from "../../lib/Fetcher/User";
import { fetchCart } from "../../lib/Fetcher/Cart";

const CartButton = () => {
  const { data: User, isLoading: isUserLoading } = useQuery({
    queryKey: ["User"],
    queryFn: fetchLoggedUser,
  });
  const Badge = ({ content, children }: { content: number; children: React.ReactNode }) => (
    <div className="relative inline-block">
      {children}
      {content > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
          {content}
        </span>
      )}
    </div>
  );
  

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: fetchCart,
  });

  const cartItemCount = cartData ? cartData.length : 0; // Get the number of items in the cart

  if (!User) {
    return (
      <>
        <div className="">
          <Link href={"/cart"} className="hover:text-emerald-200">
            <Badge content={cartItemCount} >
              {" "}
              {/* Display the cart item count */}
              <FiShoppingCart className="w-7 h-7 text-white hover:text-cyan-200" />
            </Badge>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="">
          <Link href={"/cart"} className="hover:text-emerald-200">
            <Badge content={cartItemCount} >
              {" "}
              {/* Display the cart item count */}
              <FiShoppingCart className="w-7 h-7 text-white hover:text-emerald-200" />
            </Badge>
          </Link>
        </div>
      </>
    );
  }
};

export default CartButton;

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchLoggedUser } from "@/lib/Fetcher/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { getToken } from "@/lib/getToken";
import CartButton from "../Header/CartButton";
import { useRouter } from "next/navigation";
const UserDropDown = () => {
  const router = useRouter();
  // Query to get User
  const {
    data: User,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["User"],
    queryFn: fetchLoggedUser,
  });
  const client = useQueryClient();
  // Logout function
  const handleLogout = async (e: { preventDefault: () => void }) => {
    try {
      // e.preventDefault();
      const response = await axios.get("/api/auth/logout");
      const data = await response.data;

      if (data.success) {
        refetch();
        await client.invalidateQueries({ queryKey: ["User"] });
        await client.refetchQueries({ queryKey: ["User"] });
        // Change the route to the login page
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Error in Logout");
    }
  };

  if (isUserLoading) {
    return <></>;
  }

  if (User) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar.webp" alt="@shadcn" />
                <AvatarFallback>{User.name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{User.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {User.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/cart"}>
                <DropdownMenuItem>Your Cart</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <Link href={"/setting"}>
                <DropdownMenuItem>Update Profile</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  if (!User) {
    return (
      <>
        <div className="hidden md:block space-x-1 xl:space-x-2 2xl:space-x-3">
          <Link
            href={"/auth/register"}
            className=" rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75 bg-blue-800"
          >
            Register
          </Link>
          <Link
            href={"/auth/login"}
            className=" rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75 bg-blue-800"
          >
            Login
          </Link>
        </div>
        <div className="md:hidden space-x-3">
          <Link
            href={"/auth/register"}
            className="  rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75 bg-blue-800"
          >
            Register
          </Link>
          <Link
            href={"/auth/login"}
            className=" rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-100/75 bg-blue-800"
          >
            Login
          </Link>
        </div>
      </>
    );
  }
};

export default UserDropDown;

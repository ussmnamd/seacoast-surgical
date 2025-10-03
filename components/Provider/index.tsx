"use client";
import { NextPage } from "next";
import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "../Header";
import Footer from "../Footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from 'nextjs-toploader';

import Head from "next/head";

// Types
interface Props {
  children: React.ReactNode;
}
// TSX
const Provider: NextPage<Props> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
     <NextTopLoader color=" rgb(30 64 175 / 1)"  />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        {/* <NextUIProvider> */}
          <Toaster position="bottom-right" />
          <Header />
        
          <div>
        {children}</div>
        {/* </NextUIProvider> */}

        <Footer />
      </QueryClientProvider>
    </>
  );
};
export default Provider;

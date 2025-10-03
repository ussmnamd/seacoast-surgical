import Inquiries_Info from "@/components/info/Inquiries_Info";
import Invoices_info from "@/components/info/Invoices_info";
import Orders_info from "@/components/info/Orders_info";
import Pending_invoices_info from "@/components/info/Pending_invoices_info";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="px-5 ">
        <div className="grid  grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4 ">
          <Inquiries_Info />
          <Invoices_info />
          <Pending_invoices_info />
          <Orders_info />
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Label } from "../ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMyOrders } from "@/lib/Fetcher/Orders";
import { Badge } from "../ui/badge";

const Orders_info = () => {
  // Query to get all Inquirys
  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyOrders"],
    queryFn: fetchMyOrders,
  });

  console.log(allOrders);

  return (
    <div className="">
      <div className="rounded-lg border lg:min-h-screen">
        <div className="flex justify-center items-center py-3">
          <span className="text-2xl font-semibold">Your Orders</span>
        </div>
        {allOrders && allOrders.length == 0 ? (
          <div className="flex justify-center items-center">
            <Label className="text-light-accent text-xl font-semibold">
              You have no Orders
            </Label>
          </div>
        ) : (
          <div className="">
            <div className=" ">
              <React.Fragment>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" text-center">#</TableHead>

                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Courier</TableHead>
                      <TableHead className="text-center">Tracking No</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allOrders &&
                      allOrders.map((order: any, index: any) => {
                        let visibleStatus = order.status as string;
                        visibleStatus = visibleStatus.toUpperCase();

                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-center">
                              {index + 1}
                            </TableCell> 
                            <TableCell className="text-center">
                              <Badge variant={"outline"}>{visibleStatus}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              {order.tracking_no}
                            </TableCell>
                            <TableCell className="text-center">
                              {order.courier}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </React.Fragment>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders_info;

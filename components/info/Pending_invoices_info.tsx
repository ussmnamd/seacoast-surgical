"use client";
import React from "react";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";

import axiosInstance from "@/config/axios";
import { getToken } from "@/lib/getToken";
import toast from "react-hot-toast";
import { MenuItem } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import {
  fetchMyInvoices,
  fetchMyPaidAndPendingApprovalInvoices,
  fetchMyPendingApprovalInvoices,
} from "@/lib/Fetcher/Invoices";
import { getEdgePoint } from "@/lib/getEdge";
import { Label } from "../ui/label";

const Pending_invoices_info = () => {
  // Query to get Pending Invoices
  const {
    data: allQRFs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["PendingApprovalInvoices"],
    queryFn: fetchMyPaidAndPendingApprovalInvoices,
  });

  const edge = getEdgePoint();
  // its open the invoice in the separate file
  const handleViewInvoice = (InvoiceID: number) => {
    const quotationLink = `${edge}/view-client-invoice/${InvoiceID}`;
    window.open(quotationLink, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="rounded-lg border lg:min-h-screen ">
        <div className="flex justify-center items-center py-3">
          <span className="text-2xl font-semibold">Invoices</span>
        </div>
        {allQRFs && allQRFs.length == 0 ? (
          <div className="flex justify-center items-center">
            <Label className="text-light-accent text-xl font-semibold">
              You have no Invoices
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

                      <TableHead className=" text-center">
                        Date
                      </TableHead>
                      <TableHead className=" text-center">Status</TableHead>

                      <TableHead className="">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allQRFs &&
                      allQRFs.map(
                        (qrf: any, index: any) => {
                          const date = new Date(qrf.created_at);
                          const options: Intl.DateTimeFormatOptions = {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          };
                          let visibleStatus = qrf.status as string;
                          visibleStatus = visibleStatus.toUpperCase();
                          const visibleDate: string = date.toLocaleString(
                            "en-US",
                            options
                          );

                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium text-center">
                                {index + 1}
                              </TableCell>

                              <TableCell className=" text-center">
                                {visibleDate}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={"outline"}>
                                  {visibleStatus == "PENDING-APPROVAL" ?
                                    "PENDING" : "PAID"}
                                </Badge>
                              </TableCell>

                              <TableCell className="">
                                <Menubar className="border-none w-fit">
                                  <MenubarMenu>
                                    <MenubarTrigger className="cursor-pointer">
                                      <BsThreeDotsVertical className="h-5 w-5" />
                                    </MenubarTrigger>
                                    <MenubarContent>
                                      <MenubarItem
                                        onClick={() =>
                                          handleViewInvoice(qrf.id)
                                        }
                                      >
                                        View Invoice
                                      </MenubarItem>
                                    </MenubarContent>
                                  </MenubarMenu>
                                </Menubar>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                  </TableBody>
                </Table>
              </React.Fragment>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pending_invoices_info;

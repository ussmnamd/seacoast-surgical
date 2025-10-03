"use client";

import { getEdgePoint } from "@/lib/getEdge";
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
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "../ui/label";
import { SendedInquiries } from "@/lib/Fetcher/Inquiries";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "@/config/axios";
import { getToken } from "@/lib/getToken";
import toast from "react-hot-toast";
const Inquiries_Info = () => {
  // Query to get all Inquirys
  const {
    data: allInquirys,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyInquiry"],
    queryFn: SendedInquiries,
  });
  const edge = getEdgePoint();

  const token = getToken();
  const client = useQueryClient();
  // Delete the Inquiry from the Database
  const deleteCategoryName = useMutation({
    mutationFn: ({ QuotationID }: { QuotationID: number }) => {
      return axiosInstance.delete(`api/delete-client-query/${QuotationID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["MyInquiry"] });
      client.refetchQueries({ queryKey: ["MyInquiry"] });
      toast.success("Inquiry Deleted");
    },
    onError(error) {
      console.log(error);
      toast.error(`Error ${error.message}`);
    },
  });

  const HandleDeleteInquiry = (QuotationID: number) => {
    deleteCategoryName.mutate({
      QuotationID,
    });
  };
  const handleViewQuotation = (QuotationID: number) => {
    const quotationLink = `${edge}/view-client-query/${QuotationID}`;
    window.open(quotationLink, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className=" rounded-lg border lg:min-h-screen">
        <div className="flex justify-center items-center py-3">
          <span className="text-2xl font-semibold">Inquiries</span>
        </div>

        {allInquirys && allInquirys.length == 0 ? (
          <div className="flex justify-center items-center">
            <Label className="text-light-accent text-xl font-semibold">
              You have no Inquiry
            </Label>
          </div>
        ) : (
          <>
            <ScrollArea className=" h-screen/2">
              <Table className="">
                <TableHeader>
                  <TableRow>

                    <TableHead className="">Inquiry Date</TableHead>

                    <TableHead className="">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allInquirys &&
                    allInquirys.map((Inquiry: any, index: any) => {
                      const date = new Date(Inquiry.created_at);
                      const options: Intl.DateTimeFormatOptions = {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      };
                      let visibleStatus = Inquiry.status as string;
                      visibleStatus = visibleStatus.toUpperCase();
                      const visibleDate: string = date.toLocaleString(
                        "en-US",
                        options
                      );
                      if (Inquiry.status == "pending") {
                        return (
                          <TableRow className="border" key={index}>
                          
                            <TableCell className="">{visibleDate}</TableCell>

                            <TableCell className="">
                              <Menubar className="border-none w-fit">
                                <MenubarMenu>
                                  <MenubarTrigger className="cursor-pointer">
                                    <BsThreeDotsVertical className="h-5 w-5" />
                                  </MenubarTrigger>
                                  <MenubarContent className="w-fit">
                                    <MenubarItem
                                      onClick={() =>
                                        handleViewQuotation(Inquiry.id)
                                      }
                                    >
                                      View Inquiry
                                    </MenubarItem>
                                    <MenubarItem
                                      onClick={() =>
                                        HandleDeleteInquiry(Inquiry.id)
                                      }
                                    >
                                      Delete Inquiry
                                    </MenubarItem>
                                  </MenubarContent>
                                </MenubarMenu>
                              </Menubar>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </ScrollArea>
          </>
        )}
      </div>
    </>
  );
};

export default Inquiries_Info;

import React from "react";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/lib/Fetcher/Cart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";

const PaymentMethodsLogos = [
  {
    name: "Visa",
    url: "Visa.jpg",
    className: "",
  },
  {
    name: "Mastercard",
    url: "Mastercard.jpg",
    className: "",
  },
  {
    name: "PayPal",
    url: "PayPal.jpg",
    className: "",
  },
  {
    name: "Bank Transfer",
    url: "Bank_Transfer_Logo.png",
    className: "",
  },
  {
    name: "Amex",
    url: "Amex.jpg",
    className: "",
  },
];

const CheckOut = ({ deleteProduct }: { deleteProduct: any }) => {
  // Query to get all Cart
  const {
    data: allCart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: fetchCart,
  });

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    if (allCart) {
      const newTotalPrice = allCart.reduce((acc: any, product: any) => {
        return acc + Number(product.product.price) * Number(product.quantity);
      }, 0);
      setTotalPrice(newTotalPrice);
    }
  }, [allCart]);
  
  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <p></p>;
  }

  if (true) {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <section>
                <Label className="text-lg font-semibold pb-3">
                  Total {allCart.length} Product in your cart
                </Label>
                <ScrollArea className="pb-4 h-72 w-full ">
                  <div className="grid gap-4 py-4 ">
                    {allCart &&
                      allCart.map((product: any, index: number) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="flex flex-col justify-evenly space-y-1 p-2 border rounded-lg bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex">
                                <div className=" w-[85%]">
                                  <Label className="font-semibold text-lg">
                                    {product.product.product_name}
                                  </Label>
                                </div>
                                <div className="w-[15%]">
                                  <Button
                                    variant="ghost"
                                    onClick={() => deleteProduct(product.id)}
                                  >
                                    <RiDeleteBin6Line className="text-[16px] md:text-[19px] text-black hover:text-red-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex  justify-between  ">
                                <div className="flex flex-col space-y-1.5 ">
                                  <Label className="font-semibold">
                                    Product SKU
                                  </Label>
                                  <Label className="font-normal">
                                    {product.sku}
                                  </Label>
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                  <Label className="font-semibold">
                                    Product Size
                                  </Label>
                                  <Label className="font-normal text-center">
                                    {product.size}
                                  </Label>
                                </div>
                              </div>
                              <div className="flex justify-between  pt-3">
                                <Label className="font-semibold">
                                  Quantity Selected
                                </Label>
                                <Label className="w-[20%] font-normal text-center">
                                  {product.quantity}
                                </Label>
                              </div>
                              <div className="flex justify-between  pt-3 border-t-1.5">
                                <Label className="font-semibold">
                                  Product Price
                                </Label>
                                <Label className="w-[20%] font-normal text-center">
                                  ${product.product.price}
                                </Label>
                              </div>
                            </div>
                            <Separator />
                          </>
                        );
                      })}
                  </div>
                </ScrollArea>
                <div className="flex justify-between items-center p-5 bg-gray-800 rounded-md">
                  <Label className="text-primary-50">Total Price</Label>
                  <Label className="text-primary-50">${totalPrice}</Label>
                </div>
              </section>
              <section className="pt-8">
                <Label className="text-lg pb-3 font-semibold">
                  Payment Methods
                </Label>
                <div className="grid grid-cols-4 gap-5 p-3">
                  {PaymentMethodsLogos.map((PaymentLogo, index) => {
                    return (
                      <TooltipProvider key={index} delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Avatar
                              className={`p-0.5 w-full ${PaymentLogo.className} `}
                              key={index}
                            >
                              <AvatarImage
                                src={`/PaymentMethods/${PaymentLogo.url}`}
                                className={`object-fill   `}
                              />
                              <AvatarFallback>
                                {PaymentLogo.name}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{PaymentLogo.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </section>
              <section>
                <Label className="text-lg pb-3 font-semibold">
                  Terms and Policies
                </Label>
                <p>
                  Please read our{" "}
                  <Link
                    href="/TermsConditions"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/TermsConditions"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  before proceeding to checkout.
                </p>
              </section>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Pay now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};

export default CheckOut;

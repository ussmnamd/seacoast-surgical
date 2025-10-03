"use client";
import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  fname: z.string().min(1, "First Name is required"),
  lname: z.string().min(1, "Last Name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [isAcceptTerms, setisAcceptTerms] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isAcceptTerms) {
      toast.error("You must accept the terms and conditions.", {
        style: { backgroundColor: "#d41212", color: "white" },
      });
      return;
    }

    try {
      await axios.post("/api/contact", data);
      toast.success("Your message has been sent. We'll get back to you soon.", {
        duration: 3000,
      });
      form.reset();
    } catch (error) {
      toast.error("An error occurred while sending your message. Please try again later.", {
        duration: 3000,
      });
    }
  }

  return (
    <div className="md:w-1/2">
      <div className="bg-light-primary flex flex-col md:ml-auto w-full mt-8 my-2 md:mt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="First Name"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Last Name"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="City"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Country"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone"
                        className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 text-base outline-none text-light-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Message"
                      className="w-full bg-light-primary rounded border border-gray-300 focus:border-light-secondary-500 focus:ring-2 focus:ring-light-secondary-200 h-32 text-base outline-none text-light-accent py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={isAcceptTerms}
                onChange={() => setisAcceptTerms(!isAcceptTerms)}
                className="w-4 h-4 text-gray-600 rounded focus:ring-gray-500 focus:ring-2"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-500"
              >
                I agree that my personal information is used in accordance with the{" "}
                <Link href="/privacy-policy" className="font-semibold text-black">Privacy</Link> and{" "}
                <Link href="/cookie-policy" className="font-semibold text-black">
                  Cookie Policy
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              disabled={!isAcceptTerms}
              className="text-white bg-blue-800 border-0 py-2 px-6 focus:outline-none rounded text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;

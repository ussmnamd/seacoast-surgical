"use client";
import { posts } from "@/.velite";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";


export default function BlogPage() {
  return (
    <>
      <div className="h-[35vh] md:h-[50vh] flex flex-col gap-3 justify-center items-center">
        <h1 className="font-bold text-5xl">Our Blogs</h1>
        <h2 className="text-gray-500 font-semibold text-xl text-center">
          Read our latest blogs and learn more about our services
        </h2>
      </div>
      <Fade cascade delay={180} >
        <div className="mb-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map((post: any) => {
            // Parse the date string into a Date object
            const date = new Date(post.date);

            // Extract individual components of the date
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            const day = date.getDate();

            // Format the date components as desired
            const formattedDate = `${year}-${
              month < 10 ? "0" + month : month
            }-${day < 10 ? "0" + day : day}`;

            return (
              <article
                key={post.title}
                className="overflow-hidden transition shadow-lg hover:shadow-inner h-fit md:h-full p-1 border-0.5 border-primary rounded-md "
              >
                {post.coverImage && (
                  <Image
                    className="h-[50%]  rounded-xl"
                    src={post.coverImage.src}
                    alt={post.title}
                    width={post.coverImage.width}
                    height={post.coverImage.height}
                    blurDataURL={post.coverImage.blurDataURL}
                    placeholder="blur"
                  />
                )}
                <div className="bg-white px-1 py-4 sm:py-6">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {formattedDate}
                  </time>
                  <Link href={`${post.slug}`}>
                    <h3 className="mt-0.5 text-lg text-gray-900 ">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 h-12">
                    {post.description && post.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Fade>
    </>
  );
}

import React from "react";
import SeparatePage from "./SaperatePage";
import { FetchParticularProduct } from "@/lib/Fetcher/Categories";
interface paramProps{
  slug: number;
}

export async function generateMetadata({ params }: { params: paramProps }) {
// console.log(params.slug)
  try {
    const product = await FetchParticularProduct(params.slug);
    // console.log(product)
    // If the product is null or does not have the necessary properties, return a default metadata
    if (!product || !product.product_name || !product.product_description) {
      return{
        title: "Product Not Found | Seacoast Surgical",
        description: "The product you are looking for does not exist or is no longer available.",
      };
    }
    // Return the metadata for the found product
    return {
      title: `${product.product_name} | Seacoast Surgical`,
      description: product.product_description,
      alternates: {
        canonical: `/product/${params.slug}`,
    }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      title: "Error | Seacoast Surgical",
      description: "There was an error retrieving the product information.",
    };
  }
}


const page = (props: any) => {
  return (
    <div>
      <SeparatePage slug={props.params.slug} />
    </div>
  );
};
export default page;

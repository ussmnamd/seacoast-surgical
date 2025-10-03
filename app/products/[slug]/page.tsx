import React from "react";
import SubCategoryProducts from "./SubCategoryProducts";
import { ParticularOneSubCategory, ParticularSubCategoryProductsWithMetaData,  } from "@/lib/Fetcher/Categories";
interface paramsProps{
slug :string
}
import { Metadata } from "next";
import { ParticularSubCategory } from "@/lib/Fetcher/Categories";



interface ParamsProps {
  slug: string;
}



export async function generateMetadata({ params }: { params: ParamsProps }): Promise<Metadata> {
  // Fetch the products for the given slug using the ParticularSubCategoryProducts function

  const metaData = await ParticularSubCategoryProductsWithMetaData(params.slug, null)
  // Return the metadata for the found product's subcategory
  return {
    title: metaData.subCategory_title,
    description: metaData.subCategory_description,
    alternates: {
      canonical: `/products/${params.slug}`,
  }

  };
}


const page = (props: any) => {
  // console.log(props.params.slug)
  return (
    <div>
      <SubCategoryProducts slug={props.params.slug} />
    </div>
  );
};

export default page;

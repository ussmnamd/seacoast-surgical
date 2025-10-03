
import { fetchCategoriesNames, ParticularCategory } from "@/lib/Fetcher/Categories";
import Category from "./Catgory";
import {categoryMetaData} from "@/constant/constant"
import { Metadata } from "next";

interface ParamProps{
  slug:string
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

  // Fetch all categories
  const allCategories = await fetchCategoriesNames();
 
  // Find the category that matches the slug
  const category = allCategories.find((cat:any) => cat.category_slug === params.slug);

  // If the category is not found, return a default metadata
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  // Return the metadata for the found category
  return {
    // title: `${category.title} | Artema Medical Group`,
    title: `${category.title}`,
    description: category.description,
  };
}


const page = async (props: any) => {
console.log(props.params.slug)
  return (
    <div>
      {/* <StructuredData data={CategorySchema} /> */}
      
      <Category slug={props.params.slug} />
    </div>
  );
};

export default page;
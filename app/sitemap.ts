import { MetadataRoute } from "next";
import { fetchCategoriesNames,ParticularSubCategoryProducts,ParticularSubCategory, getProductsSlugByUserId } from "@/lib/Fetcher/Categories";

export const revalidate = 30; // Revalidate every 30 seconds
interface Url {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}

interface ErrorResponse {
  response?: {
    status?: number;
  };
}
// Function to fetch and format category URLs
const fetchCategoryUrls = async () => {
  try {
    const categories = await fetchCategoriesNames();
  

    // Check if categories is an array and map over it
    if (!Array.isArray(categories)) {
      throw new Error("Fetched categories is not an array");
    }

    // Generate URLs from categories
    return categories.map((category: { category_slug: string }) => {
      if (!category.category_slug) {
        console.warn("Category slug is missing for category:", category);
        return null;
      }

      return {
        url: `https://www.dynamicmedicalsolution.com/categories/${encodeURIComponent(category.category_slug)}`,
        lastModified: new Date(), // Set last modified date
        changeFrequency: "daily",
        priority: 0.7, // Adjust priority as needed
      };
    }).filter(Boolean); // Remove any null values from the array
  } catch (error) {
    console.error("Failed to fetch category URLs", error);
    return []; // Return empty array if there's an error
  }
};
//For fetching SubCategory
const fetchSubcategoryUrls = async () => {
  try {
    const categories = await fetchCategoriesNames();
   
    if (!Array.isArray(categories)) {
      throw new Error("Fetched categories is not an array");
    }

    const productUrls: {
      url: string; lastModified: Date; // Set last modified date
      changeFrequency: string; priority: number;
    }[] = [];

    for (const category of categories) {
      if (!category.category_slug) continue;

      // Sitemapping the SubCategories..
      const products = await ParticularSubCategory(category.category_slug);
    

      // Check if products.subcategories exists and is an array
      if (!products.subcategories || !Array.isArray(products.subcategories)) {
        console.warn(`No subcategories found for category: ${category.category_slug}`);
        continue;
      }
      // Iterate over each subcategory
      products.subcategories.forEach((sub:any) => {
        if (!sub.sub_category) {
          console.warn("Sub_category is null for sub:", sub);
          return;
        }

        const subCategorySlug = sub.sub_category.sub_category_slug;
        if (!subCategorySlug) {
         
          return;
        }
        // Generate URLs for each subcategory
        productUrls.push({
          url: `https://www.dynamicmedicalsolution.com/products/${encodeURIComponent(subCategorySlug)}`,
          lastModified: new Date(), // Set last modified date
          changeFrequency: "daily",
          priority: 0.8, // Adjust priority as needed
        });
      });
    }
    return productUrls;
  } catch (error) {
    console.error("Failed to fetch product URLs", error);
    return []; // Return empty array if there's an error
  }
};

//Fetch single Products Slug
const fetchProductsUrls = async () => {
  try {
    const response = await getProductsSlugByUserId();
    const productsUrl = response.product_slugs; // Extract the product_slugs array
   
    if (!Array.isArray(productsUrl)) {
      console.error("Error: Fetched products is not an array. Actual value:", productsUrl);
      throw new Error("Fetched products are not an array");
    }

    // Generate URLs from products
    return productsUrl.map(product_slug => {
      if (!product_slug) {
        console.warn("Product slug is missing for product:", product_slug);
        return null;
      }

      return {
        url: `https://www.dynamicmedicalsolution.com/product/${encodeURIComponent(product_slug)}`,
        lastModified: new Date(), // Set last modified date
        changeFrequency: "weekly",
        priority: 0.7, // Adjust priority as needed
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch product URLs", error);
    return [];
  }
};

export default async function sitemap() {
  // Fetch and include category URLs
  const categoryRoutes = await fetchCategoryUrls();
  const subCategoriesRoutes = await fetchSubcategoryUrls();
  const productsRoutes = await fetchProductsUrls();
  // const subCategoryProducts = await fetchSubcategoriesProducts();
  return [
    ...categoryRoutes,
    ...subCategoriesRoutes,
    ...productsRoutes,
     // Spread category URLs into the sitemap
     {
      url: "https://www.dynamicmedicalsolution.com/",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "yearly",
      priority: 1.0
  },
  {
      url: "https://www.dynamicmedicalsolution.com/about",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/certification",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/contact",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/categories/general-instrumentation",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/retractor",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/scalpels",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/suture",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/categories/neurological-spine-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/gynae-set",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/needle-holders",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/scissors",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/categories/orthopedic-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/dental-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "weekly",
      priority: 0.8
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/Basic-Neurosurgery-Instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/Dental-hygenic-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/Diving",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/Surgical-Spine-Procedures",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/Urology-A-Comprehensive-Guide-for-Patients-and-Doctors",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/essential-gynecology-tools",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/blogs/exploring-the-realm-of-surgical-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.64
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/blades-scalpels",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/categories/dental-instruments",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/urology",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/products/gynecology",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/categories/gynaecology",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/search/stetho",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  {
      url: "https://www.dynamicmedicalsolution.com/search/retractor",
      lastModified: new Date("2024-08-01T10:05:59+00:00"),
      changeFrequency: "monthly",
      priority: 0.51
  },
  ];
}

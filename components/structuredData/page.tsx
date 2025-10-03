// import { BlogPosting, WithContext } from "schema-dts";
type CategoryPosting =
  | {
      isDynamic: true;
      data: any;
    }
  | {
      isDynamic: false;
    };
export const generateContentStructuredData = (Props: CategoryPosting) => {
  if (!Props.isDynamic) {
    // Structured data for the homepage
    const homepageSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: "Artema Medical Group",
      alternateName: "AMG",
      url: "https://artemamed.com/",
      logo: "https://artemamed.com/images/Artema%20Logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1 (210) 468 7779",
        contactType: "technical support",
        areaServed: ["US", "PK"],
      },
      sameAs: [
        "https://www.facebook.com/people/Artema-Medical-Group/61556179106203/",
        "https://www.instagram.com/surgical.medical.instruments/",
        "https://www.linkedin.com/company/artema-medical-group/?viewAsMember=true",
      ],
    };
    return homepageSchema;
  } else {
    const CategorySchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: Props.data.title,
      description: Props.data.description,
      brand: {
        "@type": "Brand",
        // name: "Cardiovascular Instruments | Surgical Instruments",
        name: Props.data.name,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "80",
      },
    };
    return CategorySchema;
  }
  // Structured data for a blog post
  //   const blogPostSchema: WithContext<BlogPosting> | null = post
  //     ? {
  //         '@context': 'https://schema.org',
  //         '@type': 'BlogPosting',
  //         headline: post.title,
  //         description: post.description,
  //         author: [
  //           {
  //             '@type': 'Person',
  //             name: post.author || 'David Hockley',
  //           },
  //         ],
  //         image: post.image,
  //         datePublished: post.date.toISOString(),
  //       }
  //     : null;

  //   return blogPostSchema || homepageSchema;
};

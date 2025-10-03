import React from "react";
import SearchedProducts from "./SearchedProducts";

const Page = (props: any) => {
  const query: string = props.params.query;
  const UpdatedQuery =  query.replace(/%20/g, ' ')
  console.log(UpdatedQuery)
  return (
    <div className="px-10 py-5">
      <div className="flex justify-start items-center pb-5">
        <h1 className="font-semibold text-2xl md:text-4xl">&#34; Related Products &#34;</h1>
      </div>
      <div>
        <SearchedProducts query={UpdatedQuery} />
      </div>
    </div>
  );
};

export default Page;

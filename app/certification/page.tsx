import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen  px-5 lg:px-36 pt-10 pb-0">
      <div className="mt-10 text-lg  lg:flex-grow-0 md:w-full flex-col  pb-10">
        <div>
          <h1 className="text-2xl font-semibold ">
            Quality and Craftsmanship
          </h1>
        </div>
        <div className="pt-4 text-justify">
        Seacoast Surgical, a pioneer in crafting surgical instruments, epitomizes excellence in utilizing German-grade stainless
        steel for its premium medical tools. Their commitment to quality resonates through their choice of material—
        German-grade stainless steel—a testament to its exceptional quality level and suitability for forging precise and
        reliable medical instruments. Renowned for its composition rich in chromium, nickel, and molybdenum, this
        stainless-steel variant ensures unparalleled corrosion resistance, vital for medical tools subjected to rigorous
        sterilization and harsh environments. Gryphon Medical Solutions leverages this steel&apos;s inherent strength and
        durability, shaping it through forging processes to create surgical instruments boasting superior mechanical
        properties: high tensile strength, resilience to fatigue, and precision in intricate designs. These instruments, born
        from the fusion of quality steel and expert craftsmanship, meet the stringent demands of the medical field,
        guaranteeing hygiene, reliability, and longevity. The utilization of German-grade stainless steel in Gryphon&apos;s surgical
        instruments underscores a commitment to excellence, offering medical professionals tools of unparalleled quality
        and performance, ultimately contributing to enhanced patient care and surgical precision.
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold ">Certified From</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-start items-center space-x-3">
        <Image
          width={120}
          height={150}
          src="/images/ce-mark.webp"
          alt="grey-logo"
          className="relative top-0 left-0 w-60"
        />
        <Image
          width={120}
          height={250}
          src="/images/FDA.jpg"
          alt="grey-logo"
          className="relative top-0 left-0 w-60"
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold pb-2">ISO Certified</h2>
      </div>
      <ol
        className=" pl-1 text-orange-500 font-semibold grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-5"
        type="1"
      >
        <li>ISO/CD 6335-1</li>
        <li>ISO/CD 6335-2</li>
        <li> ISO 7151:1988</li>
        <li> ISO/DIS 7151</li>
        <li>ISO 7153-1:2016</li>
        <li> ISO/CD 7554-1</li>
        <li> ISO/CD 7554-2</li>
        <li> ISO/CD 7554-3</li>
        <li> ISO 7740:1985 </li>
        <li>ISO 7741:1986</li>
        <li>ISO 13402:1995</li>
        <li>ISO/DIS 13402</li>
      </ol>
    </div>
  );
};

export default Page;

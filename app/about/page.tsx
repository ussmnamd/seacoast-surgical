import ContactInfo from "@/components/contact_info";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function About() {
  return (
    <>
      {/* header style  */}
      <div className="bg-gradient-to-tr from-cyan-950 to-cyan-500 flex justify-center items-center h-96 -mt-5">
        <span className="text-4xl font-semibold text-white">About us</span>
      </div>
      {/* <section className="text-gray-600 body-font mt-5">
        <div className="text-center px-5 lg:px-36 pt-10 pb-0 ">
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-gray-900 mb-4">
           Mission Statement
          </h1>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
          </div>
          <div className="mt-10 text-lg pr-0 md:pr-10 lg:flex-grow-0 md:w-full lg:pl-10 md:pl-16 flex-col text-justify">
          At Seacoast Surgical, we embark on a noble mission to revolutionize the surgical and medical industry, making it more accessible than ever before. Our commitment lies in creating a paradigm shift where excellence converges with accessibility, and our mission statement reflects this dedication.<br></br>
          Our primary goal is to provide unparalleled access to high-quality surgical and medical solutions, ensuring that the benefits of advanced healthcare are within reach for all. We understand the critical importance of time in the medical field, and thus, Dynamic Med Medical Solutions stands as a beacon of efficiency and reliability.<br></br>
          Central to our ethos is an unwavering commitment to product quality. We pride ourselves on meticulously crafting medical solutions that not only meet but exceed industry standards. The Dynamic Med touch ensures that each product is a testament to our dedication to quality assurance, blending precision with care.<br></br>
          In our pursuit of excellence, we recognize the value of every manhour dedicated to crafting our medical instruments. Dynamic Med Medical Solutions strives to uphold the highest standards of craftsmanship, ensuring that each product is a testament to the skill and dedication of our team.<br></br>
          Moreover, our commitment extends beyond quality; it encompasses a pledge to timely delivery. Dynamic Med Medical Solutions understands the urgency of the healthcare industry, and we guarantee not only the excellence of our products but also their prompt and reliable delivery.<br></br>
          As we navigate the intricate landscape of healthcare, Seacoast Surgical stands as a beacon of innovation, accessibility, and unwavering quality. Join us on this transformative journey as we redefine the boundaries of possibility in the surgical and medical industry, making advanced healthcare solutions an accessible reality for all.
          Welcome to Seacoast Surgical—where excellence meets accessibility, and the future of healthcare is in your hands.
          </div>
        </div>
      </section> */}
      <div className=" px-5 lg:px-36 pt-10 pb-0 ">
        {/* Quote icon  */}
        <FaQuoteLeft className="w-8 h-8 text-cyan-700/90" />
        {/* CEO information  */}
        {/* <section className="text-gray-600 body-font">
          <div className="flex  py-10 md:flex-row flex-col ">
            <div className=" lg:flex-grow-0 md:w-[80%] lg:pl-10 md:pl-16 flex-col  md:text-left ">
              <span className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Message From The CEO<br></br>
                <br className="hidden lg:inline-block" />
              </span>
              <span className="text-xl text-black font-semibold">
                Dear Valued Customers and Partners,
              </span>
              <div className="mb-8 leading-7 text-lg pr-0 md:pr-10">
              <br></br>
              I am delighted to extend my warmest greetings as the CEO of Seacoast Surgical. I would like to introduce you to our latest offerings. This catalog is a testament to our unwavering commitment to delivering exceptional products and services to meet your needs.
              At Seacoast Surgical, we have always strived for excellence, innovation, and customer satisfaction. Our team of dedicated professionals has worked tirelessly to curate a selection of products and services that reflect our passion for quality and progress.
              As you explore these pages, you will discover a wide range of offerings, each designed with your success and satisfaction in mind. We understand that our success is deeply intertwined with yours, and it is our mission to provide you with the tools and solutions you need to thrive.
              I want to express my gratitude to our loyal customers, dedicated employees, and valued partners who have been instrumental in our journey of growth and success. Your trust and support inspire us to push the boundaries of what is possible and to continuously raise the bar.
              At Seacoast Surgical, we embrace the future with optimism and excitement. We are committed to innovation, sustainability, and building lasting relationships. Together, we can achieve remarkable milestones and create a brighter future.
              Thank you for choosing Seacoast Surgical as your partner on this journey. We look forward to serving you and exceeding your expectations.
              With utmost appreciation,<br></br>
              <span>
              <br></br>
              <img alt="signation" className="h-20 object-cover object-center  inline-block ml-2" src="/images/signature.png"/>
              </span>
                <span className="text-base text-black font-semibold">
                <br></br>
                Jason Boroff, CEO of  Medical Solutions
                </span>
              </div>
            </div>
            <div className="lg:max-w-1xl lg:w-fit md:w-1/2 w-5/6 mb-10 md:mb-0">
              
              <img alt="ecommerce" className=" w-full lg:h-96 object-cover object-center rounded" src="/images/JasonBorroff.jpg"/>
              <Image alt="Dynamic Med" className="w-full lg:h-96 object-cover object-center rounded" src={"/images/JasonBorroff.jpg"} width={400} height={400}/>
            </div>
          </div>
        </section> */}

        

        {/* Company Priciples  */}

        <section className="text-gray-600 body-font">
          <div className="flex  py-10 xl:flex-row flex-col ">
            <div className="xl:flex-grow-0 md:w-[95%] xl:pl-10 md:pl-16  flex-col  xl:text-left">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-cyan-900">
                Customizing your Innovation w/ Premium Surgical Instruments: Designed for Surgeons by Surgeons.

              </h1>
              <div className="mb-8 leading-relaxed text-lg pr-0 xl:pr-10">
                Seacoast Surgical LLC is a Florida-based medical device company focused on delivering innovative
                surgical instruments, orthopedic implants, and bleeding-control solutions to the healthcare
                marketplace.
                Seacoast Surgical aims to establish itself as an OEM manufacturer for major medical companies,
                creating long-term wholesale opportunities, while simultaneously pursuing government contracts
                particularly with the VA Medical Centers.
                Geographic Footprint: While headquartered in Florida, Seacoast Surgical has expanded its sales
                coverage to Puerto Rico, the Dominican Republic, Alabama, and Ohio, with plans for continued
                regional growth.
                We are an authorized distributor for Artema Medical, a global leader and pioneer in surgical
                instrument innovation with over 40 years of experience serving the medical industry. Through this
                partnership, we provide direct access to premium German stainless steel instruments—built for
                precision, comfort, and durability at FACTORY DIRECT PRICING.
              </div>
            </div>
            <div className="xl:max-w-xl xl:w-full md:pl-16 xl:pl-0 w-[90%] md:w-[85%] mb-10 xl:mb-0">
              <Image
                width={700}
                height={700}
                className="object-cover object-center rounded w-full"
                alt="hero"
                src="/images/about1.jpg"
              />
            </div>
          </div>
        </section>

        {/* Mission And Vision  */}

        <section className="text-gray-600 body-font py-5">
          <div className="flex  xl:flex-row flex-col ">
            <div className="xl:flex-grow-0 md:w-[95%] xl:pl-10 md:pl-16  flex-col  xl:text-left">
              <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-cyan-900">
                What sets Seacoast Surgical apart:
              </h2>
              <div className="mb-8 leading-relaxed text-lg pr-0 xl:pr-10">
               " Customizable Instruments tailored to your specific needs and surgical techniques
                → Custom requests are fulfilled with a minimum of 15 pieces and a lead time of just 7 weeks.
                510(k) FDA Approval, ISO 13485, and ASTM Standard certifications
                Instruments crafted from premium German stainless steel
                A 3-year replacement warranty, reflecting our confidence in quality and longevity
                Cost-effective pricing designed to improve patient outcomes and your ROI
                <p>🔹 No Sterilization? No Problem!</p>
                If your facility lacks sterilization capabilities, we also offer a line of single-use disposable
                instruments. These provide a reliable, sterile instrument for every procedure, eliminating the need for
                reprocessing and enhancing your workflow with fewer steps and faster turnaround times.
                <p>🔹 Comprehensive Medical Specialty Coverage</p>
                We proudly serve all major surgical specialties, including:
                Cardiac, Dental, ENT, General Surgery, Plastic Surgery, Neuro & Spine, Orthopedic, and Urology.
                Whatever your area of expertise, we have the instruments to match your precision and performance
                standards.
                Whether you're equipping a new facility or upgrading existing sets, we’re here to provide the reliable,
                high-performance tools your team depends on.
                We also provide PPE and DME products below market value. Request a quote today!"
              </div>
            </div>
            <div className="xl:max-w-xl xl:w-full md:pl-16 xl:pl-0 w-[90%] md:w-[85%] mb-10 xl:mb-0">
              <Image
                width={700}
                height={700}
                className="object-cover object-center rounded w-full"
                alt="hero"
                src="/images/about2.jpg"
              />
            </div>
          </div>
        </section>

        {/* Contact Info - Component  */}


        {/* <ContactInfo /> */}

        
      </div>
    </>
  );
}

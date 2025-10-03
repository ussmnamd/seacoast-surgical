// import CanonicalURL from "@/components/Canonical";
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Blog | Seacoast Surgical | Surgical Instruments",
  description: "Seacoast Surgical Blog Page , Where you can easily read our blogs, Surgical Instruments.",
};
export default function blogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="container mx-auto px-2 md:px-4">
      {/* <CanonicalURL/> */}
      {children}</section>
  }
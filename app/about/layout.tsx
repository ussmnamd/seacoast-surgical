// import CanonicalURL from "@/components/Canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About| Surgical Instruments| Surgical Tools",
  description:
    "Welcome to Seacoast Surgical's About page, where we delve into our mission, values, and commitment to revolutionizing surgical instruments and innovations.",
};

export default function AboutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {/* <CanonicalURL/> */}
  {children}</>;
}

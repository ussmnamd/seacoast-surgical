// import CanonicalURL from "@/components/Canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact  | Surgical Tools | Surgical Instruments",
  description: "If you want to buy surgical instruments? Seacost Surgical contact page help to solve you query.",
};

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {children}</>;
}

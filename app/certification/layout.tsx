// import CanonicalURL from "@/components/Canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification | Surgical Tools | Surgical Instruments",
  description:"The Seacoast Surgical Certification page highlights an unwavering commitment to surgical instruments quality, safety and regulatory compliance.",
};

export default function CertificationPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {/* <CanonicalURL/> */}
  {children}</>;
}

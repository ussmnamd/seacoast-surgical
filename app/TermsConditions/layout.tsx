
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms| Surgical Tools| Surgical Instruments",
  description: "Welcome to Seacoast Surgical's Terms and Conditions page. These terms govern your use of our website and services provided by Dynamic Medical.",
};

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {children}</>;
}

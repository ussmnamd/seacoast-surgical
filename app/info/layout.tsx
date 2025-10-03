
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders Information | Seacoast Surgical",
  description:
    "Seacoast Surgical Information Page about you inquiries, invoices, and orders where you can pay the invoices and the check the orders details. ",
};

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {children}</>;
}

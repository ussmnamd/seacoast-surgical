import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import StructuredData from "@/components/structuredData/structuredDataContent";

// Define a custom type extending Metadata to include Bing verification
interface ExtendedMetadata extends Metadata {
  verification: {
    google: string;
    bing?: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: ExtendedMetadata = {
  metadataBase: new URL("https://www.dynamicmedicalsolution.com/"),
  title: {
    template: "%s | Dynamic ",
    default: "Surgical Instruments | General Instruments | Surgical Tools | Dynamic",
  },
  verification: {
    google: "I4rW9QScTaX4crtri2HoSGaZ0Tfs4fb98h_t-zrW5yE",
    bing: "BAEE953253739AE12DC726DBB54CCFA0",
  },
  description: "Discover high-quality surgical instruments at Seacoast Surgical. We manufacture and supply a wide range of products.",
  alternates: {
    canonical: "./", 
  },
  openGraph: {
    title: "Surgical Instruments | Seacoast Surgical",
    description:
      "Discover high-quality surgical instruments at Seacoast Surgical. We manufacture and supply a wide range of products.",
    url: "https://www.dynamicmedicalsolution.com/",
    type: "website",
    images: [
      {
        url: "https://www.dynamicmedicalsolution.com/images/OG_Dynamic.jpg",  // Replace with a valid image URL
        width: 1200,
        height: 630,
        alt: "Seacoast Surgical Instruments",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add verification meta tags in the <head> */}
        <meta name="google-site-verification" content={metadata.verification.google} />
        <meta name="msvalidate.01" content={metadata.verification.bing} />
        {/* <StructuredData data={homepageSchema} /> */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />

      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
      <GoogleAnalytics gaId="G-FWY42DXQXK" />
    </html>
  );
}

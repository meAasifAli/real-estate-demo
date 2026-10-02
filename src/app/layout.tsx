import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Outfit, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "LuxeEstates | Premium Real Estate in Bengaluru",
  description:
    "Discover exceptional properties with LuxeEstates — your trusted partner for premium homes, villas, and commercial spaces in Bengaluru.",
  keywords: "luxury real estate Bengaluru, premium properties Bangalore, villas Whitefield, apartments Indiranagar, rent Koramangala, commercial space",
  openGraph: {
    title: "LuxeEstates | Premium Real Estate in Bengaluru",
    description: "Discover exceptional properties crafted for extraordinary living in Bengaluru.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1A2C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${outfit.variable} ${dmSans.variable} ${fraunces.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased bg-white text-navy font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        <Suspense fallback={null}>
          <MobileTabBar />
        </Suspense>
        <WhatsAppFloat />
        <ScrollAnimationProvider />
      </body>
    </html>
  );
}

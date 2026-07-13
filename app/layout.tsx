import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import ScrollAnimator from "@/components/ScrollAnimator";
import QuoteModal from "@/components/QuoteModal";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { siteGraph } from "@/lib/schema";
import { site } from "@/lib/site";
import { getRating } from "@/lib/rating";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Peak Pest Control | Pest Control in Reno & Sparks, NV",
    template: "%s | Peak Pest Control",
  },
  description:
    "Eco-friendly pest control in Reno, Sparks, and northern Nevada. Same-day service and a guarantee: if the pests come back, so do we.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Pest Control",
  formatDetection: { telephone: true, address: true, email: true },
  keywords: [
    "pest control Reno",
    "exterminator Sparks NV",
    "rodent control Reno",
    "ant control",
    "eco-friendly pest control",
    "pest control Reno NV",
    "exterminator Reno",
    "same-day pest control",
    "northern Nevada pest control",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
  openGraph: {
    title: "Peak Pest Control | Reno & Sparks, NV",
    description:
      "Eco-friendly pest control with same-day service and a satisfaction guarantee.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peak Pest Control | Reno & Sparks, NV",
    description:
      "Eco-friendly pest control with same-day service and a satisfaction guarantee.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1b2a",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rating = await getRating();
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <JsonLd data={siteGraph(rating)} />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Spacer so the mobile call bar never covers footer content */}
        <div className="h-20 lg:hidden" aria-hidden />
        <MobileCallBar />
        <QuoteModal />
        <ScrollAnimator />
        <Analytics />
      </body>
    </html>
  );
}

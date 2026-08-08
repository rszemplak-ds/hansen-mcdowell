import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/site-data";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Hansen McDowell Estate Sales | Greater Cleveland",
    template: "%s | Hansen McDowell",
  },
  description:
    "Family-owned online estate auction and home clean-out services for Greater Cleveland and Northeast Ohio.",
  icons: {
    icon: "/images/viking-cat.jpg",
    shortcut: "/images/viking-cat.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hansen McDowell Estate Sales",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a3292f",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteHeader settings={settings} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}

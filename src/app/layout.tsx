import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
      title: {
        default:
          settings.defaultSeo?.seoTitle ??
          "Hansen McDowell Estate Sales | Greater Cleveland",
        template: `%s | ${settings.shortName}`,
      },
      description:
        settings.defaultSeo?.seoDescription ??
        "Family-owned online estate auction and home clean-out services for Greater Cleveland and Northeast Ohio.",
      icons: {
        icon: "/images/viking-cat.jpg",
        shortcut: "/images/viking-cat.jpg",
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        siteName: settings.businessName,
      },
    };
  } catch {
    return {
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
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a3292f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}

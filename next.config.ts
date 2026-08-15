import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/2016/02/home_58.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/p/our-services.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/p/faq.html",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/p/testimonials.html",
        destination: "/testimonials",
        permanent: true,
      },
      {
        source: "/p/contact-us.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/p/online-aucti.html",
        destination: "/estate-sales",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

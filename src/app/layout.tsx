import type { Metadata } from "next";
import type { Viewport } from "next";

import BackToTop from "@/components/BackToTop";
import RainbowGlow from "@/components/RainbowGlow";
import { LanguageProvider } from "@/contexts/LanguageContext";

import "./globals.css";

const title = "Molly Su｜前端工程師";
const description =
  "Molly Su 的前端作品集——享受把想法變成畫面的過程，對新技術保持好奇。";
const siteUrl = "https://kir4che.com";
const socialImage = "/opengraph-image.png";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Molly Su",
      jobTitle: "Frontend Developer",
      description,
      url: siteUrl,
      image: `${siteUrl}/images/avatar.webp`,
      sameAs: [
        "https://github.com/kir4che",
        "https://www.linkedin.com/in/mollysu/",
        "https://bsky.app/profile/kir4che.bsky.social",
        "https://www.youtube.com/@kir4che",
        "https://codepen.io/kir4che",
      ],
      knowsAbout: [
        "Frontend development",
        "React",
        "Next.js",
        "TypeScript",
        "Three.js",
        "UI/UX design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Molly Su Portfolio",
      url: siteUrl,
      description,
      inLanguage: ["zh-TW", "en"],
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Molly Su",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "作品集",
  ],
  authors: [{ name: "Molly Su", url: "https://kir4che.com" }],
  creator: "Molly Su",
  publisher: "Molly Su",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Molly Su",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Molly Su 前端工程師作品集",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@kir4che",
    images: [socialImage],
  },
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
};

export const viewport: Viewport = {
  themeColor: "#f7f3ed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <RainbowGlow />
          {children}
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import RainbowGlow from "@/components/RainbowGlow";
import { LanguageProvider } from "@/contexts/LanguageContext";

import "./globals.css";

const title = "Molly Su｜前端工程師";
const description =
  "Molly Su 的前端作品集——享受把想法變成畫面的過程，對新技術保持好奇。";

export const metadata: Metadata = {
  metadataBase: new URL("https://kir4che.com"),
  title,
  description,
  authors: [{ name: "Molly Su", url: "https://kir4che.com" }],
  openGraph: {
    title,
    description,
    url: "https://kir4che.com",
    siteName: "Molly Su",
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@kir4che",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(performance.getEntriesByType('navigation')[0]?.type==='back_forward')location.reload();}catch(e){}",
          }}
        />
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
        <LanguageProvider>
          <RainbowGlow />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

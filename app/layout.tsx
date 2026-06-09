import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { template: "%s | Abhijit Dalal", default: "Abhijit Dalal — Engineer · ML / AI" },
  description: "I build apps and study how intelligence works. Engineer from India.",
  metadataBase: new URL("https://portfolio-website-rosy-pi-50.vercel.app"),
  twitter: { card: "summary_large_image", creator: "@abhijitdalal_" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f%5B%5D=general-sans@400,500,600,700&f%5B%5D=clash-display@500,600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

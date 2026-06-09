import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Abhijit Dalal",
    default: "Abhijit Dalal",
  },
  description:
    "Electronics student from Mumbai. I build apps and study how intelligence works — deep learning, transformers, and shipping things.",
  metadataBase: new URL("https://portfolio-website-rosy-pi-50.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-website-rosy-pi-50.vercel.app",
    siteName: "Abhijit Dalal",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@abhijitdalal_",
    site: "@abhijitdalal_",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Plain static files in out/, served by Cloudflare Pages.
  output: "export",
  // No image-resizing server on static hosting.
  images: { unoptimized: true },
};

export default withMDX(nextConfig);

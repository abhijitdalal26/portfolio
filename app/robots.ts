import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://portfolio-website-rosy-pi-50.vercel.app/sitemap.xml",
  };
}

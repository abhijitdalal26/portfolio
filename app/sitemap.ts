import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postRoutes,
    ...projectRoutes,
  ];
}

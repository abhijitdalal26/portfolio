import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string };

export function extractHeadings(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingLines = markdown.match(/^##\s+.+$/gm) ?? [];
  return headingLines.map((line) => {
    const text = line.replace(/^##\s+/, "").trim();
    return { id: slugger.slug(text), text };
  });
}

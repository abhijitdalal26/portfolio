export interface SubstackPost {
  title: string;
  link: string;
  date: string; // ISO string
  description: string;
}

const FEED_URL = "https://abhijitdalal.substack.com/feed";

/** Pull the inner text of a tag, handling both plain and CDATA content. */
function grab(tag: string, xml: string): string {
  const cdata = xml.match(
    new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`)
  );
  if (cdata) return cdata[1].trim();

  const plain = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (plain) return plain[1].trim();

  return "";
}

/** Strip any HTML tags and decode common entities from an RSS description. */
function cleanDescription(raw: string): string {
  const text = raw.replace(/<[^>]*>/g, "");
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&#8217;": "\u2019",
    "&#8220;": "\u201c",
    "&#8221;": "\u201d",
    "&#8230;": "\u2026",
  };
  return text
    .replace(/&[#a-zA-Z0-9]+;/g, (m) => entities[m] ?? m)
    .trim();
}

/** Fetch the Substack RSS feed and return parsed posts, newest first. */
export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

    const posts: SubstackPost[] = items
      .map((item) => {
        const title = grab("title", item);
        const link = grab("link", item);
        const pubDate = grab("pubDate", item);
        const description = cleanDescription(grab("description", item));

        return {
          title,
          link,
          date: pubDate ? new Date(pubDate).toISOString() : "",
          description,
        };
      })
      .filter((p) => p.title && p.link);

    // RSS is newest-first already, but sort defensively by date.
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    // Network unavailable (e.g. offline build) — degrade to no Substack posts.
    return [];
  }
}

/** Format an ISO date as "Oct 22, 2026" (day included, unlike local formatDate). */
export function formatSubstackDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

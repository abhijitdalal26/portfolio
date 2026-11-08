// Public address of the site. Set NEXT_PUBLIC_SITE_URL in the Cloudflare Pages
// build settings once the custom domain is live.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhijitdalal.com"
).replace(/\/$/, "");

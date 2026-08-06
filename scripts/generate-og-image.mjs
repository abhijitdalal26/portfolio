// One-off generator for public/og-image.png — run with `node scripts/generate-og-image.mjs`.
// Uses next/og's ImageResponse (bundled with Next.js, no extra dependency) to render
// a branded 1200x630 social-preview image matching the site's light-theme tokens.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { ImageResponse } from "next/og.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const avatarBuffer = readFileSync(join(root, "public", "avatar-1.jpg"));
const avatarDataUri = `data:image/jpeg;base64,${avatarBuffer.toString("base64")}`;

const h = React.createElement;

const element = h(
  "div",
  {
    style: {
      width: "1200px",
      height: "630px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#fafaf9",
      padding: "80px",
      fontFamily: "sans-serif",
    },
  },
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: "40px" } },
    h("img", {
      src: avatarDataUri,
      width: 148,
      height: 148,
      style: { borderRadius: "50%", objectFit: "cover" },
    }),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-2px",
            color: "#111110",
            lineHeight: 1.05,
          },
        },
        "Abhijit Dalal"
      ),
      h(
        "div",
        {
          style: {
            fontSize: 28,
            fontWeight: 500,
            color: "#6b6966",
            marginTop: "14px",
            display: "flex",
            gap: "14px",
          },
        },
        h("span", null, "Student"),
        h("span", { style: { color: "#a09e9a" } }, "•"),
        h("span", null, "Builder"),
        h("span", { style: { color: "#a09e9a" } }, "•"),
        h("span", null, "Engineer")
      )
    )
  ),
  h(
    "div",
    {
      style: {
        fontSize: 30,
        color: "#111110",
        lineHeight: 1.5,
        maxWidth: "920px",
      },
    },
    "I build apps and study how intelligence works. Engineer from India."
  ),
  h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    h("div", { style: { width: "64px", height: "6px", background: "#2563eb", borderRadius: "3px", display: "flex" } }),
    h(
      "div",
      { style: { fontSize: 22, color: "#a09e9a", letterSpacing: "0.5px" } },
      "abhijitdalal.vercel.app"
    )
  )
);

const response = new ImageResponse(element, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());
writeFileSync(join(root, "public", "og-image.png"), buffer);
console.log("Wrote public/og-image.png:", buffer.length, "bytes");

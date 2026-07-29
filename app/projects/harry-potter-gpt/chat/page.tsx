import type { Metadata } from "next";
import Link from "next/link";
import { HarryPotterChat } from "@/components/HarryPotterChat";
import { StageComparison } from "@/components/StageComparison";

export const metadata: Metadata = {
  title: "Chat — Harry Potter GPT",
  description: "Chat with the DPO-aligned Harry Potter GPT model, running entirely in your browser.",
};

export default function HarryPotterChatPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-wrap" style={{ paddingTop: 48, paddingBottom: 88 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Link
            href="/projects/harry-potter-gpt"
            style={{ fontSize: 13.5, color: "var(--sub)", textDecoration: "none", display: "inline-block", marginBottom: 20 }}
          >
            ← Back to project
          </Link>
          <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(28px, 4.5vw, 40px)", letterSpacing: "-0.04em", lineHeight: 1.05, fontWeight: 700, marginBottom: 12 }}>
            Chat with Harry Potter GPT
          </h1>
          <p style={{ fontSize: 15.5, color: "var(--sub)", lineHeight: 1.65, marginBottom: 32 }}>
            The final, DPO-aligned stage of the model, running fully client-side — nothing you type
            leaves your browser. It&apos;s a 124M-parameter model trained on a hobby budget, so expect
            confidently wrong lore and the occasional derail.
          </p>
          <HarryPotterChat />

          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
              How the model evolved
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--sub)", lineHeight: 1.6, marginBottom: 20 }}>
              The same questions, asked at each of the three training stages — pretraining, SFT, and DPO —
              all from the same final run, not cherry-picked. Click a question to expand.
            </p>
            <StageComparison />
          </div>
        </div>
      </div>
    </div>
  );
}

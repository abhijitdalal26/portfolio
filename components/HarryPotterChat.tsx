"use client";

import { useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type Status = "idle" | "loading" | "ready" | "generating" | "error";

const MODEL_ID = "abhijit26/harry-potter-gpt-dpo-onnx";
const USER_TAG = "<|user|>";
const ASST_TAG = "<|assistant|>";

const EXAMPLES = [
  "Who is Harry Potter?",
  "Is Dumbledore a good person?",
  "I just finished Prisoner of Azkaban and I am destroyed about Sirius",
];

export function HarryPotterChat() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const generatorRef = useRef<((text: string, opts: Record<string, unknown>) => Promise<Array<{ generated_text: string }>>) | null>(null);

  async function loadModel() {
    setStatus("loading");
    setError(null);
    try {
      const { pipeline } = await import("@huggingface/transformers");
      const generator = await pipeline("text-generation", MODEL_ID, {
        dtype: "q8",
        progress_callback: (data: { status?: string; file?: string; loaded?: number; total?: number; progress?: number }) => {
          if (data.status === "progress" && data.file?.endsWith(".onnx") && data.total) {
            setProgress(Math.round((data.progress ?? 0)));
            setProgressLabel(`${(( data.loaded ?? 0) / 1e6).toFixed(0)}MB / ${(data.total / 1e6).toFixed(0)}MB`);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      generatorRef.current = generator as any;
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setError("Couldn't load the model. Your browser may not support WebAssembly/WebGPU, or the download was interrupted, try reloading.");
      setStatus("error");
    }
  }

  async function send(question?: string) {
    const q = (question ?? input).trim();
    if (!q || !generatorRef.current) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setStatus("generating");
    try {
      const prompt = `${USER_TAG} ${q}\n${ASST_TAG}`;
      const output = await generatorRef.current(prompt, {
        max_new_tokens: 150,
        temperature: 0.8,
        top_p: 0.9,
        top_k: 50,
        do_sample: true,
      });
      let text = output[0].generated_text.slice(prompt.length).trim();
      for (const stop of [USER_TAG, "<|endoftext|>"]) {
        if (text.includes(stop)) text = text.split(stop)[0].trim();
      }
      setMessages((m) => [...m, { role: "assistant", content: text || "…" }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: "assistant", content: "(generation failed, try again)" }]);
    }
    setStatus("ready");
  }

  return (
    <div style={{ borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)", overflow: "hidden" }}>
      {status === "idle" && (
        <div style={{ padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ fontSize: 15, color: "var(--sub)", maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
            This runs entirely in your browser, nothing is sent to a server. The DPO-aligned model
            (~164MB, quantized) downloads once and is cached by your browser afterward.
          </p>
          <button onClick={loadModel} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
            Download the model to chat (~164MB)
          </button>
        </div>
      )}

      {status === "loading" && (
        <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <p style={{ fontSize: 15, color: "var(--ink)", margin: 0 }}>Downloading model…</p>
          <div style={{ width: "100%", maxWidth: 360, height: 8, borderRadius: 999, background: "var(--line)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--accent)",
                transition: "width 0.2s ease",
              }}
            />
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--faint)", margin: 0 }}>
            {progress}% {progressLabel && `· ${progressLabel}`}
          </p>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <p style={{ fontSize: 14.5, color: "var(--ink)", maxWidth: 420, margin: 0 }}>{error}</p>
          <button onClick={loadModel} className="btn-ghost" style={{ cursor: "pointer" }}>Try again</button>
        </div>
      )}

      {(status === "ready" || status === "generating") && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ minHeight: 260, maxHeight: 440, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.length === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    className="chip"
                    style={{ cursor: "pointer", background: "var(--bg)" }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.role === "user" ? "var(--ink)" : "var(--bg)",
                  color: m.role === "user" ? "var(--bg)" : "var(--ink)",
                  border: m.role === "assistant" ? "1px solid var(--line)" : "none",
                  borderRadius: 14,
                  padding: "10px 14px",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                }}
              >
                {m.content}
              </div>
            ))}
            {status === "generating" && (
              <div style={{ alignSelf: "flex-start", color: "var(--faint)", fontSize: 13.5, fontFamily: "var(--mono)" }}>
                generating…
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            style={{ display: "flex", gap: 10, padding: 16, borderTop: "1px solid var(--line)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Harry Potter…"
              disabled={status === "generating"}
              style={{
                flex: 1,
                fontSize: 14.5,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--ink)",
              }}
            />
            <button
              type="submit"
              disabled={status === "generating" || !input.trim()}
              className="btn-primary"
              style={{ border: "none", cursor: "pointer", opacity: status === "generating" ? 0.6 : 1 }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

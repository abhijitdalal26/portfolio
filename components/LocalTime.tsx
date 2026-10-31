"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
}

/** Live Mumbai time (IST, HH:MM). Renders a placeholder on the server to avoid a hydration mismatch. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--");
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>;
}

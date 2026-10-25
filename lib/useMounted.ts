import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True only on the client after hydration; false during SSR. */
export function useMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

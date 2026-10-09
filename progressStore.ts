export type ProgressListener = (progress: number) => void;

function createProgressStore() {
  let value = 0;
  const listeners = new Set<ProgressListener>();

  return {
    get: () => value,
    set(next: number) {
      if (next === value) return;
      value = next;
      listeners.forEach((listener) => listener(next));
    },
    subscribe(listener: ProgressListener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/**
 * Smoothed (eased) journey progress in the 0–1 range, published by the render loop
 * once per animation frame. Lives outside React so per-frame updates never trigger renders.
 */
export const journeyProgress = createProgressStore();

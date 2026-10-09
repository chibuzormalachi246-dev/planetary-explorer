import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { journeyProgress, type ProgressListener } from '../journey/progressStore';

/**
 * Subscribes to a value derived from the journey progress.
 * The component only re-renders when the selected primitive actually changes.
 */
export function useProgressSelector<T extends string | number | boolean>(selector: (progress: number) => T): T {
  return useSyncExternalStore(journeyProgress.subscribe, () => selector(journeyProgress.get()));
}

/**
 * Runs `listener` on every progress update without re-rendering —
 * ideal for writing straight to DOM nodes (progress bars, readouts).
 */
export function useProgressListener(listener: ProgressListener) {
  const listenerRef = useRef(listener);

  useLayoutEffect(() => {
    listenerRef.current = listener;
  });

  useEffect(() => {
    const handle: ProgressListener = (progress) => listenerRef.current(progress);
    handle(journeyProgress.get());
    return journeyProgress.subscribe(handle);
  }, []);
}

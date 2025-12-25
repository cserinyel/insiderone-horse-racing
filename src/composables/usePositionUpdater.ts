import { watch, onUnmounted } from "vue";
import type { ComputedRef } from "vue";
import { UPDATE_INTERVAL_MS } from "../utils/constants";
import { RACE_STATE, type RaceState } from "../types/race";

export function usePositionUpdater(
  raceState: ComputedRef<RaceState>,
  onUpdate: () => void
) {
  let intervalRef: number | null = null;

  const start = () => {
    if (intervalRef) return;
    intervalRef = window.setInterval(() => {
      if (raceState.value === RACE_STATE.RUNNING) {
        onUpdate();
      }
    }, UPDATE_INTERVAL_MS);
  };

  const stop = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
      intervalRef = null;
    }
  };

  watch(raceState, (state) => {
    if (state === RACE_STATE.RUNNING) {
      start();
    } else {
      stop();
    }
  });

  onUnmounted(stop);

  return { start, stop };
}

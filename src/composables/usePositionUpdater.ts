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

  // Optimize watch with immediate option and better condition check
  watch(
    raceState,
    (newState) => {
      if (newState === RACE_STATE.RUNNING) {
        start();
      } else {
        stop();
      }
    },
    { immediate: true } // Start immediately if already running
  );

  onUnmounted(stop);

  return { start, stop };
}

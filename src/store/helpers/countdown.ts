import { COUNTDOWN_INTERVAL_MS } from "../../utils/constants";

let countdownIntervalRef: number | null = null;

export function clearCountdownInterval(): void {
  if (countdownIntervalRef) {
    clearInterval(countdownIntervalRef);
    countdownIntervalRef = null;
  }
}

export function runCountdownInterval(
  commit: (type: string, payload?: unknown) => void,
  dispatch: (type: string, payload?: unknown) => Promise<unknown>,
  getCountdownValue: () => number
): void {
  clearCountdownInterval();

  countdownIntervalRef = window.setInterval(() => {
    const currentValue = getCountdownValue();
    if (currentValue > 1) {
      commit("SET_COUNTDOWN_VALUE", currentValue - 1);
    } else {
      clearCountdownInterval();
      dispatch("startLap");
    }
  }, COUNTDOWN_INTERVAL_MS);
}

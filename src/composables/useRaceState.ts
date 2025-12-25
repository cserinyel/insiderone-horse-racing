import { computed } from "vue";
import { useStore } from "../store";

export function useRaceState() {
  const store = useStore();

  return {
    // Getters
    horses: computed(() => store.getters["raceStore/horses"]),
    raceSchedule: computed(() => store.getters["raceStore/raceSchedule"]),
    isRaceScheduleGenerated: computed(
      () => store.getters["raceStore/isRaceScheduleGenerated"]
    ),
    currentLap: computed(() => store.getters["raceStore/getCurrentLap"]),
    raceState: computed(() => store.getters["raceStore/raceState"]),
    countdownValue: computed(() => store.getters["raceStore/countdownValue"]),
    horsePositions: computed(() => store.getters["raceStore/horsePositions"]),
    lapResults: computed(() => store.getters["raceStore/lapResults"]),

    // Actions
    generateSchedule: () =>
      store.dispatch("raceStore/generateRandomRaceSchedule"),
    startRace: () => store.dispatch("raceStore/startRace"),
    pauseRace: () => store.dispatch("raceStore/pauseRace"),
    resumeRace: () => store.dispatch("raceStore/resumeRace"),
    updatePositions: () => store.dispatch("raceStore/updateRacePositions"),
    hardResetRace: () => store.dispatch("raceStore/hardResetRace"),
  };
}

import { computed } from "vue";
import { useStore } from "vuex";

export function useRaceState() {
  const store = useStore();

  return {
    // Getters
    currentLap: computed(() => store.getters["raceStore/getCurrentLap"]),
    raceState: computed(() => store.getters["raceStore/raceState"]),
    countdownValue: computed(() => store.getters["raceStore/countdownValue"]),
    horsePositions: computed(() => store.getters["raceStore/horsePositions"]),

    // Actions
    pauseRace: () => store.dispatch("raceStore/pauseRace"),
    updatePositions: () => store.dispatch("raceStore/updateRacePositions"),
  };
}


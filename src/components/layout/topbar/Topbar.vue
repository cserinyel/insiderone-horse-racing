<script setup lang="ts">
import { computed } from "vue";
import Button from "../../common/button/Button.vue";
import { useStore } from "vuex";
import { RACE_STATE } from "../../../types/race";

defineProps<{
  title: string;
}>();

const store = useStore();
const generateRandomRaceSchedule = () => {
  store.dispatch("raceStore/generateRandomRaceSchedule");
};
const isRaceScheduleGenerated = computed(
  () => store.getters["raceStore/isRaceScheduleGenerated"]
);
const raceState = computed(() => store.getters["raceStore/raceState"]);

const toggleRace = () => {
  if (raceState.value === RACE_STATE.PAUSED) {
    // Resume race
    store.dispatch("raceStore/resumeRace");
  } else if (
    raceState.value === RACE_STATE.RUNNING ||
    raceState.value === RACE_STATE.COUNTDOWN
  ) {
    // Pause race (works for both running and countdown)
    store.dispatch("raceStore/pauseRace");
  } else {
    // Start race
    store.dispatch("raceStore/startRace");
  }
};
const resetRace = () => {
  store.dispatch("raceStore/hardResetRace");
};

const getButtonLabel = computed(() => {
  if (raceState.value === RACE_STATE.PAUSED) {
    return "Resume Race";
  } else if (
    raceState.value === RACE_STATE.RUNNING ||
    raceState.value === RACE_STATE.COUNTDOWN
  ) {
    return "Pause Race";
  } else {
    return "Start Races";
  }
});

const isButtonDisabled = computed(() => {
  if (
    raceState.value === RACE_STATE.PAUSED ||
    raceState.value === RACE_STATE.RUNNING ||
    raceState.value === RACE_STATE.COUNTDOWN
  ) {
    return false; // Can pause/resume anytime during race or countdown
  }
  return !isRaceScheduleGenerated.value; // Can only start if schedule is generated
});
</script>

<template>
  <header class="topbar">
    <h1 class="app-title">{{ title }}</h1>
    <div class="race-controls-container">
      <Button label="Reset Race" :onClick="resetRace" />
      <Button label="Generate Schedule" :onClick="generateRandomRaceSchedule" />
      <Button
        :label="getButtonLabel"
        :disabled="isButtonDisabled"
        :onClick="toggleRace"
      />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: rgba(26, 26, 26, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: inherit;
}
.race-controls-container {
  display: flex;
  gap: 10px;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import Button from "../../common/button/Button.vue";
import { RACE_STATE } from "../../../types/race";
import { useRaceState } from "../../../composables/useRaceState";

const { raceState, isRaceScheduleGenerated, startRace, pauseRace, resumeRace } =
  useRaceState();

const toggleRace = () => {
  if (raceState.value === RACE_STATE.PAUSED) {
    resumeRace();
  } else if (
    raceState.value === RACE_STATE.RUNNING ||
    raceState.value === RACE_STATE.COUNTDOWN
  ) {
    pauseRace();
  } else {
    startRace();
  }
};

const buttonLabel = computed(() => {
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

const isDisabled = computed(() => {
  if (
    raceState.value === RACE_STATE.PAUSED ||
    raceState.value === RACE_STATE.RUNNING ||
    raceState.value === RACE_STATE.COUNTDOWN
  ) {
    return false; // Can pause/resume anytime during race or countdown
  }
  return (
    raceState.value === RACE_STATE.FINISHED || !isRaceScheduleGenerated.value
  ); // Can only start if schedule is generated or the race is not finished
});
</script>

<template>
  <Button :label="buttonLabel" :disabled="isDisabled" :onClick="toggleRace" />
</template>

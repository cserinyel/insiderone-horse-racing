<script setup lang="ts">
import { computed } from "vue";
import Button from "../../common/button/Button.vue";
import { RACE_STATE } from "../../../types/race";
import { useRaceState } from "../../../composables/useRaceState";

const { raceState, generateSchedule } = useRaceState();

const buttonLabel = computed(() => {
  if (raceState.value === RACE_STATE.FINISHED) {
    return "Generate New Schedule";
  }
  return "Generate Schedule";
});
</script>

<template>
  <Button :label="buttonLabel" :onClick="generateSchedule" />
</template>

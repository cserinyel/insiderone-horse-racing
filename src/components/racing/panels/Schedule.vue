<script setup lang="ts">
import LapPositionList from "./LapPositionList.vue";
import { useRaceState } from "../../../composables/useRaceState";

const { raceSchedule } = useRaceState();
</script>

<template>
  <div class="schedule-container">
    <h1 class="schedule-header">Schedule</h1>
    <p v-if="!raceSchedule.length" class="no-schedule">No schedule available</p>
    <div v-else class="schedule-list-container">
      <LapPositionList
        v-for="race in raceSchedule"
        :key="race.id"
        :lapName="race.lapName"
        :lapDistance="race.lapDistance"
        :horses="race.horses"
      />
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 250px;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 8px;
}

.schedule-header {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.no-schedule {
  color: #888;
  font-style: italic;
  margin: 0;
}

.schedule-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>


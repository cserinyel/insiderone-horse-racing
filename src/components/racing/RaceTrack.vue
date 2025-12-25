<script setup lang="ts">
import { useRaceState } from "../../composables/useRaceState";
import { usePositionUpdater } from "../../composables/usePositionUpdater";
import { useVisibilityPause } from "../../composables/useVisibilityPause";
import CountdownOverlay from "./CountdownOverlay.vue";
import HorseLane from "./HorseLane.vue";
import { RACE_STATE } from "../../types/race";

const {
  currentLap,
  raceState,
  countdownValue,
  horsePositions,
  pauseRace,
  updatePositions,
} = useRaceState();

usePositionUpdater(raceState, updatePositions);
useVisibilityPause(pauseRace);

const getPosition = (horseId: string) => horsePositions.value[horseId] || 0;
</script>

<template>
  <div class="race-track-container">
    <div class="race-track-header-container">
      <h1 class="race-track-header">Race Track</h1>
      <p v-if="currentLap" class="race-track-header-text">
        {{ currentLap.lapName }} - {{ currentLap.lapDistance }}m
      </p>
    </div>

    <p v-if="!currentLap" class="no-lap">No lap available</p>

    <div v-else class="race-track-lap-container">
      <CountdownOverlay
        :race-state="raceState"
        :countdown-value="countdownValue"
        :lap-name="currentLap.lapName"
      />

      <div
        v-if="raceState !== RACE_STATE.FINISHED"
        class="race-track-lap-horses-container"
      >
        <HorseLane
          v-for="(horse, index) in currentLap.horses"
          :key="horse.id"
          :horse="horse"
          :lane-number="Number(index) + 1"
          :position="getPosition(horse.id)"
          :race-state="raceState"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-track-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
}

.race-track-header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.race-track-header-text {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.race-track-header {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.race-track-lap-container {
  position: relative;
  height: 100%;
}

.race-track-lap-horses-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.no-lap {
  color: var(--text-color);
  font-style: italic;
  margin: 0;
  opacity: 0.5;
}
</style>

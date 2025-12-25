<script setup lang="ts">
import { useRaceState } from "../../../composables/useRaceState";
import { usePositionUpdater } from "../../../composables/usePositionUpdater";
import { useVisibilityPause } from "../../../composables/useVisibilityPause";
import CountdownOverlay from "./CountdownOverlay.vue";
import HorseLane from "./HorseLane.vue";
import RaceInfoOverlay from "./RaceInfoOverlay.vue";
import { ResetRaceButton, GenerateScheduleButton } from "../controls";
import { RACE_STATE } from "../../../types/race";
import type { HorseId } from "../../../types/horse";

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

const getPosition = (horseId: HorseId) => horsePositions.value[horseId] || 0;
</script>

<template>
  <div class="race-track-container">
    <div class="race-track-header-container">
      <h1 class="race-track-header">Race Track</h1>
      <p
        v-if="currentLap && raceState !== RACE_STATE.FINISHED"
        class="race-track-header-text"
      >
        {{ currentLap.lapName }} - {{ currentLap.lapDistance }}m
      </p>
    </div>
    <RaceInfoOverlay
      v-if="raceState === RACE_STATE.IDLE && !currentLap"
      title="Ready to start a new race?"
      message="Click the button below to generate a new race schedule."
    >
      <template #actions>
        <GenerateScheduleButton />
      </template>
    </RaceInfoOverlay>
    <CountdownOverlay
      v-else-if="
        (raceState === RACE_STATE.COUNTDOWN ||
          raceState === RACE_STATE.PAUSED) &&
        currentLap
      "
      :title="
        raceState === RACE_STATE.COUNTDOWN
          ? String(countdownValue)
          : 'Race Paused'
      "
      :message="
        raceState === RACE_STATE.COUNTDOWN
          ? `Get ready! ${currentLap.lapName}`
          : 'Press Resume to continue'
      "
      :title-size="raceState === RACE_STATE.COUNTDOWN ? 'large' : 'normal'"
    />

    <div v-else class="race-track-lap-container">
      <div
        v-if="raceState !== RACE_STATE.FINISHED && currentLap"
        class="race-track-lap-horses-container"
      >
        <HorseLane
          v-for="(horse, index) in currentLap?.horses"
          :key="horse.id"
          :horse="horse"
          :lane-number="Number(index) + 1"
          :position="getPosition(horse.id)"
          :race-state="raceState"
        />
      </div>

      <RaceInfoOverlay
        v-else
        title="Race Finished!"
        message="All laps have been completed."
      >
        <template #actions>
          <ResetRaceButton />
          <GenerateScheduleButton />
        </template>
      </RaceInfoOverlay>
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
</style>

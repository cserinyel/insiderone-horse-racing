<script setup lang="ts">
import { computed } from "vue";
import HorseIcon from "../../common/HorseIcon.vue";
import { RACE_STATE, type RaceState } from "../../../types/race";
import type { Horse } from "../../../types/horse";
import { FINISH_LINE_POSITION, INITIAL_POSITION } from "../../../utils/constants";

const props = defineProps<{
  horse: Horse;
  laneNumber: number;
  position: number;
  raceState: RaceState;
}>();

const isOddLane = computed(() => props.laneNumber % 2 === 0);

const isMoving = computed(
  () =>
    props.position > INITIAL_POSITION && props.position < FINISH_LINE_POSITION
);
</script>

<template>
  <div class="race-track-lane-container">
    <p class="race-track-lane-number">{{ laneNumber }}</p>
    <div
      class="race-track-lane-horse-container"
      :class="{ 'odd-lane': isOddLane }"
    >
      <div
        class="race-track-lane-horse"
        :class="{
          'has-transition': raceState === RACE_STATE.RUNNING,
          wobbling: isMoving,
        }"
        :style="{
          left: `${position}%`,
          transform: `translateX(-${position}%)`,
        }"
      >
        <HorseIcon :color="horse.color.hex" />
      </div>
      <span class="horse-name">{{ horse.name }}</span>
      <div class="finish-line"></div>
    </div>
  </div>
</template>

<style scoped>
.race-track-lane-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 8px;
  height: 100%;
}
.race-track-lane-horse-container {
  background-color: var(--track-color);
  height: 100%;
}
.race-track-lane-horse-container.odd-lane {
  background-color: var(--track-color-odd);
}
.race-track-lane-number {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  width: 20px;
  text-align: center;
  color: var(--accent-color);
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
}

.race-track-lane-horse-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

.race-track-lane-horse {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  transition: none;
}

.race-track-lane-horse.has-transition {
  transition: left 0.25s linear;
}

.race-track-lane-horse.wobbling :deep(.horse-icon) {
  animation: wobble 0.3s ease-in-out infinite;
}

@keyframes wobble {
  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }
  25% {
    transform: rotate(-3deg) translateY(-2px);
  }
  50% {
    transform: rotate(0deg) translateY(0);
  }
  75% {
    transform: rotate(3deg) translateY(-2px);
  }
}

.horse-name {
  font-size: 1.5em;
  color: var(--text-color);
  opacity: 0.2;
  padding: 4px 8px;
  margin-right: 3rem;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 18px;
  background-color: var(--accent-color);
  background-image: linear-gradient(
      45deg,
      var(--track-color-odd) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, var(--track-color-odd) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--track-color-odd) 75%),
    linear-gradient(-45deg, transparent 75%, var(--track-color-odd) 75%);
  background-size: 12px 12px;
  background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
  z-index: 1;
  opacity: 0.2;
}
</style>


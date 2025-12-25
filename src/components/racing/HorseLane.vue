<script setup lang="ts">
import { computed } from "vue";
import HorseIcon from "../common/HorseIcon.vue";
import { RACE_STATE, type RaceState } from "../../types/race";

const props = defineProps<{
  horse: {
    id: string;
    name: string;
    color: { hex: string };
  };
  laneNumber: number;
  position: number;
  raceState: RaceState;
}>();

const isMoving = computed(() => props.position > 0 && props.position < 100);
</script>

<template>
  <div class="race-track-lane-container">
    <p class="race-track-lane-number">{{ laneNumber }}</p>
    <div class="race-track-lane-horse-container">
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
      <div class="finish-line"></div>
    </div>
    <span class="horse-name">{{ horse.name }}</span>
  </div>
</template>

<style scoped>
.race-track-lane-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 8px;
  position: relative;
}

.race-track-lane-number {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  width: 20px;
  text-align: center;
  color: #000;
  background-color: rgb(255, 178, 78);
  border-radius: 8px;
  padding: 4px 8px;
}

.race-track-lane-horse-container {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgb(255, 178, 78);
  position: relative;
  height: 60px;
}

.race-track-lane-horse {
  display: flex;
  align-items: center;
  position: absolute;
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
  font-size: 12px;
  color: white;
  opacity: 0.5;
  padding: 2px 6px;
  white-space: nowrap;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgb(255, 178, 78);
  z-index: 1;
}
</style>


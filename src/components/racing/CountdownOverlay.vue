<script setup lang="ts">
import { RACE_STATE } from "../../types/race";

defineProps<{
  raceState: string;
  countdownValue: number;
  lapName: string;
}>();
</script>

<template>
  <div
    v-if="raceState === RACE_STATE.COUNTDOWN || raceState === RACE_STATE.PAUSED"
    class="countdown-overlay"
  >
    <div class="countdown-content">
      <div
        v-if="raceState === RACE_STATE.PAUSED"
        class="countdown-number paused-text"
      >
        Race Paused
      </div>
      <div v-else class="countdown-number">{{ countdownValue }}</div>
      <p class="countdown-text">
        {{
          raceState === RACE_STATE.COUNTDOWN
            ? `Get ready! ${lapName}`
            : "Press Resume to continue"
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 8px;
}

.countdown-content {
  text-align: center;
}

.countdown-number {
  font-size: 120px;
  font-weight: 700;
  color: rgb(255, 178, 78);
  line-height: 1;
  margin-bottom: 20px;
}

.countdown-number.paused-text {
  font-size: 80px;
  font-weight: 600;
}

.countdown-text {
  font-size: 24px;
  color: white;
  margin: 0;
}
</style>


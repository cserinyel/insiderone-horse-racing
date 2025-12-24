<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import horseSvg from "../../assets/horse.svg";

const store = useStore();
const currentLap = computed(() => store.getters["raceStore/getCurrentLap"]);
</script>

<template>
  <div class="race-track-container">
    <h1 class="race-track-header">Race Track</h1>
    <p v-if="!currentLap" class="no-lap">No lap available</p>
    <div v-else class="race-track-lap-container">
      <div class="race-track-lap-horses-container">
        <div
          v-for="(horse, index) in currentLap.horses"
          :key="horse.id"
          class="race-track-lane-container"
        >
          <p class="race-track-lane-number">{{ Number(index) + 1 }}</p>
          <div class="race-track-lane-horse-container">
            <div class="race-track-lane-horse">
              <img
                :src="horseSvg"
                alt="Horse"
                class="race-track-lap-horse-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="race-track-lap-progress-container">
        <p class="race-track-lap-distance">
          {{ currentLap.lapName }} - {{ currentLap.lapDistance }}m
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-track-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
.race-track-lap-progress-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.race-track-lane-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.race-track-lane-horse-container {
  display: flex;
  width: 100%;
  background-color: blue;
}
.race-track-lap-horse-image {
  width: 50px;
  height: 50px;
}
</style>

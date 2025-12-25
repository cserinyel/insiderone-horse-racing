<script setup lang="ts">
import { computed } from "vue";
import Button from "../../common/button/Button.vue";
import { useStore } from "vuex";

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
</script>

<template>
  <header class="topbar">
    <h1 class="app-title">{{ title }}</h1>
    <div class="race-controls-container">
      <Button
        label="Generate Schedule"
        :onClick="
          () => {
            generateRandomRaceSchedule();
          }
        "
      />
      <Button
        label="Start Races"
        :disabled="!isRaceScheduleGenerated"
        :onClick="() => {}"
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

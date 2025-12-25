<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import LapPositionList from "./LapPositionList.vue";
import type { RaceResult, ResultWithLapInfo } from "../../types/race";

const store = useStore();
const raceSchedule = computed(() => store.getters["raceStore/raceSchedule"]);
const lapResults = computed(() => store.getters["raceStore/lapResults"]);

const resultsWithLapInfo = computed<ResultWithLapInfo[]>(() => {
  return lapResults.value.map((results: RaceResult[], index: number) => {
    const lapInfo = raceSchedule.value[index];
    return {
      lapInfo,
      results,
    };
  });
});
</script>

<template>
  <div class="results-container">
    <h1 class="results-header">Results</h1>
    <p v-if="!lapResults.length" class="no-results">No results available</p>
    <div v-else class="results-list-container">
      <LapPositionList
        v-for="(resultData, index) in resultsWithLapInfo"
        :key="index"
        :lapName="resultData.lapInfo?.lapName ?? ''"
        :lapDistance="resultData.lapInfo?.lapDistance ?? 0"
        :results="resultData.results"
      />
    </div>
  </div>
</template>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 8px;
}

.results-header {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.no-results {
  color: #888;
  font-style: italic;
  margin: 0;
}

.results-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>

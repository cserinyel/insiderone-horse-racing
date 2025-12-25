<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const raceSchedule = computed(() => store.getters["raceStore/raceSchedule"]);
const lapResults = computed(() => store.getters["raceStore/lapResults"]);

const resultsWithLapInfo = computed(() => {
  return lapResults.value.map((results, index) => {
    const lapInfo = raceSchedule.value[index];
    return {
      lapInfo,
      results,
    };
  });
});
</script>

<template>
  <div class="schedule-container">
    <h1 class="schedule-header">Results</h1>
    <p v-if="!lapResults.length" class="no-schedule">No results available</p>
    <div v-else class="schedule-tables-container">
      <div
        v-for="(resultData, index) in resultsWithLapInfo"
        :key="index"
        class="schedule-table"
      >
        <h2 class="schedule-table-header">
          {{ resultData.lapInfo?.lapName }} -
          {{ resultData.lapInfo?.lapDistance }}m
        </h2>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in resultData.results" :key="result.horse.id">
              <td>{{ result.position }}</td>
              <td>{{ result.horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
.schedule-tables-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
}
.schedule-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.schedule-table-header {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
</style>

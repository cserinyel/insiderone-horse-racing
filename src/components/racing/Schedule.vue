<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const raceSchedule = computed(() => store.getters["raceStore/raceSchedule"]);
</script>

<template>
  <div class="schedule-container">
    <h1 class="schedule-header">Schedule</h1>
    <p v-if="!raceSchedule.length" class="no-schedule">No schedule available</p>
    <div v-else class="schedule-tables-container">
      <div v-for="race in raceSchedule" :key="race.id" class="schedule-table">
        <h2 class="schedule-table-header">
          {{ race.lapName }} - {{ race.lapDistance }}m
        </h2>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, index) in race.horses" :key="horse.id">
              <td>{{ Number(index) + 1 }}</td>
              <td>{{ horse.name }}</td>
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

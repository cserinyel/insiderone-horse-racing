<script setup lang="ts">
import { computed } from "vue";
import type { Horse } from "../../../types/horse";
import type { RaceResult } from "../../../types/race";

interface Props {
  lapName: string;
  lapDistance: number;
  horses?: Horse[];
  results?: RaceResult[];
}

const props = defineProps<Props>();

// Unified list for both schedule (horses) and results
const positionItems = computed(() => {
  if (props.results) {
    return props.results.map((result) => ({
      position: result.position,
      name: result.horse.name,
      id: result.horse.id,
    }));
  }
  if (props.horses) {
    return props.horses.map((horse, index) => ({
      position: index + 1,
      name: horse.name,
      id: horse.id,
    }));
  }
  return [];
});
</script>

<template>
  <div class="lap-position-container">
    <h2 class="lap-position-header">{{ lapName }} - {{ lapDistance }}m</h2>
    <table class="lap-position-table">
      <thead>
        <tr>
          <th class="position-header">Pos.</th>
          <th class="name-header">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in positionItems" :key="item.id">
          <td class="position-cell">{{ item.position }}</td>
          <td class="name-cell">{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.lap-position-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lap-position-header {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.lap-position-table {
  width: 100%;
  border-collapse: collapse;
}

.lap-position-table th,
.lap-position-table td {
  padding: 8px;
  text-align: center;
  white-space: nowrap;
}

.lap-position-table th {
  color: var(--text-color);
  font-weight: 600;
  font-size: 1em;
  background-color: var(--header-color);
  box-shadow: inset 0 -1px 0 var(--border-color);
}

.lap-position-table th.position-header {
  width: 50px;
}

.lap-position-table th.name-header,
.lap-position-table td.name-cell {
  text-align: left;
}

.lap-position-table tbody tr:nth-child(even) {
  background-color: var(--track-color);
}
</style>


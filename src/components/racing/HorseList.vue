<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Pill from "../common/pill/Pill.vue";

const store = useStore();
const horses = computed(() => store.getters["raceStore/horses"]);
</script>

<template>
  <div class="horse-list-container">
    <h1 class="horse-list-header">Horse List</h1>
    <div class="horse-list-table-container">
      <table class="horse-list-table">
        <thead>
          <tr>
            <th class="horse-name-header">Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td class="horse-name">{{ horse.name }}</td>
            <td class="horse-condition">{{ horse.condition }}</td>
            <td class="horse-color">
              <Pill :colorHex="horse.color.hex" :colorName="horse.color.name" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.horse-list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  height: 100%;
  overflow: hidden;
}
.horse-list-table-container {
  height: 100%;
  overflow-y: auto;
}
.horse-list-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}
.horse-list-header {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}
.horse-list-table th,
.horse-list-table td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
  white-space: nowrap;
}
.horse-list-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
.horse-list-table th {
  background-color: #000;
  color: #fff;
  font-weight: 600;
  font-size: 1em;
}
.horse-list-table th.horse-name-header,
.horse-list-table td.horse-name {
  text-align: left;
}
.horse-list-table tbody tr:nth-child(even) {
  background-color: rgb(47, 47, 47);
}
</style>

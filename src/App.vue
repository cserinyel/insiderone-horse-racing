<script setup lang="ts">
import Topbar from "./components/layout/topbar/Topbar.vue";
import { RaceTrack } from "./components/racing/track";
import { HorseList, Schedule, Results } from "./components/racing/panels";
</script>

<template>
  <div class="dashboard">
    <Topbar title="Horse Racing" />
    <main class="content-area">
      <HorseList />
      <RaceTrack />
      <Schedule />
      <Results />
    </main>
  </div>
</template>
<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  overflow-x: hidden;
  display: flex;
  gap: 16px;
}
</style>

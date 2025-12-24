<script setup lang="ts">
import Topbar from "./components/layout/topbar/Topbar.vue";
import HorseList from "./components/racing/HorseList.vue";
import Schedule from "./components/racing/Schedule.vue";
import RaceTrack from "./components/racing/RaceTrack.vue";
import Results from "./components/racing/Results.vue";
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
  padding: 2rem;
  overflow-x: hidden;
  display: flex;
  gap: 2rem;
}
</style>

<script setup lang="ts">
import {
  StartRaceButton,
  ResetRaceButton,
  GenerateScheduleButton,
} from "../../racing/controls";
import logoSvg from "../../../assets/logo.svg";
</script>

<template>
  <header class="topbar">
    <img :src="logoSvg" alt="Horse Racing" class="app-logo" />
    <div class="race-controls-container">
      <ResetRaceButton />
      <GenerateScheduleButton />
      <StartRaceButton />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--header-color);
  border-bottom: 1px solid var(--border-color);
}

.app-logo {
  height: 40px;
  width: auto;
}
.race-controls-container {
  display: flex;
  gap: 10px;
}
</style>

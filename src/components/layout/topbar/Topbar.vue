<script setup lang="ts">
import {
  StartRaceButton,
  ResetRaceButton,
  GenerateScheduleButton,
} from "../../racing/controls";
import ThemeSwitcher from "../../common/themeSwitcher/ThemeSwitcher.vue";
import Logo from "../../common/images/Logo.vue";

defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="topbar">
    <Logo height="40px" />
    <div class="topbar-actions">
      <ThemeSwitcher />
      <div class="race-controls-container">
        <ResetRaceButton />
        <GenerateScheduleButton />
        <StartRaceButton />
      </div>
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

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.race-controls-container {
  display: flex;
  gap: 16px;
}
</style>

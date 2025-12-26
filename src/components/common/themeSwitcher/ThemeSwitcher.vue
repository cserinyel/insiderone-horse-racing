<script setup lang="ts">
import { useTheme } from "../../../composables/useTheme";
import SunIcon from "../images/SunIcon.vue";
import MoonIcon from "../images/MoonIcon.vue";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="theme-switcher"
    @click="toggleTheme"
    :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
    :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
  >
    <SunIcon v-if="theme === 'dark'" class="theme-icon" />
    <MoonIcon v-else class="theme-icon" />
  </button>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 35px;
  padding: 0;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
  cursor: pointer;
  color: var(--accent-color);
  font-size: 1em;
  font-weight: 500;
}

.theme-switcher:hover {
  background-color: var(--accent-color);
  color: #ffffff;
}

.theme-switcher:active {
  background-color: transparent;
  color: var(--accent-color);
}

.theme-icon {
  width: 20px;
  height: 20px;
}
</style>

<script setup lang="ts">
import type { ButtonProps } from "./Button.type";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
});
</script>

<template>
  <button @click="onClick" :disabled="disabled" :class="variant">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--accent-color);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
}

button:hover {
  background-color: var(--accent-color-hover);
}

button:active {
  background-color: var(--accent-color);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.border {
  background-color: transparent;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
}

button.border:hover {
  background-color: var(--accent-color);
  color: #ffffff;
}

button.border:active {
  background-color: transparent;
  color: var(--accent-color);
}
</style>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
}>();
</script>

<template>
  <div class="race-modal">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="race-modal-buttons">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.race-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 8px;
  padding: 16px;
}

.race-modal h2 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

.race-modal p {
  font-size: 1rem;
  margin: 0;
  color: var(--text-color);
  opacity: 0.7;
}

.race-modal-buttons {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
}
</style>

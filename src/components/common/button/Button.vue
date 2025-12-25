<script setup lang="ts">
defineProps<{
  label: string;
  onClick: () => void;
  disabled?: boolean;
}>();
</script>

<template>
  <button @click="onClick" :disabled="disabled">{{ label }}</button>
</template>

<style scoped>
button {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

button:active {
  background-color: #666;
}

button:disabled {
  background-color: #888;
  cursor: not-allowed;
}
</style>

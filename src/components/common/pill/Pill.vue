<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  colorHex: string;
  colorName: string;
}>();
const textColor = computed(() => {
  const r = parseInt(props.colorHex.slice(1, 3), 16);
  const g = parseInt(props.colorHex.slice(3, 5), 16);
  const b = parseInt(props.colorHex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000" : "#fff";
});
</script>

<template>
  <div class="pill" :style="{ backgroundColor: colorHex, color: textColor }">
    {{ colorName }}
  </div>
</template>

<style scoped>
.pill {
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>

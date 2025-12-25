<script setup lang="ts">
defineProps<{
  title: string;
  message?: string;
  titleSize?: "normal" | "large";
}>();
</script>

<template>
  <div class="countdown-overlay">
    <div class="countdown-content">
      <div
        class="countdown-title"
        :class="{ 'countdown-title--large': titleSize === 'large' }"
      >
        {{ title }}
      </div>
      <p v-if="message" class="countdown-message">{{ message }}</p>
      <div v-if="$slots.actions" class="countdown-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 8px;
}

.countdown-content {
  text-align: center;
}

.countdown-title {
  font-size: 80px;
  font-weight: 600;
  color: rgb(255, 178, 78);
  line-height: 1;
  margin-bottom: 20px;
}

.countdown-title--large {
  font-size: 120px;
  font-weight: 700;
}

.countdown-message {
  font-size: 24px;
  color: white;
  margin: 0;
}

.countdown-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
</style>


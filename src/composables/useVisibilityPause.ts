import { onMounted, onUnmounted } from "vue";

export function useVisibilityPause(onHidden: () => void) {
  const handler = () => {
    if (document.hidden) {
      onHidden();
    }
  };

  onMounted(() => {
    document.addEventListener("visibilitychange", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", handler);
  });
}


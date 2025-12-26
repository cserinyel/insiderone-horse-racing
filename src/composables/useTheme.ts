import { ref, onMounted } from "vue";

export type Theme = "dark" | "light";

const THEME_KEY = "horse-racing-theme";

const theme = ref<Theme>("dark");

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme.value === "dark" ? "light" : "dark");
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  };

  onMounted(() => {
    initTheme();
  });

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  };
}

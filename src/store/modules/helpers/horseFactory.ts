import {
  HORSE_COUNT,
  HORSE_NAMES,
  HORSE_CONDITION_MIN,
  HORSE_CONDITION_MAX,
  COLORS,
  RACE_LAP_HORSE_COUNT,
} from "../../../utils/constants";
import type { Horse, HorseId } from "../../../types/horse";

export function createRandomHorses(): Horse[] {
  const horses: Horse[] = [];
  const usedNames = new Set<string>();
  const usedColorHexes = new Set<string>();

  while (horses.length < HORSE_COUNT) {
    const name =
      HORSE_NAMES[Math.floor(Math.random() * HORSE_NAMES.length)] ?? "";
    const color = COLORS[Math.floor(Math.random() * COLORS.length)] ?? {
      name: "",
      hex: "",
    };

    if (usedNames.has(name) || usedColorHexes.has(color.hex)) continue;

    usedNames.add(name);
    usedColorHexes.add(color.hex);

    const condition =
      Math.floor(
        Math.random() * (HORSE_CONDITION_MAX - HORSE_CONDITION_MIN + 1)
      ) + HORSE_CONDITION_MIN;

    horses.push({ id: crypto.randomUUID() as HorseId, name, color, condition });
  }

  return horses;
}

export function getRandomHorses(
  horses: Horse[],
  count: number = RACE_LAP_HORSE_COUNT
): Horse[] {
  const shuffled = [...horses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

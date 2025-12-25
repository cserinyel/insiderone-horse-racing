import type { Module } from "vuex";
import {
  HORSE_COUNT,
  HORSE_NAMES,
  HORSE_CONDITION_MIN,
  HORSE_CONDITION_MAX,
  COLORS,
  RACE_LAP_ITEMS,
  RACE_LAP_HORSE_COUNT,
} from "../../utils/constants";
import type { Horse, HorseColor } from "../../types/horse";
import type { RaceScheduleItem } from "../../types/race";

interface RaceState {
  horses: Horse[];
  raceSchedule: RaceScheduleItem[];
  currentLapId?: string;
}

function createRandomHorses(): Horse[] {
  const horses: Horse[] = [];
  const usedNames = new Set<string>();
  const usedColors = new Set<HorseColor>();

  while (horses.length < HORSE_COUNT) {
    const id = crypto.randomUUID();
    let name: string;
    let color: HorseColor;
    do {
      name = HORSE_NAMES[Math.floor(Math.random() * HORSE_NAMES.length)] ?? "";
      color = COLORS[Math.floor(Math.random() * COLORS.length)] ?? {
        name: "",
        hex: "",
      };
    } while (usedNames.has(name) || usedColors.has(color));

    usedNames.add(name);
    usedColors.add(color);

    const condition =
      Math.floor(
        Math.random() * (HORSE_CONDITION_MAX - HORSE_CONDITION_MIN + 1)
      ) + HORSE_CONDITION_MIN;
    horses.push({ id, name, color, condition });
  }

  return horses;
}
function getRandomHorses(
  horses: Horse[],
  numberOfHorses: number = RACE_LAP_HORSE_COUNT
): Record<number, Horse> {
  const shuffled = [...horses]
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfHorses);
  return shuffled.reduce(
    (acc, horse, index) => ({ ...acc, [index]: horse }),
    {} as Record<number, Horse>
  );
}

const raceStore: Module<RaceState, any> = {
  namespaced: true,

  state: {
    horses: createRandomHorses(),
    raceSchedule: [],
    currentLapId: undefined,
  },

  mutations: {
    SET_RACE_SCHEDULE(state, raceSchedule: RaceScheduleItem[]) {
      if (!raceSchedule || raceSchedule.length === 0) return;
      state.raceSchedule = raceSchedule;
      state.currentLapId = raceSchedule[0]!.id;
    },
  },

  actions: {
    generateRandomRaceSchedule({ commit, state }) {
      const raceSchedule: RaceScheduleItem[] = [];
      for (const lapItem of Object.values(RACE_LAP_ITEMS)) {
        raceSchedule.push({
          ...lapItem,
          id: crypto.randomUUID(),
          horses: getRandomHorses(state.horses),
        });
      }
      console.log(raceSchedule);
      commit("SET_RACE_SCHEDULE", raceSchedule);
    },
  },

  getters: {
    horses: (state) => state.horses,
    horseCount: (state) => state.horses.length,
    raceSchedule: (state) => state.raceSchedule,
    isRaceScheduleGenerated: (state) => state.raceSchedule.length > 0,
    getCurrentLap: (state) =>
      state.raceSchedule.find((lap) => lap.id === state.currentLapId),
  },
};

export default raceStore;

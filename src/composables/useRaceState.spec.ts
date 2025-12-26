import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { createStore, Store } from "vuex";
import { useRaceState } from "./useRaceState";
import { RACE_STATE } from "../types/race";
import type { Horse, HorseId } from "../types/horse";

function withSetup<T>(composable: () => T, store: Store<any>): T {
  let result: T;

  const TestComponent = defineComponent({
    setup() {
      result = composable();
      return () => h("div");
    },
  });

  mount(TestComponent, {
    global: { plugins: [store] },
  });

  return result!;
}

// Mock data
const mockHorses: Horse[] = [
  {
    id: "horse-1" as HorseId,
    name: "Thunder",
    color: { name: "Red", hex: "#FF0000" },
    condition: 80,
  },
  {
    id: "horse-2" as HorseId,
    name: "Lightning",
    color: { name: "Blue", hex: "#0000FF" },
    condition: 90,
  },
];

const mockSchedule = [
  {
    id: "lap-1",
    lapNumber: 1,
    lapDistance: 1200,
    lapName: "First Lap",
    horses: mockHorses,
  },
];

const mockPositions = { "horse-1": 50, "horse-2": 60 };

const mockLapResults = [
  [
    { position: 1, horse: mockHorses[1], finishTime: 10.5 },
    { position: 2, horse: mockHorses[0], finishTime: 11.2 },
  ],
];

// Create mock store with configurable state
function createMockStore(overrides = {}) {
  const defaultState = {
    horses: mockHorses,
    raceSchedule: mockSchedule,
    raceState: RACE_STATE.IDLE,
    currentLapIndex: 0,
    horsePositions: mockPositions,
    countdownValue: 3,
    lapResults: mockLapResults,
    ...overrides,
  };

  const store = createStore({
    modules: {
      raceStore: {
        namespaced: true,
        state: defaultState,
        getters: {
          horses: (state) => state.horses,
          raceSchedule: (state) => state.raceSchedule,
          isRaceScheduleGenerated: (state) => state.raceSchedule.length > 0,
          getCurrentLap: (state) => state.raceSchedule[state.currentLapIndex],
          raceState: (state) => state.raceState,
          countdownValue: (state) => state.countdownValue,
          horsePositions: (state) => state.horsePositions,
          lapResults: (state) => state.lapResults,
        },
        actions: {
          generateRandomRaceSchedule: vi.fn(),
          startRace: vi.fn(),
          pauseRace: vi.fn(),
          resumeRace: vi.fn(),
          updateRacePositions: vi.fn(),
          hardResetRace: vi.fn(),
        },
      },
    },
  });

  vi.spyOn(store, "dispatch");

  return store;
}

describe("useRaceState", () => {
  describe("computed getters", () => {
    it("returns horses from store", () => {
      const store = createMockStore();
      const { horses } = withSetup(useRaceState, store);

      expect(horses.value).toEqual(mockHorses);
      expect(horses.value).toHaveLength(2);
    });

    it("returns raceSchedule from store", () => {
      const store = createMockStore();
      const { raceSchedule } = withSetup(useRaceState, store);

      expect(raceSchedule.value).toEqual(mockSchedule);
    });

    it("returns isRaceScheduleGenerated as true when schedule exists", () => {
      const store = createMockStore();
      const { isRaceScheduleGenerated } = withSetup(useRaceState, store);

      expect(isRaceScheduleGenerated.value).toBe(true);
    });

    it("returns isRaceScheduleGenerated as false when no schedule", () => {
      const store = createMockStore({ raceSchedule: [] });
      const { isRaceScheduleGenerated } = withSetup(useRaceState, store);

      expect(isRaceScheduleGenerated.value).toBe(false);
    });

    it("returns currentLap from store", () => {
      const store = createMockStore();
      const { currentLap } = withSetup(useRaceState, store);

      expect(currentLap.value).toEqual(mockSchedule[0]);
    });

    it("returns undefined currentLap when index is out of bounds", () => {
      const store = createMockStore({ currentLapIndex: 99 });
      const { currentLap } = withSetup(useRaceState, store);

      expect(currentLap.value).toBeUndefined();
    });

    it("returns raceState from store", () => {
      const store = createMockStore({ raceState: RACE_STATE.RUNNING });
      const { raceState } = withSetup(useRaceState, store);

      expect(raceState.value).toBe(RACE_STATE.RUNNING);
    });

    it("returns countdownValue from store", () => {
      const store = createMockStore({ countdownValue: 2 });
      const { countdownValue } = withSetup(useRaceState, store);

      expect(countdownValue.value).toBe(2);
    });

    it("returns horsePositions from store", () => {
      const store = createMockStore();
      const { horsePositions } = withSetup(useRaceState, store);

      expect(horsePositions.value).toEqual(mockPositions);
    });

    it("returns lapResults from store", () => {
      const store = createMockStore();
      const { lapResults } = withSetup(useRaceState, store);

      expect(lapResults.value).toEqual(mockLapResults);
    });
  });

  describe("action dispatchers", () => {
    it("generateSchedule dispatches generateRandomRaceSchedule", () => {
      const store = createMockStore();
      const { generateSchedule } = withSetup(useRaceState, store);

      generateSchedule();

      expect(store.dispatch).toHaveBeenCalledWith(
        "raceStore/generateRandomRaceSchedule"
      );
    });

    it("startRace dispatches startRace", () => {
      const store = createMockStore();
      const { startRace } = withSetup(useRaceState, store);

      startRace();

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/startRace");
    });

    it("pauseRace dispatches pauseRace", () => {
      const store = createMockStore();
      const { pauseRace } = withSetup(useRaceState, store);

      pauseRace();

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/pauseRace");
    });

    it("resumeRace dispatches resumeRace", () => {
      const store = createMockStore();
      const { resumeRace } = withSetup(useRaceState, store);

      resumeRace();

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/resumeRace");
    });

    it("updatePositions dispatches updateRacePositions", () => {
      const store = createMockStore();
      const { updatePositions } = withSetup(useRaceState, store);

      updatePositions();

      expect(store.dispatch).toHaveBeenCalledWith(
        "raceStore/updateRacePositions"
      );
    });

    it("hardResetRace dispatches hardResetRace", () => {
      const store = createMockStore();
      const { hardResetRace } = withSetup(useRaceState, store);

      hardResetRace();

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/hardResetRace");
    });
  });

  describe("reactivity", () => {
    it("computed values are reactive refs", () => {
      const store = createMockStore();
      const result = withSetup(useRaceState, store);

      // All getters should return ComputedRefs (have .value)
      expect(result.horses).toHaveProperty("value");
      expect(result.raceSchedule).toHaveProperty("value");
      expect(result.isRaceScheduleGenerated).toHaveProperty("value");
      expect(result.currentLap).toHaveProperty("value");
      expect(result.raceState).toHaveProperty("value");
      expect(result.countdownValue).toHaveProperty("value");
      expect(result.horsePositions).toHaveProperty("value");
      expect(result.lapResults).toHaveProperty("value");
    });

    it("action dispatchers are functions", () => {
      const store = createMockStore();
      const result = withSetup(useRaceState, store);

      expect(typeof result.generateSchedule).toBe("function");
      expect(typeof result.startRace).toBe("function");
      expect(typeof result.pauseRace).toBe("function");
      expect(typeof result.resumeRace).toBe("function");
      expect(typeof result.updatePositions).toBe("function");
      expect(typeof result.hardResetRace).toBe("function");
    });
  });
});

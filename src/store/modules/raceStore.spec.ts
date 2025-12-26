// src/store/modules/raceStore.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore, Store } from "vuex";
import { RACE_STATE } from "../../types/race";
import type { Horse } from "../../types/horse";
import { HORSE_COUNT, RACE_LAP_HORSE_COUNT } from "../../utils/constants";

// Mock the helpers to avoid side effects
vi.mock("../helpers/countdown", () => ({
  clearCountdownInterval: vi.fn(),
  runCountdownInterval: vi.fn(),
}));

// Import after mocking
import raceStore from "./raceStore";
import { createRandomHorses } from "../helpers/horseFactory";

// Helper to create a fresh store for each test with isolated state
function createTestStore() {
  return createStore({
    modules: {
      raceStore: {
        ...raceStore,
        // Create fresh state for each test
        state: () => ({
          horses: createRandomHorses(),
          raceSchedule: [],
          raceState: RACE_STATE.IDLE,
          currentLapIndex: -1,
          horsePositions: {},
          finishTimes: {},
          countdownValue: 0,
          raceStartTime: 0,
          lapResults: [],
          isFinishingLap: false,
        }),
      },
    },
  });
}

describe("raceStore", () => {
  let store: Store<any>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
  });

  describe("initial state", () => {
    it("has 20 horses on initialization", () => {
      expect(store.getters["raceStore/horses"]).toHaveLength(HORSE_COUNT);
    });

    it("starts with idle race state", () => {
      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.IDLE);
    });

    it("starts with empty race schedule", () => {
      expect(store.getters["raceStore/raceSchedule"]).toEqual([]);
      expect(store.getters["raceStore/isRaceScheduleGenerated"]).toBe(false);
    });

    it("starts with lap index -1", () => {
      expect(store.getters["raceStore/currentLapIndex"]).toBe(-1);
    });
  });

  describe("mutations", () => {
    it("SET_RACE_STATE updates race state", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.RUNNING);
      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.RUNNING);
    });

    it("SET_RACE_SCHEDULE ignores empty array", () => {
      store.commit("raceStore/SET_RACE_SCHEDULE", []);
      expect(store.getters["raceStore/raceSchedule"]).toEqual([]);
    });

    it("SET_RACE_SCHEDULE sets valid schedule", () => {
      const schedule = [
        { id: "1", lapNumber: 1, lapDistance: 1200, lapName: "Lap 1", horses: [] },
      ];
      store.commit("raceStore/SET_RACE_SCHEDULE", schedule);
      expect(store.getters["raceStore/raceSchedule"]).toEqual(schedule);
    });

    it("SET_CURRENT_LAP_INDEX updates lap index", () => {
      store.commit("raceStore/SET_CURRENT_LAP_INDEX", 2);
      expect(store.getters["raceStore/currentLapIndex"]).toBe(2);
    });

    it("SET_COUNTDOWN_VALUE updates countdown", () => {
      store.commit("raceStore/SET_COUNTDOWN_VALUE", 3);
      expect(store.getters["raceStore/countdownValue"]).toBe(3);
    });

    it("UPDATE_ALL_POSITIONS updates horse positions", () => {
      const positions = { "horse-1": 50, "horse-2": 75 };
      store.commit("raceStore/UPDATE_ALL_POSITIONS", positions);
      expect(store.getters["raceStore/horsePositions"]).toEqual(positions);
    });

    it("ADD_LAP_RESULT appends results", () => {
      const result1 = [{ position: 1, horse: {} as Horse, finishTime: 10 }];
      const result2 = [{ position: 1, horse: {} as Horse, finishTime: 11 }];

      store.commit("raceStore/ADD_LAP_RESULT", result1);
      store.commit("raceStore/ADD_LAP_RESULT", result2);

      expect(store.getters["raceStore/lapResults"]).toHaveLength(2);
    });

    it("RESET_RACE_STATE resets to initial values", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.RUNNING);
      store.commit("raceStore/SET_CURRENT_LAP_INDEX", 3);
      store.commit("raceStore/SET_COUNTDOWN_VALUE", 2);

      store.commit("raceStore/RESET_RACE_STATE");

      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.IDLE);
      expect(store.getters["raceStore/currentLapIndex"]).toBe(-1);
      expect(store.getters["raceStore/countdownValue"]).toBe(0);
      expect(store.getters["raceStore/lapResults"]).toEqual([]);
    });
  });

  describe("actions", () => {
    it("generateRandomRaceSchedule creates 6 laps", async () => {
      await store.dispatch("raceStore/generateRandomRaceSchedule");

      const schedule = store.getters["raceStore/raceSchedule"];
      expect(schedule).toHaveLength(6);
      expect(store.getters["raceStore/isRaceScheduleGenerated"]).toBe(true);
    });

    it("generateRandomRaceSchedule sets lap index to 0", async () => {
      await store.dispatch("raceStore/generateRandomRaceSchedule");
      expect(store.getters["raceStore/currentLapIndex"]).toBe(0);
    });

    it("each lap has 10 horses", async () => {
      await store.dispatch("raceStore/generateRandomRaceSchedule");

      const schedule = store.getters["raceStore/raceSchedule"];
      schedule.forEach((lap: any) => {
        expect(lap.horses).toHaveLength(RACE_LAP_HORSE_COUNT);
      });
    });

    it("startRace does nothing if no schedule", async () => {
      await store.dispatch("raceStore/startRace");
      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.IDLE);
    });

    it("pauseRace sets state to PAUSED when running", async () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.RUNNING);
      await store.dispatch("raceStore/pauseRace");
      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.PAUSED);
    });

    it("pauseRace does nothing when idle", async () => {
      await store.dispatch("raceStore/pauseRace");
      expect(store.getters["raceStore/raceState"]).toBe(RACE_STATE.IDLE);
    });

    it("hardResetRace generates new horses", async () => {
      const originalHorses = store.getters["raceStore/horses"];
      const originalIds = originalHorses.map((h: Horse) => h.id);

      await store.dispatch("raceStore/hardResetRace");

      const newHorses = store.getters["raceStore/horses"];
      const newIds = newHorses.map((h: Horse) => h.id);

      // New horses should have different IDs
      expect(newIds).not.toEqual(originalIds);
    });

    it("hardResetRace clears schedule", async () => {
      await store.dispatch("raceStore/generateRandomRaceSchedule");
      expect(store.getters["raceStore/isRaceScheduleGenerated"]).toBe(true);

      await store.dispatch("raceStore/hardResetRace");
      expect(store.getters["raceStore/isRaceScheduleGenerated"]).toBe(false);
    });
  });

  describe("getters", () => {
    it("horseCount returns number of horses", () => {
      expect(store.getters["raceStore/horseCount"]).toBe(HORSE_COUNT);
    });

    it("getCurrentLap returns correct lap", async () => {
      await store.dispatch("raceStore/generateRandomRaceSchedule");

      const currentLap = store.getters["raceStore/getCurrentLap"];
      expect(currentLap.lapNumber).toBe(1);
    });

    it("isRaceRunning returns true for RUNNING state", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.RUNNING);
      expect(store.getters["raceStore/isRaceRunning"]).toBe(true);
    });

    it("isRaceRunning returns true for COUNTDOWN state", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.COUNTDOWN);
      expect(store.getters["raceStore/isRaceRunning"]).toBe(true);
    });

    it("isRaceRunning returns true for PAUSED state", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.PAUSED);
      expect(store.getters["raceStore/isRaceRunning"]).toBe(true);
    });

    it("isRaceRunning returns false for IDLE state", () => {
      expect(store.getters["raceStore/isRaceRunning"]).toBe(false);
    });

    it("isRaceRunning returns false for FINISHED state", () => {
      store.commit("raceStore/SET_RACE_STATE", RACE_STATE.FINISHED);
      expect(store.getters["raceStore/isRaceRunning"]).toBe(false);
    });
  });
});


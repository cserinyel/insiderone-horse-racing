// src/components/racing/controls/StartRaceButton.spec.ts
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import StartRaceButton from "./StartRaceButton.vue";
import { RACE_STATE } from "../../../../types/race";

// Helper to create a mock store with given state
function createMockStore(overrides = {}) {
  const store = createStore({
    modules: {
      raceStore: {
        namespaced: true,
        state: {
          raceState: RACE_STATE.IDLE,
          raceSchedule: [],
          ...overrides,
        },
        getters: {
          raceState: (state) => state.raceState,
          isRaceScheduleGenerated: (state) => state.raceSchedule.length > 0,
        },
        actions: {
          startRace: vi.fn(),
          pauseRace: vi.fn(),
          resumeRace: vi.fn(),
        },
      },
    },
  });

  // Spy on dispatch so we can assert on it
  vi.spyOn(store, "dispatch");

  return store;
}

describe("StartRaceButton", () => {
  describe("button label", () => {
    it('shows "Start Races" when idle', () => {
      const store = createMockStore({ raceState: RACE_STATE.IDLE });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.text()).toBe("Start Races");
    });

    it('shows "Pause Race" when running', () => {
      const store = createMockStore({
        raceState: RACE_STATE.RUNNING,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.text()).toBe("Pause Race");
    });

    it('shows "Pause Race" during countdown', () => {
      const store = createMockStore({
        raceState: RACE_STATE.COUNTDOWN,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.text()).toBe("Pause Race");
    });

    it('shows "Resume Race" when paused', () => {
      const store = createMockStore({
        raceState: RACE_STATE.PAUSED,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.text()).toBe("Resume Race");
    });
  });

  describe("disabled state", () => {
    it("is disabled when no schedule is generated", () => {
      const store = createMockStore({
        raceState: RACE_STATE.IDLE,
        raceSchedule: [],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("is disabled when race is finished", () => {
      const store = createMockStore({
        raceState: RACE_STATE.FINISHED,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("is enabled when schedule exists and race is idle", () => {
      const store = createMockStore({
        raceState: RACE_STATE.IDLE,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
    });

    it("is enabled when race is running (can pause)", () => {
      const store = createMockStore({
        raceState: RACE_STATE.RUNNING,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
    });

    it("is enabled when race is paused (can resume)", () => {
      const store = createMockStore({
        raceState: RACE_STATE.PAUSED,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
    });
  });

  describe("click actions", () => {
    it("dispatches startRace when clicked in idle state", async () => {
      const store = createMockStore({
        raceState: RACE_STATE.IDLE,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      await wrapper.find("button").trigger("click");

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/startRace");
    });

    it("dispatches pauseRace when clicked while running", async () => {
      const store = createMockStore({
        raceState: RACE_STATE.RUNNING,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      await wrapper.find("button").trigger("click");

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/pauseRace");
    });

    it("dispatches resumeRace when clicked while paused", async () => {
      const store = createMockStore({
        raceState: RACE_STATE.PAUSED,
        raceSchedule: [{ id: "1" }],
      });
      const wrapper = mount(StartRaceButton, {
        global: { plugins: [store] },
      });

      await wrapper.find("button").trigger("click");

      expect(store.dispatch).toHaveBeenCalledWith("raceStore/resumeRace");
    });
  });
});

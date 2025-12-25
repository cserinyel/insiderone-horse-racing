import type { Module } from "vuex";
import {
  RACE_LAP_ITEMS,
  UPDATE_INTERVAL_MS,
  COUNTDOWN_DURATION,
  LAP_TRANSITION_DELAY_MS,
  NEXT_LAP_DELAY_MS,
  FINISH_LINE_POSITION,
  INITIAL_POSITION,
} from "../../utils/constants";
import type { Horse, HorseId } from "../../types/horse";
import {
  type RaceScheduleItem,
  type RaceState as RaceStateType,
  type RaceResult,
  RACE_STATE,
  type UpdatePositionPayload,
  type SetFinishTimePayload,
} from "../../types/race";
import { createRandomHorses, getRandomHorses } from "./helpers/horseFactory";
import { calculateHorseSpeed } from "./helpers/racePhases";
import {
  clearCountdownInterval,
  runCountdownInterval,
} from "./helpers/countdown";

interface RaceState {
  horses: Horse[];
  raceSchedule: RaceScheduleItem[];
  raceState: RaceStateType;
  currentLapIndex: number;
  horsePositions: Record<HorseId, number>;
  finishTimes: Record<HorseId, number>;
  countdownValue: number;
  raceStartTime: number;
  lapResults: RaceResult[][];
  isFinishingLap: boolean;
}

interface RootState {}

const raceStore: Module<RaceState, RootState> = {
  namespaced: true,

  state: {
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
  },

  mutations: {
    SET_RACE_SCHEDULE(state, raceSchedule: RaceScheduleItem[]) {
      if (!raceSchedule || raceSchedule.length === 0) return;
      state.raceSchedule = raceSchedule;
    },
    SET_RACE_STATE(state, raceState: RaceStateType) {
      state.raceState = raceState;
    },
    SET_CURRENT_LAP_INDEX(state, index: number) {
      state.currentLapIndex = index;
    },
    UPDATE_HORSE_POSITION(state, { horseId, position }: UpdatePositionPayload) {
      state.horsePositions[horseId] = position;
    },
    SET_FINISH_TIME(state, { horseId, finishTime }: SetFinishTimePayload) {
      state.finishTimes[horseId] = finishTime;
    },
    SET_COUNTDOWN_VALUE(state, value: number) {
      state.countdownValue = value;
    },
    SET_RACE_START_TIME(state, timestamp: number) {
      state.raceStartTime = timestamp;
    },
    ADD_LAP_RESULT(state, results: RaceResult[]) {
      state.lapResults.push(results);
    },
    CLEAR_FINISH_TIMES(state) {
      state.finishTimes = {};
    },
    RESET_RACE_STATE(state) {
      clearCountdownInterval();
      state.raceState = RACE_STATE.IDLE;
      state.currentLapIndex = -1;
      state.horsePositions = {};
      state.finishTimes = {};
      state.countdownValue = 0;
      state.raceStartTime = 0;
      state.lapResults = [];
      state.isFinishingLap = false;
    },
    SET_IS_FINISHING_LAP(state, value: boolean) {
      state.isFinishingLap = value;
    },
  },

  actions: {
    generateRandomRaceSchedule({ commit, state }) {
      try {
        commit("RESET_RACE_STATE");

        const raceSchedule: RaceScheduleItem[] = Object.values(
          RACE_LAP_ITEMS
        ).map((lapItem) => ({
          ...lapItem,
          id: crypto.randomUUID(),
          horses: getRandomHorses(state.horses),
        }));

        if (raceSchedule.length === 0) {
          throw new Error("Failed to generate race schedule");
        }

        commit("SET_RACE_SCHEDULE", raceSchedule);
        commit("SET_CURRENT_LAP_INDEX", 0);
      } catch (error) {
        console.error("Error generating race schedule:", error);
        commit("RESET_RACE_STATE");
      }
    },

    startRace({ commit, dispatch, state }) {
      try {
        if (state.raceSchedule.length === 0) return;
        if (state.raceState === RACE_STATE.PAUSED) {
          dispatch("resumeRace");
          return;
        }
        commit("RESET_RACE_STATE");
        commit("SET_CURRENT_LAP_INDEX", 0);
        dispatch("startLapCountdown");
      } catch (error) {
        console.error("Error starting race:", error);
        clearCountdownInterval();
        commit("SET_RACE_STATE", RACE_STATE.IDLE);
      }
    },

    pauseRace({ commit, state }) {
      try {
        if (
          state.raceState === RACE_STATE.RUNNING ||
          state.raceState === RACE_STATE.COUNTDOWN
        ) {
          clearCountdownInterval();
          commit("SET_RACE_STATE", RACE_STATE.PAUSED);
        }
      } catch (error) {
        console.error("Error pausing race:", error);
        clearCountdownInterval();
      }
    },

    resumeRace({ commit, dispatch, state }) {
      try {
        if (state.raceState !== RACE_STATE.PAUSED) return;

        const wasInCountdown =
          state.countdownValue > 0 &&
          state.countdownValue <= COUNTDOWN_DURATION;

        if (wasInCountdown) {
          commit("SET_RACE_STATE", RACE_STATE.COUNTDOWN);
          runCountdownInterval(commit, dispatch, () => state.countdownValue);
        } else {
          commit("SET_RACE_STATE", RACE_STATE.RUNNING);
          dispatch("updateRacePositions");
        }
      } catch (error) {
        console.error("Error resuming race:", error);
        clearCountdownInterval();
        commit("SET_RACE_STATE", RACE_STATE.PAUSED);
      }
    },

    startLapCountdown({ commit, dispatch, state }) {
      try {
        const currentLap = state.raceSchedule[state.currentLapIndex];
        if (!currentLap) {
          throw new Error(`Invalid lap index: ${state.currentLapIndex}`);
        }

        commit("SET_RACE_STATE", RACE_STATE.COUNTDOWN);
        commit("SET_COUNTDOWN_VALUE", COUNTDOWN_DURATION);
        commit("CLEAR_FINISH_TIMES");

        currentLap.horses.forEach((horse) => {
          commit("UPDATE_HORSE_POSITION", { horseId: horse.id, position: 0 });
        });

        runCountdownInterval(commit, dispatch, () => state.countdownValue);
      } catch (error) {
        console.error("Error starting lap countdown:", error);
        clearCountdownInterval();
        commit("SET_RACE_STATE", RACE_STATE.IDLE);
      }
    },

    startLap({ commit, state }) {
      try {
        const currentLap = state.raceSchedule[state.currentLapIndex];
        if (!currentLap) {
          throw new Error(`Invalid lap index: ${state.currentLapIndex}`);
        }

        commit("SET_RACE_STATE", RACE_STATE.RUNNING);
        commit("SET_RACE_START_TIME", Date.now());
        commit("SET_COUNTDOWN_VALUE", 0);
        commit("CLEAR_FINISH_TIMES");
        commit("SET_IS_FINISHING_LAP", false);

        currentLap.horses.forEach((horse) => {
          commit("UPDATE_HORSE_POSITION", { horseId: horse.id, position: 0 });
        });
      } catch (error) {
        console.error("Error starting lap:", error);
        clearCountdownInterval();
        commit("SET_RACE_STATE", RACE_STATE.IDLE);
      }
    },

    updateRacePositions({ commit, dispatch, state }) {
      try {
        if (state.raceState !== RACE_STATE.RUNNING) return;

        const currentLap = state.raceSchedule[state.currentLapIndex];
        if (!currentLap) return;

        const horses = currentLap.horses;
        const elapsedSeconds = (Date.now() - state.raceStartTime) / 1000;
        const timeDelta = UPDATE_INTERVAL_MS / 1000;

        horses.forEach((horse) => {
          if (state.finishTimes[horse.id]) return;

          const currentPosition =
            state.horsePositions[horse.id] || INITIAL_POSITION;
          const speed = calculateHorseSpeed(
            horse,
            currentPosition,
            currentLap.lapDistance
          );

          const newPosition = Math.min(
            FINISH_LINE_POSITION,
            currentPosition + speed * timeDelta
          );
          commit("UPDATE_HORSE_POSITION", {
            horseId: horse.id,
            position: newPosition,
          });

          if (newPosition >= FINISH_LINE_POSITION) {
            commit("SET_FINISH_TIME", {
              horseId: horse.id,
              finishTime: elapsedSeconds,
            });
          }
        });

        const allFinished = horses.every(
          (horse) => state.finishTimes[horse.id]
        );
        if (allFinished && !state.isFinishingLap) {
          commit("SET_IS_FINISHING_LAP", true);
          setTimeout(() => dispatch("finishLap"), LAP_TRANSITION_DELAY_MS);
        }
      } catch (error) {
        console.error("Error updating race positions:", error);
      }
    },

    finishLap({ commit, dispatch, state }) {
      try {
        const currentLap = state.raceSchedule[state.currentLapIndex];
        if (!currentLap) {
          throw new Error(`Invalid lap index: ${state.currentLapIndex}`);
        }

        const results: RaceResult[] = currentLap.horses
          .map((horse) => ({
            horse,
            finishTime: state.finishTimes[horse.id] || 0,
            position: 0,
          }))
          .sort((a, b) => a.finishTime - b.finishTime)
          .map((result, index) => ({ ...result, position: index + 1 }));

        commit("ADD_LAP_RESULT", results);

        const nextLapIndex = state.currentLapIndex + 1;
        if (nextLapIndex < state.raceSchedule.length) {
          setTimeout(() => {
            commit("SET_CURRENT_LAP_INDEX", nextLapIndex);
            dispatch("startLapCountdown");
          }, NEXT_LAP_DELAY_MS);
        } else {
          commit("SET_RACE_STATE", RACE_STATE.FINISHED);
        }
      } catch (error) {
        console.error("Error finishing lap:", error);
        clearCountdownInterval();
        commit("SET_RACE_STATE", RACE_STATE.FINISHED);
      }
    },
  },

  getters: {
    horses: (state) => state.horses,
    horseCount: (state) => state.horses.length,
    raceSchedule: (state) => state.raceSchedule,
    isRaceScheduleGenerated: (state) => state.raceSchedule.length > 0,
    getCurrentLap: (state) => state.raceSchedule[state.currentLapIndex],
    raceState: (state) => state.raceState,
    currentLapIndex: (state) => state.currentLapIndex,
    countdownValue: (state) => state.countdownValue,
    horsePositions: (state) => state.horsePositions,
    isRaceRunning: (state) =>
      state.raceState === RACE_STATE.RUNNING ||
      state.raceState === RACE_STATE.COUNTDOWN ||
      state.raceState === RACE_STATE.PAUSED,
    lapResults: (state) => state.lapResults,
  },
};

export default raceStore;

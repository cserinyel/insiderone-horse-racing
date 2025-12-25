import type { Store } from "vuex";
import type { Horse, HorseId } from "../types/horse";
import type { RaceState, RaceScheduleItem, RaceResult } from "../types/race";

// State types
export interface RaceStoreState {
  horses: Horse[];
  raceSchedule: RaceScheduleItem[];
  raceState: RaceState;
  currentLapIndex: number;
  horsePositions: Record<HorseId, number>;
  finishTimes: Record<HorseId, number>;
  countdownValue: number;
  raceStartTime: number;
  lapResults: RaceResult[][];
  isFinishingLap: boolean;
}

export interface RootState {
  raceStore: RaceStoreState;
}

// Getter return types
export interface Getters {
  "raceStore/horses": Horse[];
  "raceStore/horseCount": number;
  "raceStore/raceSchedule": RaceScheduleItem[];
  "raceStore/isRaceScheduleGenerated": boolean;
  "raceStore/getCurrentLap": RaceScheduleItem | undefined;
  "raceStore/raceState": RaceState;
  "raceStore/currentLapIndex": number;
  "raceStore/countdownValue": number;
  "raceStore/horsePositions": Record<HorseId, number>;
  "raceStore/isRaceRunning": boolean;
  "raceStore/lapResults": RaceResult[][];
}

// Action types
export interface Actions {
  "raceStore/generateRandomRaceSchedule": void;
  "raceStore/startRace": void;
  "raceStore/pauseRace": void;
  "raceStore/resumeRace": void;
  "raceStore/startLapCountdown": void;
  "raceStore/startLap": void;
  "raceStore/updateRacePositions": void;
  "raceStore/finishLap": void;
  "raceStore/hardResetRace": void;
}

// Typed store interface
export interface TypedStore
  extends Omit<Store<RootState>, "getters" | "dispatch"> {
  getters: Getters;
  dispatch<K extends keyof Actions>(action: K): Promise<Actions[K]>;
}

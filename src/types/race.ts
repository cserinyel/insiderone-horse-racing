import type { Horse, HorseId } from "./horse";

export interface RaceLapItem {
  lapNumber: number;
  lapDistance: number;
  lapName: string;
}

export interface RaceScheduleItem extends RaceLapItem {
  id: string;
  horses: Horse[];
}

export interface RaceResult {
  position: number;
  horse: Horse;
  finishTime: number; // in seconds
}

export const RACE_STATE = {
  IDLE: "idle",
  COUNTDOWN: "countdown",
  RUNNING: "running",
  PAUSED: "paused",
  FINISHED: "finished",
} as const;

export type RaceState = (typeof RACE_STATE)[keyof typeof RACE_STATE];

export interface ResultWithLapInfo {
  lapInfo: RaceScheduleItem | undefined;
  results: RaceResult[];
}
export interface UpdatePositionPayload {
  horseId: HorseId;
  position: number;
}
export interface SetFinishTimePayload {
  horseId: HorseId;
  finishTime: number;
}

import type { Horse } from "./horse";

export interface RaceLapItem {
  lapNumber: number;
  lapDistance: number;
  lapName: string;
}

export interface RaceScheduleItem extends RaceLapItem {
  id: string;
  horses: Record<number, Horse>;
  lapNumber: number;
  lapDistance: number;
  lapName: string;
}

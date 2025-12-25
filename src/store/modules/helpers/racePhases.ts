import {
  RACE_PHASES,
  SPEED_MULTIPLIER,
  VARIATION_RANGE,
  BASE_DISTANCE,
} from "../../../utils/constants";
import type { Horse } from "../../../types/horse";

export function getPhaseBonus(position: number): number {
  if (position < RACE_PHASES.START.maxPosition)
    return RACE_PHASES.START.speedBonus;
  if (position < RACE_PHASES.CRUISE.maxPosition)
    return RACE_PHASES.CRUISE.speedBonus;
  return RACE_PHASES.SPRINT.speedBonus;
}

export function calculateHorseSpeed(
  horse: Horse,
  currentPosition: number,
  lapDistance: number
): number {
  const phaseBonus = getPhaseBonus(currentPosition);
  const baseSpeed = horse.condition * SPEED_MULTIPLIER;
  const randomVariation = (Math.random() - 0.5) * VARIATION_RANGE * 2;
  const distanceFactor = lapDistance / BASE_DISTANCE;
  return (baseSpeed * (1 + phaseBonus) + randomVariation) / distanceFactor;
}


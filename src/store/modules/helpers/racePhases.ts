import {
  RACE_PHASES,
  SPEED_MULTIPLIER,
  VARIATION_RANGE,
  BASE_DISTANCE,
  CONDITION_PUSH_THRESHOLD,
  CONDITION_PUSH_FLOOR,
} from "../../../utils/constants";
import type { Horse } from "../../../types/horse";

export function getPhaseBonus(position: number): number {
  if (position < RACE_PHASES.START.maxPosition)
    return RACE_PHASES.START.speedBonus;
  if (position < RACE_PHASES.CRUISE.maxPosition)
    return RACE_PHASES.CRUISE.speedBonus;
  return RACE_PHASES.SPRINT.speedBonus;
}

/**
 * Get the effective condition for speed calculation.
 * For horses below CONDITION_PUSH_THRESHOLD, scales their condition
 * to a range between CONDITION_PUSH_FLOOR and (THRESHOLD - 1).
 * This ensures they finish faster while preserving relative order
 * and never beating horses above the threshold.
 */
export function getEffectiveCondition(condition: number): number {
  if (condition >= CONDITION_PUSH_THRESHOLD) {
    return condition;
  }

  const maxCondition = CONDITION_PUSH_THRESHOLD - 1;
  const newRange = maxCondition - CONDITION_PUSH_FLOOR;

  return CONDITION_PUSH_FLOOR + (condition / maxCondition) * newRange;
}

export function calculateHorseSpeed(
  horse: Horse,
  currentPosition: number,
  lapDistance: number
): number {
  const phaseBonus = getPhaseBonus(currentPosition);

  // Use effective condition for speed calculation
  const effectiveCondition = getEffectiveCondition(horse.condition);
  const baseSpeed = effectiveCondition * SPEED_MULTIPLIER;

  const randomVariation = (Math.random() - 0.5) * VARIATION_RANGE * 2;
  const distanceFactor = lapDistance / BASE_DISTANCE;

  return (baseSpeed * (1 + phaseBonus) + randomVariation) / distanceFactor;
}

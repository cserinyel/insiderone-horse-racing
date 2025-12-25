import type { RaceLapItem } from "../types/race";

export const HORSE_COUNT = 20;
export const HORSE_NAMES = [
  "Sea Biscuit Jr.",
  "Midnight Comet",
  "Proud Pilot",
  "Star of the Show",
  "Whispering Willow",
  "Silver Canyon",
  "Desert Lullaby",
  "Thunder Parade",
  "Golden Horizon",
  "Moonlight Dancer",
  "River of Dreams",
  "Storm Chaser",
  "Autumn Ember",
  "Crown of Ashes",
  "Shadow in Motion",
  "Royal Daydream",
  "Velvet Sunrise",
  "Lucky Lantern",
  "Echo of Glory",
  "Painted Promise",
  "Sir Neighs-a-Lot",
  "Hay There Buddy",
  "Gallopin' Goofball",
  "Trotter McTrotface",
  "Snack Break Champion",
  "Whoa Nelly Deluxe",
  "Fast but Confused",
  "Mane Attraction",
  "Carrot Inspector",
  "Hoof Hearted",
  "Sakura Wind",
  "Lotus of the Valley",
  "Jade Horizon",
  "Silk Road Spirit",
  "Moon Over Kyoto",
  "Pearl Dragon",
  "Eastern Sunrise",
  "Song of the Steppe",
  "Golden Khan",
  "Cherry Blossom Rider",
  "Stella Fortuna",
  "Luna Aurea",
  "Ventus Magnus",
  "Cor Leonis",
  "Via Triumphalis",
  "Celeritas Maxima",
  "Bellator Equus",
  "Aquila Noctis",
  "Regina Solaris",
  "Equus Mirabilis",
];

export const COLORS = [
  { name: "Crimson Red", hex: "#DC143C" },
  { name: "Scarlet", hex: "#FF2400" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Sunset Orange", hex: "#FF4500" },
  { name: "Golden Yellow", hex: "#FFD700" },
  { name: "Mustard", hex: "#E1AD01" },
  { name: "Lime Green", hex: "#32CD32" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Emerald", hex: "#50C878" },
  { name: "Teal", hex: "#008080" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Azure", hex: "#007FFF" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Violet", hex: "#8A2BE2" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Hot Pink", hex: "#FF69B4" },
  { name: "Rose", hex: "#FF007F" },
  { name: "Chocolate Brown", hex: "#8B4513" },
  { name: "Saddle Brown", hex: "#8B3E2F" },
  { name: "Olive", hex: "#808000" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Slate Gray", hex: "#708090" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Mint", hex: "#98FF98" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Peach", hex: "#FFDAB9" },
  { name: "Ivory", hex: "#FFFFF0" },
];

export const HORSE_CONDITION_MIN = 1;
export const HORSE_CONDITION_MAX = 100;
export const RACE_LAP_HORSE_COUNT = 10;
export const RACE_LAP_ITEMS = {
  FIRST_LAP: {
    lapNumber: 1,
    lapDistance: 1200,
    lapName: "First Lap",
  },
  SECOND_LAP: {
    lapNumber: 2,
    lapDistance: 1400,
    lapName: "Second Lap",
  },
  THIRD_LAP: {
    lapNumber: 3,
    lapDistance: 1600,
    lapName: "Third Lap",
  },
  FOURTH_LAP: {
    lapNumber: 4,
    lapDistance: 1800,
    lapName: "Fourth Lap",
  },
  FIFTH_LAP: {
    lapNumber: 5,
    lapDistance: 2000,
    lapName: "Fifth Lap",
  },
  SIXTH_LAP: {
    lapNumber: 6,
    lapDistance: 2200,
    lapName: "Sixth Lap",
  },
} as const satisfies Record<string, RaceLapItem>;

export const SPEED_MULTIPLIER = 0.3; // Base speed calculation multiplier (increased for faster races)
export const VARIATION_RANGE = 0.15; // Random variation range for speed
export const UPDATE_INTERVAL_MS = 250; // Position update interval in milliseconds
export const COUNTDOWN_DURATION = 3; // Countdown seconds before race starts
export const LAP_TRANSITION_DELAY_MS = 300; // Delay for CSS transition to complete before showing results
export const NEXT_LAP_DELAY_MS = 1000; // Delay before starting next lap
export const COUNTDOWN_INTERVAL_MS = 1000; // Countdown tick interval

// Distance-based racing: base distance for speed normalization
export const BASE_DISTANCE = 1200; // Base distance in meters (shortest race)

// Race phases: different speed bonuses at different points in the race
export const RACE_PHASES = {
  START: { maxPosition: 15, speedBonus: 0.08 }, // First 15%: initial burst off the line
  CRUISE: { maxPosition: 75, speedBonus: 0 }, // 15-75%: steady pace, conserve energy
  SPRINT: { maxPosition: 100, speedBonus: 0.12 }, // 75-100%: final sprint to the finish
} as const;
/**
 * Condition push for slow horses - helps low-condition horses finish faster
 * but they cannot pass horses with conditions above the threshold
 */
export const CONDITION_PUSH_THRESHOLD = 50; // Horses below this get their condition boosted
export const CONDITION_PUSH_FLOOR = 45; // Minimum effective condition for boosted horses

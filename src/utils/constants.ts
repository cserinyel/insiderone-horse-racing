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
  // Reds & Oranges
  { name: "Crimson Red", hex: "#E63946" },
  { name: "Fire Engine Red", hex: "#CC0000" },
  { name: "Signal Orange", hex: "#FF7A00" },
  { name: "Tangerine", hex: "#FF9E1B" },
  { name: "Amber Glow", hex: "#FFB000" },

  // Yellows & Golds (bright but not glaring)
  { name: "Sunshine Yellow", hex: "#FFE11A" },
  { name: "Goldenrod", hex: "#FFCC33" },

  // Blues (clear & vibrant)
  { name: "Sky Blue", hex: "#49A7FF" },
  { name: "Cerulean", hex: "#2FA4E7" },
  { name: "Azure Blue", hex: "#007BFF" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Indigo Blue", hex: "#3455DB" },

  // Cyans & Aquas
  { name: "Bright Cyan", hex: "#19C3FF" },
  { name: "Electric Aqua", hex: "#00E5FF" },
  { name: "Turquoise", hex: "#1DD2A3" },

  // Purples & Magentas
  { name: "Electric Purple", hex: "#9B5DE5" },
  { name: "Vivid Violet", hex: "#8A2BE2" },
  { name: "Royal Magenta", hex: "#D000FF" },
  { name: "Fuchsia Punch", hex: "#FF2ED1" },
  { name: "Hot Pink", hex: "#FF5EBB" },

  // Greens (chosen to contrast well on dark)
  { name: "Neon Green", hex: "#39FF14" },
  { name: "Lime Glow", hex: "#A7F432" },
  { name: "Emerald Flash", hex: "#2ECC71" },

  // Browns / Earth tones (still bright enough)
  { name: "Copper", hex: "#D2691E" },
  { name: "Desert Sand", hex: "#E3A857" },

  // Light Neutrals (excellent pop on dark UI)
  { name: "Warm White", hex: "#FFF7E6" },
  { name: "Soft Ivory", hex: "#FFF2CC" },
  { name: "Platinum", hex: "#E5E5E5" },

  // Bold Darks (for accent use, still readable)
  { name: "Cobalt Night", hex: "#4F5DFF" },
  { name: "Crimson Night", hex: "#FF3B5C" },
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
export const FINISH_LINE_POSITION = 100;
export const INITIAL_POSITION = 0;

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

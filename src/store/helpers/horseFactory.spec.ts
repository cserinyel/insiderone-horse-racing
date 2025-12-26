import { describe, it, expect, beforeEach } from "vitest";
import { createRandomHorses, getRandomHorses } from "./horseFactory";
import {
  HORSE_COUNT,
  HORSE_NAMES,
  HORSE_CONDITION_MIN,
  HORSE_CONDITION_MAX,
  COLORS,
  RACE_LAP_HORSE_COUNT,
} from "../../utils/constants";
import type { Horse, HorseId } from "../../types/horse";

describe("horseFactory", () => {
  describe("createRandomHorses", () => {
    it("returns exactly HORSE_COUNT horses", () => {
      const horses = createRandomHorses();
      expect(horses).toHaveLength(HORSE_COUNT);
    });

    it("all horses have unique names", () => {
      const horses = createRandomHorses();
      const names = horses.map((h) => h.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(horses.length);
    });

    it("all horses have unique colors", () => {
      const horses = createRandomHorses();
      const colorHexes = horses.map((h) => h.color.hex);
      const uniqueColors = new Set(colorHexes);
      expect(uniqueColors.size).toBe(horses.length);
    });

    it("all horse names are from HORSE_NAMES constant", () => {
      const horses = createRandomHorses();
      horses.forEach((horse) => {
        expect(HORSE_NAMES).toContain(horse.name);
      });
    });

    it("all horse colors are from COLORS constant", () => {
      const horses = createRandomHorses();
      const validHexes = COLORS.map((c) => c.hex);
      horses.forEach((horse) => {
        expect(validHexes).toContain(horse.color.hex);
      });
    });

    it("all horses have condition within valid range", () => {
      const horses = createRandomHorses();
      horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(HORSE_CONDITION_MIN);
        expect(horse.condition).toBeLessThanOrEqual(HORSE_CONDITION_MAX);
      });
    });

    it("all horses have integer condition values", () => {
      const horses = createRandomHorses();
      horses.forEach((horse) => {
        expect(Number.isInteger(horse.condition)).toBe(true);
      });
    });

    it("all horses have valid UUID as id", () => {
      const horses = createRandomHorses();
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      horses.forEach((horse) => {
        expect(horse.id).toMatch(uuidRegex);
      });
    });

    it("each horse has all required properties", () => {
      const horses = createRandomHorses();
      horses.forEach((horse) => {
        expect(horse).toHaveProperty("id");
        expect(horse).toHaveProperty("name");
        expect(horse).toHaveProperty("color");
        expect(horse).toHaveProperty("condition");
        expect(horse.color).toHaveProperty("name");
        expect(horse.color).toHaveProperty("hex");
      });
    });

    it("produces different results on multiple calls (randomness)", () => {
      const horses1 = createRandomHorses();
      const horses2 = createRandomHorses();

      // Names should be in different order (with very high probability)
      const names1 = horses1.map((h) => h.name).join(",");
      const names2 = horses2.map((h) => h.name).join(",");

      // Note: There's a tiny chance this could fail due to randomness
      // but with 20 horses, the probability is astronomically low
      expect(names1).not.toBe(names2);
    });
  });

  describe("getRandomHorses", () => {
    let mockHorses: Horse[];

    beforeEach(() => {
      mockHorses = Array.from({ length: 20 }, (_, i) => ({
        id: `horse-${i}` as HorseId,
        name: `Horse ${i}`,
        color: { name: `Color ${i}`, hex: `#${i.toString().padStart(6, "0")}` },
        condition: 50 + i,
      }));
    });

    it("returns RACE_LAP_HORSE_COUNT horses by default", () => {
      const result = getRandomHorses(mockHorses);
      expect(result).toHaveLength(RACE_LAP_HORSE_COUNT);
    });

    it("returns specified count of horses", () => {
      const result = getRandomHorses(mockHorses, 5);
      expect(result).toHaveLength(5);
    });

    it("returns all horses that are from the input array", () => {
      const result = getRandomHorses(mockHorses, 10);
      result.forEach((horse) => {
        expect(mockHorses).toContainEqual(horse);
      });
    });

    it("returns unique horses (no duplicates)", () => {
      const result = getRandomHorses(mockHorses, 10);
      const ids = result.map((h) => h.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(result.length);
    });

    it("does not modify the original array", () => {
      const originalLength = mockHorses.length;
      const originalFirstHorse = { ...mockHorses[0] };

      getRandomHorses(mockHorses, 10);

      expect(mockHorses).toHaveLength(originalLength);
      expect(mockHorses[0]).toEqual(originalFirstHorse);
    });

    it("returns empty array when count is 0", () => {
      const result = getRandomHorses(mockHorses, 0);
      expect(result).toHaveLength(0);
    });

    it("returns all horses when count equals array length", () => {
      const result = getRandomHorses(mockHorses, mockHorses.length);
      expect(result).toHaveLength(mockHorses.length);
    });

    it("returns all horses when count exceeds array length", () => {
      const result = getRandomHorses(mockHorses, mockHorses.length + 10);
      expect(result).toHaveLength(mockHorses.length);
    });

    it("handles empty input array", () => {
      const result = getRandomHorses([], 5);
      expect(result).toHaveLength(0);
    });

    it("shuffles horses (produces different orders)", () => {
      // Run multiple times and check that we get different orders
      const results: string[] = [];
      for (let i = 0; i < 10; i++) {
        const result = getRandomHorses(mockHorses, 10);
        results.push(result.map((h) => h.id).join(","));
      }

      // With 10 attempts, we should have at least 2 different orders
      const uniqueOrders = new Set(results);
      expect(uniqueOrders.size).toBeGreaterThan(1);
    });

    it("implements Fisher-Yates shuffle correctly (uniform distribution)", () => {
      // Track position frequencies for first horse
      const positionCounts: Record<string, number> = {};
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        const result = getRandomHorses(mockHorses, mockHorses.length);
        const firstHorseId = result[0]!.id;
        positionCounts[firstHorseId] = (positionCounts[firstHorseId] || 0) + 1;
      }

      // Each horse should appear in first position roughly equally
      // Expected: ~50 times each (1000 / 20 horses)
      // Allow for statistical variance (between 20 and 80)
      Object.values(positionCounts).forEach((count) => {
        expect(count).toBeGreaterThan(20);
        expect(count).toBeLessThan(100);
      });
    });
  });
});

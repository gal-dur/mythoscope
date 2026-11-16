import { expect, test } from "vitest";
import { mythOf } from "./fixture";
import { byImportance, danger, isDangerousFor } from "./risk";

test("a myth is as dangerous as its worst age", () => {
  expect(danger(mythOf(1, { levels: { adult: "useless", infant: "critical" } }))).toBe(4);
  expect(danger(mythOf(2))).toBe(0);
});

test("a method not used at an age is not a danger at that age", () => {
  const myth = mythOf(1, { levels: { infant: "na", adult: "high" } });
  expect(isDangerousFor(myth, "infant")).toBe(false);
  expect(isDangerousFor(myth, "adult")).toBe(true);
});

test("the common and dangerous come first, the number breaks a tie", () => {
  const rareCritical = mythOf(1, { prevalence: 1, levels: { infant: "critical" } });
  const commonHigh = mythOf(2, { prevalence: 3, levels: { infant: "high" } });
  const commonHighToo = mythOf(3, { prevalence: 3, levels: { adult: "high" } });
  const harmless = mythOf(4, { prevalence: 3 });
  const ordered = [harmless, commonHighToo, rareCritical, commonHigh].toSorted(byImportance);
  expect(ordered.map((myth) => myth.id)).toEqual([2, 3, 1, 4]);
});

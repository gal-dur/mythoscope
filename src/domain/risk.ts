import { type AgeId, ageIds, type Danger, type Level, type Myth } from "./types";

const harm: Readonly<Record<Level, Danger>> = {
  critical: 4,
  high: 3,
  moderate: 2,
  useless: 1,
  safe: 0,
  na: 0,
};

/** Where a level sorts among the others; "not used at this age" sorts below "safe". */
const rank: Readonly<Record<Level, number>> = { ...harm, na: -1 };

/** The worst level the myth reaches at any age. */
export const danger = (myth: Myth): Danger =>
  ageIds.reduce<Danger>((worst, age) => {
    const here = harm[myth.risk[age].level];
    // biome-ignore lint/complexity/useMathMinMax: Math.max answers a number, this answers a Danger
    return here > worst ? here : worst;
  }, 0);

/** Where the myth's level for one age sorts. */
export const rankFor = (myth: Myth, age: AgeId): number => rank[myth.risk[age].level];

/** Whether the myth is high risk or worse for the age. */
export const isDangerousFor = (myth: Myth, age: AgeId): boolean => rankFor(myth, age) >= 3;

/** The default order: the most common and dangerous first, the rare and harmless last. */
export const byImportance = (a: Myth, b: Myth): number =>
  danger(b) * b.prevalence - danger(a) * a.prevalence || danger(b) - danger(a) || a.id - b.id;

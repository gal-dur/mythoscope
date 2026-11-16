import { type AgeId, ageIds, type Level, type Myth } from "./types";

const assess = (level: Level) => ({ level, why: "Потому что" });

/** A myth for tests: harmless at every age unless a level is given for one. */
export const mythOf = (
  id: number,
  parts: Partial<Omit<Myth, "risk">> & { readonly levels?: Partial<Record<AgeId, Level>> } = {},
): Myth => {
  const { levels = {}, ...rest } = parts;
  return {
    id,
    part: "Раздел",
    section: "treat",
    title: `Миф ${id}`,
    alias: "",
    prevalence: 2,
    risk: Object.fromEntries(ageIds.map((age) => [age, assess(levels[age] ?? "safe")])) as Record<
      AgeId,
      ReturnType<typeof assess>
    >,
    mechanism: [],
    instead: [],
    message: "",
    evidence: [],
    sources: [],
    ...rest,
  };
};

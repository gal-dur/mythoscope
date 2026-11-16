/** Who the risk is assessed for, youngest first. */
export const ageIds = ["infant", "toddler", "child", "adult", "preg"] as const;
export type AgeId = (typeof ageIds)[number];

/** How bad a method is for one age, worst first; `na` is "not used at this age". */
export const levels = ["critical", "high", "moderate", "useless", "safe", "na"] as const;
export type Level = (typeof levels)[number];

/** Whether a myth is about what causes an illness or about how to treat one. */
export type Section = "cause" | "treat";

/** The author's estimate of how common a myth is: 1 rare, 2 common, 3 very common. */
export type Prevalence = 1 | 2 | 3;

/** The worst level a myth reaches at any age: 0 harmless … 4 critical. */
export type Danger = 0 | 1 | 2 | 3 | 4;

export interface Assessment {
  readonly level: Level;
  readonly why: string;
}

export interface Evidence {
  readonly strength: "ok" | "weak";
  readonly text: string;
}

export interface Source {
  readonly title: string;
  readonly url: string;
}

export interface Myth {
  readonly id: number;
  readonly part: string;
  readonly section: Section;
  readonly title: string;
  readonly alias: string;
  readonly prevalence: Prevalence;
  readonly risk: Readonly<Record<AgeId, Assessment>>;
  readonly mechanism: readonly string[];
  readonly instead: readonly string[];
  readonly message: string;
  readonly evidence: readonly Evidence[];
  readonly sources: readonly Source[];
}

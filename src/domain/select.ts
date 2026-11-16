import { match } from "ts-pattern";
import { byImportance, isDangerousFor, rankFor } from "./risk";
import type { AgeId, Myth, Section } from "./types";

export type SectionFilter = "all" | Section;
export type RiskFilter = "all" | "danger";
export type Order = "main" | "age" | "prev" | "az";

export interface Filters {
  readonly section: SectionFilter;
  readonly risk: RiskFilter;
  readonly order: Order;
}

/** Everything that decides which myths are listed, and in what order. */
export interface Selection extends Filters {
  readonly age: AgeId;
  readonly query: string;
}

export const noFilters: Filters = { section: "all", risk: "all", order: "main" };

/** Whether any filter or order differs from the default. */
export const isFiltered = ({ section, risk, order }: Filters): boolean =>
  section !== "all" || risk !== "all" || order !== "main";

/** Text as the search compares it: trimmed, lower case, `ё` and `е` the same letter. */
export const searchable = (text: string): string => text.trim().toLowerCase().replaceAll("ё", "е");

const haystack = (myth: Myth): string =>
  searchable(
    [myth.title, myth.alias, myth.part, myth.message, ...myth.mechanism, ...myth.instead].join(" "),
  );

const withoutQuotes = (title: string): string => title.replace(/^[«"„]+/, "");

const comparison = (order: Order, age: AgeId): ((a: Myth, b: Myth) => number) =>
  match(order)
    .with("main", () => byImportance)
    .with(
      "age",
      () => (a: Myth, b: Myth) => rankFor(b, age) - rankFor(a, age) || byImportance(a, b),
    )
    .with("prev", () => (a: Myth, b: Myth) => b.prevalence - a.prevalence || byImportance(a, b))
    .with(
      "az",
      () => (a: Myth, b: Myth) =>
        withoutQuotes(a.title).localeCompare(withoutQuotes(b.title), "ru"),
    )
    .exhaustive();

/** The myths the selection lists, in the order it asks for. */
export const select = <M extends Myth>(myths: readonly M[], selection: Selection): readonly M[] => {
  const query = searchable(selection.query);
  return myths
    .filter(
      (myth) =>
        (selection.section === "all" || myth.section === selection.section) &&
        (selection.risk === "all" || isDangerousFor(myth, selection.age)) &&
        (query === "" || haystack(myth).includes(query)),
    )
    .toSorted(comparison(selection.order, selection.age));
};

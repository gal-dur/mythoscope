import type { Filters, Order, RiskFilter, SectionFilter } from "./select";
import type { AgeId, Assessment, Danger, Level, Prevalence } from "./types";

export const ageLabels: Readonly<Record<AgeId, string>> = {
  infant: "0–12 мес",
  toddler: "1–3 года",
  child: "3–12 лет",
  adult: "Взрослый",
  preg: "Берем.",
};

export const levelLabels: Readonly<Record<Level, string>> = {
  critical: "Критично",
  high: "Высокий риск",
  moderate: "Умеренный",
  useless: "Бесполезно",
  safe: "Не опасно",
  na: "Не применимо",
};

export const sectionLabels: Readonly<Record<SectionFilter, string>> = {
  all: "Все",
  cause: "Что вызывает",
  treat: "Как лечить",
};

export const riskLabels: Readonly<Record<RiskFilter, string>> = {
  all: "Все мифы",
  danger: "Только критично и высокий",
};

export const orderLabels: Readonly<Record<Order, string>> = {
  main: "Сначала важные",
  age: "По риску для возраста",
  prev: "По распространённости",
  az: "По алфавиту",
};

export const prevalenceLabels: Readonly<Record<Prevalence, string>> = {
  1: "редко",
  2: "часто",
  3: "очень часто",
};

export const dangerLabels: Readonly<Record<Danger, string>> = {
  0: "вреда нет",
  1: "бесполезно",
  2: "умеренная",
  3: "высокая",
  4: "критическая",
};

/** A sentence opening put after a colon: lower case, unless it opens with an abbreviation. */
const afterColon = (text: string): string =>
  /[а-яё]/.test(text.charAt(1)) ? text.charAt(0).toLowerCase() + text.slice(1) : text;

/** The one-line verdict for an age: the level and why. */
export const verdict = ({ level, why }: Assessment): string =>
  level === "na"
    ? "В этом возрасте метод не применяют"
    : `${levelLabels[level]}: ${afterColon(why)}`;

/** What the list says about itself: how many are shown, which filters, what order. */
export const listSummary = (
  filters: Filters & { readonly query: string },
  shown: number,
  total: number,
): string => {
  const narrowed =
    filters.query.trim() !== "" || filters.section !== "all" || filters.risk !== "all";
  const count = shown > 0 ? `Показано: ${shown} из ${total}` : "Ничего не найдено.";
  const which = [
    ...(filters.section === "all" ? [] : [sectionLabels[filters.section]]),
    ...(filters.risk === "all" ? [] : ["критично и высокий риск"]),
  ].join(", ");
  return [
    ...(narrowed ? [count] : []),
    ...(which === "" ? [] : [which]),
    ...(filters.order === "main" ? [] : [`Порядок: ${orderLabels[filters.order].toLowerCase()}`]),
  ].join(" · ");
};

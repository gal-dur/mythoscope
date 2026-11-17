import { noFilters, type Order, type RiskFilter, type Selection } from "./select";
import { type AgeId, ageIds, type Section } from "./types";

/** What an address fragment asks for. */
export type Route =
  | { readonly kind: "home" }
  | { readonly kind: "list" }
  /** `tokens` is the selection the link was shared with, or empty when it carried none. */
  | { readonly kind: "myth"; readonly id: number; readonly tokens: string }
  /** The retelling of one source, and the myth it was opened from, if any. */
  | { readonly kind: "study"; readonly id: string; readonly myth: number | null };

const sections: readonly Section[] = ["cause", "treat"];
const risks: readonly Exclude<RiskFilter, "all">[] = ["danger"];
const orders: readonly Order[] = ["main", "age", "prev", "az"];

const isOneOf = <T extends string>(values: readonly T[], value: string): value is T =>
  (values as readonly string[]).includes(value);

const toHex = (text: string): string =>
  Array.from(new TextEncoder().encode(text), (byte) => byte.toString(16).padStart(2, "0")).join("");

const fromHex = (hex: string): string =>
  new TextDecoder().decode(
    Uint8Array.from(hex.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16)),
  );

/** The longest search a link carries. */
const queryLimit = 40;

/** The selection as a link carries it: `-cause-danger-infant-q…`, or empty for the default. */
export const selectionTokens = (selection: Selection): string => {
  const query = selection.query.trim().slice(0, queryLimit);
  const tokens = [
    ...(selection.section === "all" ? [] : [selection.section]),
    ...(selection.risk === "all" ? [] : [selection.risk]),
    ...(selection.order === "main" ? [] : [selection.order]),
    // The age matters to the reader of a link only when it decides what is listed.
    ...(selection.risk !== "all" || selection.order === "age" ? [selection.age] : []),
    ...(query === "" ? [] : [`q${toHex(query)}`]),
  ];
  return tokens.map((token) => `-${token}`).join("");
};

const selectionPart = (token: string): Partial<Selection> => {
  if (isOneOf(sections, token)) return { section: token };
  if (isOneOf(risks, token)) return { risk: token };
  if (isOneOf(orders, token)) return { order: token };
  if (isOneOf(ageIds, token)) return { age: token };
  if (/^q([0-9a-f]{2})+$/.test(token)) return { query: fromHex(token.slice(1)) };
  return {};
};

/** The selection a link carried; what it does not name is the default, the age the reader's own. */
export const selectionFromTokens = (tokens: string, age: AgeId): Selection =>
  Object.assign({ ...noFilters, age, query: "" }, ...tokens.split("-").map(selectionPart));

/** The fragment (without `#`) for a myth opened under a selection. */
export const mythFragment = (id: number, selection: Selection): string =>
  `myth-${id}${selectionTokens(selection)}`;

/** The fragment (without `#`) for the retelling of a source, opened from a myth or on its own. */
export const studyFragment = (id: string, myth: number | null): string =>
  `study-${id}${myth === null ? "" : `-m${myth}`}`;

/** What a fragment (with or without its `#`) asks for; anything unrecognised is the home page. */
export const routeOf = (fragment: string): Route => {
  const bare = fragment.replace(/^#/, "");
  const myth = /^myth-(\d+)((?:-[a-z0-9]+)*)$/.exec(bare);
  if (myth) return { kind: "myth", id: Number(myth[1]), tokens: myth[2] ?? "" };
  const study = /^study-([a-z0-9]+)(?:-m(\d+))?$/.exec(bare);
  if (study?.[1]) {
    return { kind: "study", id: study[1], myth: study[2] === undefined ? null : Number(study[2]) };
  }
  return bare === "myths" ? { kind: "list" } : { kind: "home" };
};

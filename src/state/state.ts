import { match } from "ts-pattern";
import { type Route, selectionFromTokens } from "../domain/link";
import {
  noFilters,
  type Order,
  type RiskFilter,
  type SectionFilter,
  type Selection,
  select,
} from "../domain/select";
import type { AgeId, Myth } from "../domain/types";

/** What the page says about a copy the reader asked for. */
export type Notice =
  | { readonly kind: "linkCopied"; readonly id: number }
  /** The clipboard refused: the link is shown to be copied by hand. */
  | { readonly kind: "linkShown"; readonly id: number; readonly url: string }
  | { readonly kind: "messageCopied"; readonly id: number }
  /** The clipboard refused: the message is selected to be copied by hand. */
  | { readonly kind: "messageSelected"; readonly id: number };

export interface State extends Selection {
  readonly view: "home" | "list";
  readonly filtersOpen: boolean;
  /** The myth being read, or null when the list is on screen. */
  readonly reading: number | null;
  /** The myth the reader just came back from, marked in the list for a moment. */
  readonly cameFrom: number | null;
  readonly notice: Notice | null;
}

export type Event =
  | { readonly kind: "browse" }
  | { readonly kind: "about" }
  | { readonly kind: "search"; readonly query: string }
  | { readonly kind: "pickAge"; readonly age: AgeId }
  | { readonly kind: "pickSection"; readonly section: SectionFilter }
  | { readonly kind: "pickRisk"; readonly risk: RiskFilter }
  | { readonly kind: "pickOrder"; readonly order: Order }
  | { readonly kind: "resetFilters" }
  | { readonly kind: "toggleFilters" }
  | { readonly kind: "closeFilters" }
  | { readonly kind: "read"; readonly id: number }
  | { readonly kind: "stopReading" }
  | { readonly kind: "follow"; readonly route: Route }
  | { readonly kind: "notify"; readonly notice: Notice }
  | { readonly kind: "dismissNotice" }
  | { readonly kind: "forgetCameFrom" };

/** What the page remembers between visits, and the address it was opened at. */
export interface Arrival {
  readonly route: Route;
  readonly age: AgeId | null;
  readonly seen: boolean;
}

type Myths = readonly Myth[];

const lists = (myths: Myths, state: State, id: number): boolean =>
  select(myths, state).some((myth) => myth.id === id);

/** Opens a myth; one the selection hides is opened under no filters and no search. */
const read = (myths: Myths, state: State, id: number): State => {
  if (!myths.some((myth) => myth.id === id)) return state;
  const open: State = { ...state, view: "list", reading: id, cameFrom: null, notice: null };
  return lists(myths, open, id) ? open : { ...open, ...noFilters, query: "" };
};

const stopReading = (state: State): State =>
  state.reading === null
    ? state
    : { ...state, reading: null, cameFrom: state.reading, notice: null };

const follow = (myths: Myths, state: State, route: Route): State =>
  match(route)
    .with({ kind: "home" }, () => ({ ...stopReading(state), view: "home" as const }))
    .with({ kind: "list" }, () => ({ ...stopReading(state), view: "list" as const }))
    .with({ kind: "myth" }, ({ id, tokens }) => {
      if (id === state.reading || !myths.some((myth) => myth.id === id)) return state;
      const selected =
        tokens === "" ? state : { ...state, ...selectionFromTokens(tokens, state.age) };
      return read(myths, selected, id);
    })
    .exhaustive();

/** While a myth is being read it must be one the selection lists: else the first, else none. */
const settle = (myths: Myths, state: State): State => {
  if (state.reading === null) return state;
  const listed = select(myths, state);
  if (listed.some((myth) => myth.id === state.reading)) return state;
  const first = listed[0];
  return first ? { ...state, reading: first.id, notice: null } : { ...state, reading: null };
};

/** The reducer over a set of myths: `(state, event) -> state`, pure and total. */
export const nextStateOver =
  (myths: Myths) =>
  (state: State, event: Event): State =>
    settle(
      myths,
      match(event)
        .with({ kind: "browse" }, () => ({ ...state, view: "list" as const }))
        .with({ kind: "about" }, () => ({ ...state, view: "home" as const }))
        .with({ kind: "search" }, ({ query }) => ({ ...state, query }))
        .with({ kind: "pickAge" }, ({ age }) => ({ ...state, age }))
        .with({ kind: "pickSection" }, ({ section }) => ({ ...state, section }))
        .with({ kind: "pickRisk" }, ({ risk }) => ({ ...state, risk }))
        .with({ kind: "pickOrder" }, ({ order }) => ({ ...state, order }))
        .with({ kind: "resetFilters" }, () => ({ ...state, ...noFilters }))
        .with({ kind: "toggleFilters" }, () => ({ ...state, filtersOpen: !state.filtersOpen }))
        .with({ kind: "closeFilters" }, () => ({ ...state, filtersOpen: false }))
        .with({ kind: "read" }, ({ id }) => read(myths, state, id))
        .with({ kind: "stopReading" }, () => stopReading(state))
        .with({ kind: "follow" }, ({ route }) => follow(myths, state, route))
        .with({ kind: "notify" }, ({ notice }) => ({ ...state, notice }))
        .with({ kind: "dismissNotice" }, () => ({ ...state, notice: null }))
        .with({ kind: "forgetCameFrom" }, () => ({ ...state, cameFrom: null }))
        .exhaustive(),
    );

/** The state a visit starts in: a returning reader lands on the list, a link on its myth. */
export const initialState = (myths: Myths, arrival: Arrival): State => {
  const blank: State = {
    ...noFilters,
    age: arrival.age ?? "infant",
    query: "",
    view: arrival.seen ? "list" : "home",
    filtersOpen: false,
    reading: null,
    cameFrom: null,
    notice: null,
  };
  return arrival.route.kind === "home"
    ? blank
    : nextStateOver(myths)(blank, { kind: "follow", route: arrival.route });
};

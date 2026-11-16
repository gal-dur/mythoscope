import { expect, test } from "vitest";
import { mythOf } from "../domain/fixture";
import { routeOf } from "../domain/link";
import { fragmentOf } from "./fragment";
import { type Event, initialState, nextStateOver, type State } from "./state";

const myths = [
  mythOf(1, { prevalence: 3, levels: { infant: "critical" }, title: "Мёд до года" }),
  mythOf(2, { prevalence: 2, levels: { infant: "high" }, section: "cause", title: "Сквозняк" }),
  mythOf(3, { prevalence: 1, levels: { adult: "moderate" }, title: "Чеснок в нос" }),
];
const nextState = nextStateOver(myths);
const arriving = (fragment = "", seen = false): State =>
  initialState(myths, { route: routeOf(fragment), age: null, seen });
const after = (state: State, ...events: Event[]): State => events.reduce(nextState, state);

test("a first visit opens on the home page, a returning reader on the list", () => {
  expect(arriving().view).toBe("home");
  expect(arriving("", true).view).toBe("list");
  expect(arriving("#myths").view).toBe("list");
});

test("a link to a myth opens it over the list", () => {
  const state = arriving("#myth-2");
  expect(state).toMatchObject({ view: "list", reading: 2 });
  expect(fragmentOf(state)).toBe("myth-2");
});

test("a link to a myth that does not exist opens the home page", () => {
  expect(arriving("#myth-99")).toMatchObject({ view: "home", reading: null });
});

test("a link shared under filters brings its filters with it", () => {
  expect(arriving("#myth-2-cause-danger-infant")).toMatchObject({
    reading: 2,
    section: "cause",
    risk: "danger",
    age: "infant",
  });
});

test("the address names the myth and the selection it is read under", () => {
  const state = after(
    arriving("#myths"),
    { kind: "pickRisk", risk: "danger" },
    { kind: "read", id: 1 },
  );
  expect(fragmentOf(state)).toBe("myth-1-danger-infant");
});

test("opening a myth the filters hide drops the filters and the search", () => {
  const state = after(
    arriving("#myths"),
    { kind: "pickSection", section: "cause" },
    { kind: "search", query: "сквозняк" },
    { kind: "follow", route: routeOf("#myth-3") },
  );
  expect(state).toMatchObject({ reading: 3, section: "all", query: "" });
});

test("narrowing the list while reading moves to the first myth still listed", () => {
  const state = after(
    arriving("#myths"),
    { kind: "read", id: 3 },
    { kind: "pickAge", age: "infant" },
    { kind: "pickRisk", risk: "danger" },
  );
  expect(state.reading).toBe(1);
});

test("narrowing the list to nothing while reading closes the reader", () => {
  const state = after(
    arriving("#myths"),
    { kind: "pickRisk", risk: "danger" },
    { kind: "read", id: 1 },
    { kind: "pickAge", age: "preg" },
  );
  expect(state.reading).toBeNull();
});

test("going back marks the myth the reader came from, until the mark is forgotten", () => {
  const closed = after(arriving("#myths"), { kind: "read", id: 2 }, { kind: "stopReading" });
  expect(closed).toMatchObject({ reading: null, cameFrom: 2, view: "list" });
  expect(fragmentOf(closed)).toBe("myths");
  expect(after(closed, { kind: "forgetCameFrom" }).cameFrom).toBeNull();
});

test("the browser's back button from a myth returns to the list", () => {
  const state = after(arriving("#myth-2"), { kind: "follow", route: routeOf("#myths") });
  expect(state).toMatchObject({ reading: null, view: "list", cameFrom: 2 });
});

test("the address the page wrote itself changes nothing when it comes back", () => {
  const state = after(
    arriving("#myths"),
    { kind: "pickOrder", order: "age" },
    { kind: "read", id: 1 },
  );
  expect(after(state, { kind: "follow", route: routeOf(`#${fragmentOf(state)}`) })).toBe(state);
});

test("turning to another myth drops the note about a copy on the last one", () => {
  const state = after(
    arriving("#myth-1"),
    { kind: "notify", notice: { kind: "linkCopied", id: 1 } },
    { kind: "read", id: 2 },
  );
  expect(state).toMatchObject({ reading: 2, notice: null });
});

test("resetting the filters keeps the search and the age", () => {
  const state = after(
    arriving("#myths"),
    { kind: "pickAge", age: "adult" },
    { kind: "search", query: "чеснок" },
    { kind: "pickSection", section: "treat" },
    { kind: "pickOrder", order: "az" },
    { kind: "resetFilters" },
  );
  expect(state).toMatchObject({ section: "all", order: "main", query: "чеснок", age: "adult" });
});

test("stopping when nothing is being read changes nothing", () => {
  const state = arriving("#myths");
  expect(after(state, { kind: "stopReading" })).toBe(state);
});

import { expect, test } from "vitest";
import { mythFragment, routeOf, selectionFromTokens, selectionTokens, studyFragment } from "./link";
import { noFilters, type Selection } from "./select";

const plain: Selection = { ...noFilters, age: "child", query: "" };

test("a link to a myth under no filters carries only the myth", () => {
  expect(mythFragment(7, plain)).toBe("myth-7");
});

test("a link carries the age only when the age decides what is listed", () => {
  expect(selectionTokens({ ...plain, section: "cause" })).toBe("-cause");
  expect(selectionTokens({ ...plain, risk: "danger" })).toBe("-danger-child");
  expect(selectionTokens({ ...plain, order: "age" })).toBe("-age-child");
});

test("a shared selection comes back as it was sent, search included", () => {
  const sent: Selection = {
    section: "treat",
    risk: "danger",
    order: "prev",
    age: "preg",
    query: "мёд и чеснок",
  };
  const route = routeOf(`#${mythFragment(12, sent)}`);
  expect(route).toEqual({ kind: "myth", id: 12, tokens: selectionTokens(sent) });
  expect(selectionFromTokens(selectionTokens(sent), "infant")).toEqual(sent);
});

test("what a link does not name is the default, and the age stays the reader's own", () => {
  expect(selectionFromTokens("-cause", "adult")).toEqual({
    ...plain,
    section: "cause",
    age: "adult",
  });
});

test("a link's search is cut to forty characters", () => {
  const long = "а".repeat(60);
  expect(selectionFromTokens(selectionTokens({ ...plain, query: long }), "child").query).toBe(
    "а".repeat(40),
  );
});

test("an address that names nothing known is the home page", () => {
  expect(routeOf("")).toEqual({ kind: "home" });
  expect(routeOf("#myths")).toEqual({ kind: "list" });
  expect(routeOf("#myth-x")).toEqual({ kind: "home" });
  expect(routeOf("#elsewhere")).toEqual({ kind: "home" });
});

test("an address names a source's retelling, with or without the myth it was opened from", () => {
  expect(routeOf("#study-cat1")).toEqual({ kind: "study", id: "cat1", myth: null });
  expect(routeOf(`#${studyFragment("cat1", 62)}`)).toEqual({ kind: "study", id: "cat1", myth: 62 });
});

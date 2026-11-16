import { expect, test } from "vitest";
import { mythOf } from "./fixture";
import { noFilters, type Selection, select } from "./select";

const everything: Selection = { ...noFilters, age: "infant", query: "" };
const ids = (selection: Partial<Selection>, ...myths: ReturnType<typeof mythOf>[]) =>
  select(myths, { ...everything, ...selection }).map((myth) => myth.id);

test("a search finds ё written as е, and the other way round, in any case", () => {
  const myth = mythOf(1, { title: "Зелёнка на ранку" });
  expect(ids({ query: "  зеленка " }, myth)).toEqual([1]);
  expect(ids({ query: "ЗЕЛЁНКА" }, myth)).toEqual([1]);
  expect(ids({ query: "йод" }, myth)).toEqual([]);
});

test("a search reads the message and the advice, not only the title", () => {
  const myth = mythOf(1, { message: "Давай без чеснока", instead: ["Промыть нос"] });
  expect(ids({ query: "чеснок" }, myth)).toEqual([1]);
  expect(ids({ query: "промыть" }, myth)).toEqual([1]);
});

test("the risk filter keeps what is high or critical for the chosen age only", () => {
  const myths = [
    mythOf(1, { levels: { infant: "critical", adult: "useless" } }),
    mythOf(2, { levels: { infant: "moderate", adult: "high" } }),
  ];
  expect(ids({ risk: "danger", age: "infant" }, ...myths)).toEqual([1]);
  expect(ids({ risk: "danger", age: "adult" }, ...myths)).toEqual([2]);
});

test("a section keeps its own myths", () => {
  expect(ids({ section: "cause" }, mythOf(1), mythOf(2, { section: "cause" }))).toEqual([2]);
});

test("ordering by the chosen age puts its worst first, and what is not used there last", () => {
  const myths = [
    mythOf(1, { levels: { adult: "na" } }),
    mythOf(2, { levels: { adult: "safe" } }),
    mythOf(3, { levels: { adult: "critical" } }),
  ];
  expect(ids({ order: "age", age: "adult" }, ...myths)).toEqual([3, 2, 1]);
});

test("the alphabet ignores an opening quote", () => {
  const myths = [mythOf(1, { title: "Яд" }), mythOf(2, { title: "«Банки» на спину" })];
  expect(ids({ order: "az" }, ...myths)).toEqual([2, 1]);
});

test("ordering by prevalence puts the most common first", () => {
  const myths = [mythOf(1, { prevalence: 1 }), mythOf(2, { prevalence: 3 })];
  expect(ids({ order: "prev" }, ...myths)).toEqual([2, 1]);
});

import { expect, test } from "vitest";
import { noFilters, select } from "../domain/select";
import { myths } from "./myths";

const everything = { ...noFilters, age: "infant", query: "" } as const;

test("every myth has its own number", () => {
  expect(new Set(myths.map((myth) => myth.id)).size).toBe(myths.length);
  expect(myths).toHaveLength(61);
});

test("every myth cites at least one source, and says what to do instead", () => {
  for (const myth of myths) {
    expect(myth.sources.length, myth.title).toBeGreaterThan(0);
    expect(myth.instead.length, myth.title).toBeGreaterThan(0);
    expect(myth.message, myth.title).not.toBe("");
  }
});

test("every source is a link", () => {
  for (const source of myths.flatMap((myth) => myth.sources)) {
    expect(source.url, source.title).toMatch(/^https?:\/\//);
  }
});

test("the list opens with the most common and dangerous myths", () => {
  expect(select(myths, everything).map((myth) => myth.id)).toEqual([
    4, 16, 19, 20, 1, 6, 13, 17, 18, 21, 22, 27, 33, 42, 44, 3, 10, 11, 12, 51, 5, 7, 14, 31, 32,
    35, 38, 50, 8, 9, 15, 24, 30, 43, 45, 46, 47, 48, 49, 53, 57, 58, 59, 39, 41, 56, 2, 40, 25, 28,
    29, 34, 52, 55, 60, 23, 54, 26, 36, 37, 61,
  ]);
});

test("the filters count what the reference holds", () => {
  expect(select(myths, { ...everything, risk: "danger" })).toHaveLength(28);
  expect(select(myths, { ...everything, section: "cause" })).toHaveLength(10);
  expect(select(myths, { ...everything, query: "чеснок" }).map((myth) => myth.id)).toEqual([3, 2]);
});

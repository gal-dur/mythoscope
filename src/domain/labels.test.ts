import { expect, test } from "vitest";
import { listSummary, verdict } from "./labels";
import { noFilters } from "./select";

test("the reason follows the level in lower case", () => {
  expect(verdict({ level: "high", why: "Раздражение кожи" })).toBe(
    "Высокий риск: раздражение кожи",
  );
});

test("a reason that opens with an abbreviation keeps its capitals", () => {
  expect(verdict({ level: "moderate", why: "ОРВИ это не лечит" })).toBe(
    "Умеренный: ОРВИ это не лечит",
  );
});

test("a method not used at an age says so instead of a level", () => {
  expect(verdict({ level: "na", why: "" })).toBe("В этом возрасте метод не применяют");
});

test("an untouched list says nothing about itself", () => {
  expect(listSummary({ ...noFilters, query: "" }, 61, 61)).toBe("");
});

test("a narrowed list says how many it shows, by what, and in what order", () => {
  expect(listSummary({ section: "cause", risk: "danger", order: "az", query: "" }, 3, 61)).toBe(
    "Показано: 3 из 61 · Что вызывает, критично и высокий риск · Порядок: по алфавиту",
  );
  expect(listSummary({ ...noFilters, order: "prev", query: "" }, 61, 61)).toBe(
    "Порядок: по распространённости",
  );
  expect(listSummary({ ...noFilters, query: "ъъъ" }, 0, 61)).toBe("Ничего не найдено.");
});

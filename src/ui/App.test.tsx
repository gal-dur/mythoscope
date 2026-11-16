// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { App } from "./App";

beforeEach(() => {
  // jsdom lays nothing out, so it scrolls nowhere: the calls are the platform's, not the page's.
  window.scrollTo = vi.fn();
  Element.prototype.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  window.localStorage.clear();
  window.location.hash = "";
});
afterEach(cleanup);

const browse = () =>
  fireEvent.click(screen.getAllByRole("button", { name: "Смотреть мифы" })[0] as Element);
const rows = () => document.querySelectorAll(".cards .row");

test("the home page leads to the list of every myth", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("MythoScope");
  browse();
  expect(rows()).toHaveLength(61);
  expect(window.location.hash).toBe("#myths");
});

test("a search narrows the list and says by how much", () => {
  render(<App />);
  browse();
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "чеснок" } });
  expect(rows()).toHaveLength(2);
  expect(screen.getByText(/Показано: 2 из 61/)).toBeTruthy();
});

test("a myth opens in the reader under its own address, and closes back to the list", () => {
  render(<App />);
  browse();
  const first = rows()[0] as HTMLElement;
  const title = first.querySelector(".rt")?.textContent ?? "";
  fireEvent.click(first);
  expect(window.location.hash).toMatch(/^#myth-\d+$/);
  expect(screen.getByText("1 из 61")).toBeTruthy();
  expect(screen.getByRole("heading", { level: 3, name: title })).toBeTruthy();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(document.querySelector(".reader")).toBeNull();
  expect(rows()[0]?.classList.contains("hit")).toBe(true);
});

test("the age picked inside an article changes the verdict in the list too", () => {
  render(<App />);
  browse();
  fireEvent.click(rows()[0] as HTMLElement);
  const article = document.querySelector("article.myth") as HTMLElement;
  fireEvent.click(within(article).getByRole("button", { name: /Взрослый/ }));
  expect(window.localStorage.getItem("age")).toBe("adult");
  expect(
    within(article)
      .getByRole("button", { name: /Взрослый/ })
      .getAttribute("aria-pressed"),
  ).toBe("true");
});

test("a returning reader lands on the list, with the age chosen last time", () => {
  window.localStorage.setItem("seen", "1");
  window.localStorage.setItem("age", "preg");
  render(<App />);
  expect(rows()).toHaveLength(61);
  expect(screen.getByRole("button", { name: "Берем." }).getAttribute("aria-pressed")).toBe("true");
});

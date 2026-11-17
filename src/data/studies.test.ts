import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { sources } from "./sources";

const folder = join(import.meta.dirname, "../../studies");
const files = readdirSync(folder).filter((file) => file.endsWith(".md"));
const linesOf = (file: string): string[] => readFileSync(join(folder, file), "utf8").split("\n");

/** Every retelling has exactly these sections, in this order. */
const sections = [
  "Коротко",
  "Какой вопрос задавали",
  "Как это проверяли",
  "Что получилось",
  "Чему здесь можно верить, а чему нет",
  "Что это значит для вас",
  "Непонятные слова",
  "Оригинал",
];

test("every retelling is named after a source the reference cites", () => {
  expect(files.length).toBeGreaterThan(0);
  for (const file of files) expect(Object.keys(sources), file).toContain(file.replace(/\.md$/, ""));
});

test("every retelling has the same structure", () => {
  for (const file of files) {
    const lines = linesOf(file);
    expect(lines[0], file).toMatch(/^# \S/);
    expect(lines[2], `${file}: kind, year, country and who, in italics`).toMatch(
      /^_(Исследование|Обзор|Памятка|Рекомендации) · \d{4} год · .+ · .+_$/,
    );
    const headings = lines.filter((line) => line.startsWith("## ")).map((line) => line.slice(3));
    expect(headings, file).toEqual(sections);
    expect(
      lines.filter((line) => line.startsWith("# ")),
      file,
    ).toHaveLength(1);
  }
});

test("every retelling ends by leading to the original, and says when it was checked against it", () => {
  for (const file of files) {
    const text = linesOf(file).join("\n");
    const original = text.slice(text.indexOf("## Оригинал"));
    const id = file.replace(/\.md$/, "") as keyof typeof sources;
    expect(original, file).toContain(`](${sources[id].url})`);
    expect(original, file).toMatch(/Пересказ сверен со? .+ \d{1,2} \S+ \d{4} года\./);
  }
});

test("a picture a retelling shows sits beside it and says what it shows", () => {
  for (const file of files) {
    for (const [, alt, src] of linesOf(file)
      .join("\n")
      .matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      expect(alt, file).not.toBe("");
      expect(readdirSync(folder), file).toContain(src);
    }
  }
});

test("retellings keep the author's punctuation: no dashes, no exclamation marks", () => {
  for (const file of files) {
    const body = linesOf(file)
      .join("\n")
      .replace(/!?\[[^\]]*\]\([^)]*\)/g, "");
    expect(body, file).not.toMatch(/[—–!]/);
  }
});

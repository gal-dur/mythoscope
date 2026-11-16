import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const here = import.meta.dirname;
const imports = (file: string): string[] =>
  [...readFileSync(join(here, file), "utf8").matchAll(/from\s+"([^"]+)"/g)].flatMap(
    ([, specifier]) => (specifier ? [specifier] : []),
  );

test("a leaf knows nothing of myths: it imports packages and other leaves only", () => {
  const leaves = readdirSync(here).filter((file) => !file.endsWith(".test.ts"));
  expect(leaves.length).toBeGreaterThan(0);
  for (const leaf of leaves) {
    for (const specifier of imports(leaf)) {
      expect(specifier.startsWith("../"), `${leaf} imports ${specifier}`).toBe(false);
    }
  }
});

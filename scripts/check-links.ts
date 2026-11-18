// Opens every cited source the way a reader's browser would and says which links still lead
// somewhere. Run with `task links`; it is not part of `task check`, because it needs the network.
//
//   ok       answers 2xx at the address the reference cites
//   moved    answers 2xx, but only after redirecting to another address (printed)
//   blocked  the site refuses automated visitors (401, 403, 412, 429 or a bot check): check by hand
//   dead     404, 410, a server error or no answer (after a second try), or a page that says it
//            was not found
//
// Exits 1 when any link is dead or moved; blocked links are listed and do not fail the run.
import { sources } from "../src/data/sources.ts";

type Verdict = "ok" | "moved" | "blocked" | "dead";

interface Result {
  readonly key: string;
  readonly url: string;
  readonly verdict: Verdict;
  readonly note: string;
}

const headers = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
  "Accept-Language": "en,ru;q=0.8",
};

/** Resolvers whose whole job is to redirect: where they land is not a move. */
const resolvers = new Set(["doi.org", "dx.doi.org"]);

const notFound =
  /\b(404|page (was )?not found|page (can(no|')t|could not) be found|страница не найдена)\b/i;
const botCheck = /just a moment|attention required|are you a robot|verify you are human|captcha/i;

/** The same page under another spelling: scheme, `www.`, a trailing slash, the fragment. */
const samePage = (from: string, to: string): boolean => {
  const bare = (address: string): string => {
    const { hostname, pathname, search } = new URL(address);
    return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}${search}`;
  };
  return bare(from) === bare(to);
};

const titleOf = (html: string): string =>
  (/<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] ?? "").replace(/\s+/g, " ").trim();

/** Statuses a site gives a visitor it takes for a robot, whatever the page behind them. */
const refusals = new Set([401, 403, 412, 429]);
const lostAddress = /filenotfound|notfound|badbrowser|\/404\b/i;

const visit = async (key: string, url: string, tries = 2): Promise<Result> => {
  const say = (verdict: Verdict, note: string): Result => ({ key, url, verdict, note });
  const again = (note: string): Result | Promise<Result> =>
    tries > 1 ? visit(key, url, tries - 1) : say("dead", note);
  try {
    const answer = await fetch(url, { headers, signal: AbortSignal.timeout(45_000) });
    const { status } = answer;
    const html = (answer.headers.get("content-type") ?? "").includes("html")
      ? (await answer.text()).slice(0, 300_000)
      : "";
    const title = titleOf(html);
    if (refusals.has(status)) return say("blocked", `${status}`);
    if (status >= 500) return again(`${status}`);
    if (status < 200 || status > 299) return say("dead", `${status}`);
    if (botCheck.test(title)) return say("blocked", `bot check: ${title}`);
    if (/badbrowser/.test(answer.url)) return say("blocked", "wants another browser");
    if (lostAddress.test(answer.url)) return say("dead", `redirects to ${answer.url}`);
    if (notFound.test(title)) return say("dead", `200, but the page says: ${title}`);
    if (resolvers.has(new URL(url).hostname) || samePage(url, answer.url)) return say("ok", "");
    return say("moved", answer.url);
  } catch (problem) {
    const cause = problem instanceof Error ? (problem.cause ?? problem) : problem;
    return again(cause instanceof Error ? cause.message : String(cause));
  }
};

/** Runs the visits a few at a time, so no site sees a burst. */
const visitAll = async (entries: readonly (readonly [string, string])[]): Promise<Result[]> => {
  const results: Result[] = [];
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < entries.length) {
      const entry = entries[next++];
      if (entry === undefined) return;
      const result = await visit(entry[0], entry[1]);
      results.push(result);
      if (result.verdict !== "ok") {
        console.log(`${result.verdict.padEnd(8)}${result.key.padEnd(9)}${result.note}`);
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return results;
};

const only = process.argv.slice(2);
const entries = Object.entries(sources)
  .filter(([key]) => only.length === 0 || only.includes(key))
  .map(([key, source]) => [key, source.url] as const);

const results = await visitAll(entries);
const count = (verdict: Verdict): number =>
  results.filter((result) => result.verdict === verdict).length;
console.log(
  `\n${results.length} links: ${count("ok")} ok, ${count("moved")} moved, ${count("blocked")} blocked, ${count("dead")} dead`,
);
process.exitCode = count("dead") + count("moved") > 0 ? 1 : 0;

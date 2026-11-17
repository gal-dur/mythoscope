/**
 * The retellings in `studies/`: one markdown file per source, named after the source's key.
 * The text of each is its own chunk, fetched when a reader opens it.
 */
const texts = import.meta.glob<string>("../../studies/*.md", { query: "?raw", import: "default" });
const pictures = import.meta.glob<string>("../../studies/*.{webp,png,jpg}", {
  query: "?url",
  import: "default",
  eager: true,
});

const nameOf = (path: string): string => path.slice(path.lastIndexOf("/") + 1);

const loaders = new Map(
  Object.entries(texts).map(([path, load]) => [nameOf(path).replace(/\.md$/, ""), load]),
);
const urls = new Map(Object.entries(pictures).map(([path, url]) => [nameOf(path), url]));

/** Whether a source has a retelling. */
export const hasStudy = (id: string): boolean => loaders.has(id);

/** The markdown of a source's retelling, or null when it has none. */
export const loadStudy = (id: string): Promise<string | null> =>
  loaders.get(id)?.() ?? Promise.resolve(null);

/** Where the built site serves a picture a retelling names beside itself. */
export const pictureUrl = (name: string): string => urls.get(nameOf(name)) ?? name;

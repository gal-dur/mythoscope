/** What the browser keeps between visits; a browser that refuses storage remembers nothing. */
export const remembered = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const remember = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private windows and blocked site data: the page works without it.
  }
};

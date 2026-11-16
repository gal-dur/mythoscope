import { mythFragment } from "../domain/link";
import type { State } from "./state";

/** The address fragment (without `#`) that brings a reader back to this state. */
export const fragmentOf = (state: State): string => {
  if (state.reading !== null) return mythFragment(state.reading, state);
  return state.view === "list" ? "myths" : "";
};

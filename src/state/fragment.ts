import { mythFragment, studyFragment } from "../domain/link";
import type { State } from "./state";

/** The address fragment (without `#`) that brings a reader back to this state. */
export const fragmentOf = (state: State): string => {
  if (state.studying !== null) return studyFragment(state.studying, state.reading);
  if (state.reading !== null) return mythFragment(state.reading, state);
  return state.view === "list" ? "myths" : "";
};

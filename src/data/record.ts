import type { Myth } from "../domain/types";
import type { SourceId } from "./sources";

/** A myth as the data files write it: it names its sources by key, and each must be one `sources` holds. */
export interface MythRecord extends Omit<Myth, "sources"> {
  readonly sources: readonly SourceId[];
}

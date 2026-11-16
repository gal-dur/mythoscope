import { listSummary } from "../../domain/labels";
import { isFiltered, type Selection } from "../../domain/select";
import type { Myth } from "../../domain/types";
import type { Event } from "../../state/state";
import { MythRow } from "./MythRow";

interface Props {
  readonly listed: readonly Myth[];
  readonly total: number;
  readonly selection: Selection;
  readonly cameFrom: number | null;
  readonly onEvent: (event: Event) => void;
}

/** The myths the selection lists, under a line saying how they were narrowed and ordered. */
export const MythList = ({ listed, total, selection, cameFrom, onEvent }: Props) => {
  const summary = listSummary(selection, listed.length, total);
  return (
    <section aria-labelledby="list">
      <div className="lhead">
        <h2 id="list">Все мифы</h2>
        <button type="button" className="about" onClick={() => onEvent({ kind: "about" })}>
          О справочнике
        </button>
      </div>
      <p className="found" aria-live="polite">
        {summary}
        {isFiltered(selection) && (
          <>
            {summary === "" ? "" : " · "}
            <button type="button" onClick={() => onEvent({ kind: "resetFilters" })}>
              Сбросить
            </button>
          </>
        )}
      </p>
      <div className="cards">
        {listed.map((myth) => (
          <MythRow
            key={myth.id}
            myth={myth}
            age={selection.age}
            marked={myth.id === cameFrom}
            onRead={() => onEvent({ kind: "read", id: myth.id })}
          />
        ))}
      </div>
    </section>
  );
};

import type { AgeId, Myth } from "../../domain/types";
import type { Event, Notice } from "../../state/state";
import { ChevronLeft, ChevronRight } from "../leaves/icons";
import { Slides } from "../leaves/Slides";
import { useKeys } from "../leaves/useKeys";
import { MythCard } from "./MythCard";

interface Props {
  /** The myths the reader pages through: the ones the list shows, in its order. */
  readonly listed: readonly Myth[];
  readonly reading: number;
  readonly age: AgeId;
  readonly notice: Notice | null;
  readonly onEvent: (event: Event) => void;
  readonly onCopyLink: (myth: Myth) => void;
  readonly onCopyMessage: (myth: Myth) => void;
}

/** One myth at a time over the whole screen, swiped or stepped through in the list's order. */
export const Reader = ({
  listed,
  reading,
  age,
  notice,
  onEvent,
  onCopyLink,
  onCopyMessage,
}: Props) => {
  const at = Math.max(
    0,
    listed.findIndex((myth) => myth.id === reading),
  );
  const turnTo = (index: number) => {
    const myth = listed[index];
    if (myth) onEvent({ kind: "read", id: myth.id });
  };
  useKeys((key) => {
    if (key === "Escape") onEvent({ kind: "stopReading" });
    if (key === "ArrowLeft") turnTo(at - 1);
    if (key === "ArrowRight") turnTo(at + 1);
  });
  return (
    <div className="reader">
      <div className="rbar">
        <div className="wrap">
          <button
            type="button"
            className="rbtn back"
            onClick={() => onEvent({ kind: "stopReading" })}
          >
            <ChevronLeft />
            Все мифы
          </button>
          <span className="rpos" aria-live="polite">
            {at + 1} из {listed.length}
          </span>
          <button
            type="button"
            className="rbtn"
            aria-label="Предыдущий миф"
            disabled={at <= 0}
            onClick={() => turnTo(at - 1)}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="rbtn"
            aria-label="Следующий миф"
            disabled={at >= listed.length - 1}
            onClick={() => turnTo(at + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <Slides
        className="slides"
        pageClassName="slide"
        index={at}
        onIndex={turnTo}
        pages={listed.map((myth) => ({
          key: myth.id,
          content: (
            <div className="wrap">
              <MythCard
                myth={myth}
                age={age}
                notice={notice?.id === myth.id ? notice : null}
                onPickAge={(picked) => onEvent({ kind: "pickAge", age: picked })}
                onCopyLink={() => onCopyLink(myth)}
                onCopyMessage={() => onCopyMessage(myth)}
              />
            </div>
          ),
        }))}
      />
    </div>
  );
};

import type { Cited } from "../../domain/types";
import type { Event } from "../../state/state";
import { ChevronLeft } from "../leaves/icons";
import { Markdown } from "../leaves/Markdown";
import { useKeys } from "../leaves/useKeys";

interface Props {
  readonly source: Cited;
  /** The retelling's markdown, or null while it is on its way. */
  readonly text: string | null;
  readonly pictureOf: (name: string) => string;
  readonly onEvent: (event: Event) => void;
}

/** One source retold in plain words, over the whole screen; it ends with a link to the original. */
export const Study = ({ source, text, pictureOf, onEvent }: Props) => {
  useKeys((key) => {
    if (key === "Escape") onEvent({ kind: "stopStudying" });
  });
  return (
    <div className="reader study">
      <div className="rbar">
        <div className="wrap">
          <button
            type="button"
            className="rbtn back"
            onClick={() => onEvent({ kind: "stopStudying" })}
          >
            <ChevronLeft />
            Назад
          </button>
        </div>
      </div>
      <div className="studybody">
        <article className="wrap prose" aria-label={source.title}>
          {text === null ? <p>Загружаем пересказ…</p> : <Markdown text={text} srcOf={pictureOf} />}
        </article>
      </div>
    </div>
  );
};

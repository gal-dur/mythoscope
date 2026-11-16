import { useEffect, useRef } from "react";
import type { AgeId, Myth } from "../../domain/types";
import { ChevronRight } from "../leaves/icons";
import { Verdict } from "./Verdict";

interface Props {
  readonly myth: Myth;
  readonly age: AgeId;
  /** The reader just came back from this myth: it is brought into view and outlined. */
  readonly marked: boolean;
  readonly onRead: () => void;
}

/** One myth in the list: its title and its verdict for the chosen age. */
export const MythRow = ({ myth, age, marked, onRead }: Props) => {
  const row = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = row.current;
    if (!marked || !element) return;
    const box = element.getBoundingClientRect();
    if (box.top < 0 || box.bottom > window.innerHeight) element.scrollIntoView({ block: "center" });
  }, [marked]);
  const assessment = myth.risk[age];
  return (
    <button
      type="button"
      ref={row}
      className={`row ${assessment.level}${marked ? " hit" : ""}`}
      onClick={onRead}
    >
      <span className="rt">{myth.title}</span>
      <Verdict assessment={assessment} />
      <ChevronRight className="chev" />
    </button>
  );
};

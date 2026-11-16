import { verdict } from "../../domain/labels";
import type { Assessment } from "../../domain/types";
import { LevelIcon } from "./LevelIcon";

/** The level a method has for the chosen age, and why, on one line. */
export const Verdict = ({ assessment }: { readonly assessment: Assessment }) => (
  <span className={`why ${assessment.level}`}>
    <LevelIcon level={assessment.level} />
    <span>{verdict(assessment)}</span>
  </span>
);

import { match } from "ts-pattern";
import type { Level } from "../../domain/types";

const mark = (colour: string) => (
  <>
    <path d="M12 7v6" stroke={colour} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="12" cy="16.8" r="1.4" fill={colour} />
  </>
);

const ring = (dashed: boolean) => (
  <circle
    cx="12"
    cy="12"
    r="9.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...(dashed ? { strokeDasharray: "3 3" } : {})}
  />
);

/** The sign a level is drawn with: its shape differs by level, so colour is not the only cue. */
export const LevelIcon = ({ level }: { readonly level: Level }) => (
  <svg className="ic" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    {match(level)
      .with("critical", () => (
        <>
          <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" fill="currentColor" />
          {mark("#fff")}
        </>
      ))
      .with("high", () => (
        <>
          <path
            d="M12 2.5 22.5 21h-21z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 9.5v5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="17.6" r="1.25" fill="#fff" />
        </>
      ))
      .with("moderate", () => (
        <>
          {ring(false)}
          {mark("currentColor")}
        </>
      ))
      .with("useless", () => (
        <>
          {ring(false)}
          <path d="M7.5 12h9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ))
      .with("safe", () => (
        <>
          <circle cx="12" cy="12" r="10.5" fill="currentColor" />
          <path
            d="M7.5 12.5l3 3 6-6.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ))
      .with("na", () => ring(true))
      .exhaustive()}
  </svg>
);

import type { ReactNode } from "react";

export interface Option<Value extends string> {
  readonly value: Value;
  readonly label: ReactNode;
  /** A class for this option's button, when options differ in look. */
  readonly tone?: string;
}

interface Props<Value extends string> {
  readonly options: readonly Option<Value>[];
  readonly value: Value;
  readonly onPick: (value: Value) => void;
  /** What the group is for, read out by a screen reader. */
  readonly label: string;
  readonly className: string;
}

/** A group of buttons of which one is pressed. */
export const Choice = <Value extends string>({
  options,
  value,
  onPick,
  label,
  className,
}: Props<Value>) => (
  // biome-ignore lint/a11y/useSemanticElements: a fieldset brings a border and a legend the layout has no place for
  <div className={className} role="group" aria-label={label}>
    {options.map((option) => (
      <button
        type="button"
        key={option.value}
        className={option.tone}
        aria-pressed={option.value === value}
        onClick={() => onPick(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

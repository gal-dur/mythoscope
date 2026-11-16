interface Props {
  readonly filled: number;
  readonly of: number;
  readonly tone: string;
}

/** A score drawn as filled and empty dots; decoration beside the words that say the same. */
export const Dots = ({ filled, of, tone }: Props) => (
  <span className={`dots ${tone}`} aria-hidden="true">
    {"●".repeat(filled)}
    {"○".repeat(of - filled)}
  </span>
);

interface StrokeProps {
  readonly size: number;
  readonly width: number;
  readonly paths: readonly string[];
  readonly className?: string;
}

const Stroke = ({ size, width, paths, className }: StrokeProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

export const ChevronLeft = () => <Stroke size={18} width={2.2} paths={["M15 5l-7 7 7 7"]} />;

export const ChevronRight = ({ className }: { readonly className?: string }) => (
  <Stroke size={18} width={2.2} paths={["M9 5l7 7-7 7"]} {...(className ? { className } : {})} />
);

export const ArrowRight = () => <Stroke size={20} width={2.4} paths={["M5 12h14M13 6l6 6-6 6"]} />;

export const FilterLines = () => (
  <Stroke size={20} width={2.2} paths={["M4 7h16M7 12h10M10 17h4"]} />
);

export const ChainLink = () => (
  <Stroke
    size={18}
    width={2}
    paths={[
      "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1",
      "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
    ]}
  />
);

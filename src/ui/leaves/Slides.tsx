import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";

export interface Page {
  readonly key: string | number;
  readonly content: ReactNode;
}

interface Props {
  readonly pages: readonly Page[];
  /** The page on screen. The scroll position is corrected to it, never read as the truth. */
  readonly index: number;
  /** The reader swiped to another page. */
  readonly onIndex: (index: number) => void;
  readonly className: string;
  readonly pageClassName: string;
}

/** How long the scroll must rest before the page it rests on counts as chosen. */
const restMs = 90;

const pageOf = (strip: HTMLElement): number =>
  strip.clientWidth > 0 ? Math.round(strip.scrollLeft / strip.clientWidth) : 0;

/** Pages side by side, one on screen at a time, swiped between or turned by `index`. */
export const Slides = ({ pages, index, onIndex, className, pageClassName }: Props) => {
  const strip = useRef<HTMLDivElement>(null);
  const shown = useRef(false);
  const latest = useRef({ index, onIndex });
  latest.current = { index, onIndex };

  useLayoutEffect(() => {
    const element = strip.current;
    if (!element) return;
    const from = pageOf(element);
    if (from !== index) {
      // A neighbouring page glides in; anything further, and the first page shown, is just there.
      const glide = shown.current && Math.abs(from - index) === 1;
      element.scrollTo({
        left: index * element.clientWidth,
        behavior: glide ? "smooth" : "instant",
      });
    }
    shown.current = true;
  }, [index]);

  useEffect(() => {
    const element = strip.current;
    if (!element) return;
    let resting: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      clearTimeout(resting);
      resting = setTimeout(() => {
        const page = pageOf(element);
        if (page !== latest.current.index) latest.current.onIndex(page);
      }, restMs);
    };
    const onResize = () =>
      element.scrollTo({ left: latest.current.index * element.clientWidth, behavior: "instant" });
    element.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resting);
      element.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={strip} className={className}>
      {pages.map((page) => (
        <div key={page.key} className={pageClassName}>
          {page.content}
        </div>
      ))}
    </div>
  );
};

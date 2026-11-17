import ReactMarkdown from "react-markdown";

interface Props {
  readonly text: string;
  /** Where a picture the text names is served from. */
  readonly srcOf: (src: string) => string;
}

/** Markdown as a page: links open beside it, pictures come from wherever `srcOf` says. */
export const Markdown = ({ text, srcOf }: Props) => (
  <ReactMarkdown
    components={{
      a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ),
      img: ({ src, alt }) => (
        <img src={srcOf(typeof src === "string" ? src : "")} alt={alt ?? ""} loading="lazy" />
      ),
    }}
  >
    {text}
  </ReactMarkdown>
);

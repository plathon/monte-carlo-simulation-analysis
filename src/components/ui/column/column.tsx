type Props = {
  size?:
    | "full"
    | "four-fifths"
    | "three-quarters"
    | "two-thirds"
    | "three-fifths"
    | "half"
    | "two-fifths"
    | "one-third"
    | "one-quarter"
    | "one-fifth";
  visibility?: "visible" | "invisible" | "hidden" | "screen-reader-only";
} & JSX.IntrinsicElements["div"];

export function Column(props: Props) {
  const { className, size, visibility, ...rest } = props;
  return (
    <div
      className={`column ${renderSize(size)} ${className} ${handleVisibility(
        visibility
      )}`}
      {...rest}
    />
  );
}

function renderSize(size: string | undefined) {
  return size ? `is-${size}` : "";
}

function handleVisibility(visibility: string | undefined) {
  return visibility === "invisible"
    ? "is-invisible"
    : visibility === "hidden"
    ? "is-hidden"
    : visibility === "screen-reader-only"
    ? "is-sr-only"
    : "";
}

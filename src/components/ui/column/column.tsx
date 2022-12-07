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
} & JSX.IntrinsicElements["div"];

export function Column(props: Props) {
  const { className, size, ...rest } = props;
  return (
    <div className={`column ${renderSize(size)} ${className}`} {...rest} />
  );
}

function renderSize(size: string | undefined) {
  return size ? `is-${size}` : "";
}

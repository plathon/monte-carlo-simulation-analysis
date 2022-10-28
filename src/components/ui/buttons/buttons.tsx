type Props = {
  position?: "left" | "right";
} & JSX.IntrinsicElements["p"];

export function Buttons(props: Props) {
  const { position, className, ...rest } = props;
  return (
    <p
      className={`buttons ${renderPosition(position)} ${className}`}
      {...rest}
    />
  );
}

function renderPosition(position?: string) {
  return position === "left"
    ? "is-left"
    : position === "right"
    ? "is-right"
    : "";
}

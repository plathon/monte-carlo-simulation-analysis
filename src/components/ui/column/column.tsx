type Props = {
  full?: boolean;
  oneQuarter?: boolean;
} & JSX.IntrinsicElements["div"];

export function Column(props: Props) {
  const { className, full, oneQuarter, ...rest } = props;
  return (
    <div
      className={`column ${renderOneQuarter(oneQuarter)} ${renderFull(
        full
      )} ${className}`}
      {...rest}
    />
  );
}

function renderOneQuarter(isOneQuarter?: boolean) {
  return isOneQuarter ? "is-one-quarter" : "";
}

function renderFull(isFull?: boolean) {
  return isFull ? "is-full" : "";
}

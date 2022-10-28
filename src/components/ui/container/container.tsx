type Props = {
  widescreen?: boolean;
} & JSX.IntrinsicElements["div"];

export function Container(props: Props) {
  const { className, widescreen, ...rest } = props;
  return (
    <div
      className={`container ${isWidescreen(widescreen)} ${className}`}
      {...rest}
    />
  );
}

function isWidescreen(widescreen?: boolean) {
  return widescreen ? "is-widescreen" : "";
}

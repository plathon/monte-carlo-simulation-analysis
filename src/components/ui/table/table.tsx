type Props = {
  bordered?: boolean;
} & JSX.IntrinsicElements["table"];

export function Table(props: Props) {
  const { className, bordered, ...rest } = props;
  return (
    <table
      className={`table ${renderBordered(bordered)} ${className}`}
      {...rest}
    />
  );
}

function renderBordered(bordered: boolean | undefined) {
  return bordered ? "is-bordered" : "";
}

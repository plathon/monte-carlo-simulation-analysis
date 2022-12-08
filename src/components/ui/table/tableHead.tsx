type Props = JSX.IntrinsicElements["thead"];

export function TableHead(props: Props) {
  const { children, ...rest } = props;
  return (
    <thead {...rest}>
      <tr>{children}</tr>
    </thead>
  );
}

type Props = JSX.IntrinsicElements["div"];

export function Column(props: Props) {
  const { className, ...rest } = props;
  return <div className={`column ${className}`} {...rest} />;
}

type Props = JSX.IntrinsicElements["div"];

export function Content(props: Props) {
  const { className, ...rest } = props;
  return <div className={`content ${className}`} {...rest} />;
}

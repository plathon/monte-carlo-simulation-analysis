type Props = JSX.IntrinsicElements["div"];

export function Control(props: Props) {
  const { className, ...rest } = props;
  return <div className={`control ${className}`} {...rest} />;
}

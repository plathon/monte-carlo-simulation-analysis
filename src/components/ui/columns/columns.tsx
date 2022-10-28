type Props = JSX.IntrinsicElements["div"];

export function Columns(props: Props) {
  const { className, ...rest } = props;
  return <div className={`columns ${className}`} {...rest} />;
}

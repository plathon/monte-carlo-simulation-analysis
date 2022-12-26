type Props = { label: string } & JSX.IntrinsicElements["input"];

export function Radio(props: Props) {
  const { label, ...rest } = props;
  return (
    <label className="radio">
      <input {...rest} type="radio" />
      {label}
    </label>
  );
}

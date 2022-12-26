type Props = {
  label: string;
} & JSX.IntrinsicElements["div"];

export function Radios(props: Props) {
  const { label, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control" {...rest} />
    </div>
  );
}

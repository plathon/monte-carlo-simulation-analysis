type Props = {
  label: string;
  touched?: boolean | undefined;
  error?: string | undefined;
  data: Array<Record<"label" | "value" | "index", string>>;
} & JSX.IntrinsicElements["select"];

export function Select(props: Props) {
  const { label, touched, error, data, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className={`select ${touched && error ? "is-danger" : ""}`}>
          <select {...rest}>
            {data.map((item) => (
              <option key={item.index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

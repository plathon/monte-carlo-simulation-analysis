type Props = {
  label: string;
  error?: string;
  isLoading?: boolean;
} & JSX.IntrinsicElements["textarea"];

export function TextArea(props: Props) {
  const { label, error, isLoading, disabled, className, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          className={`textarea ${renderHasErrors(!!error)} ${className}`}
          disabled={isLoading || disabled}
          {...rest}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

function renderHasErrors(hasErrors?: boolean) {
  return hasErrors ? "is-danger" : "";
}

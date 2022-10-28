type Props = {
  label: string;
  error?: string;
  isLoading?: boolean;
  isFetching?: boolean;
} & JSX.IntrinsicElements["input"];

export function TextField(props: Props) {
  const { label, error, isLoading, disabled, isFetching, className, ...rest } =
    props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${renderIsFetching(isFetching)}`}>
        <input
          className={`input ${renderHasErrors(!!error)} ${className}`}
          disabled={isLoading || isFetching || disabled}
          {...rest}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

function renderIsFetching(isFetching?: boolean) {
  return isFetching ? "is-loading" : "";
}

function renderHasErrors(hasErrors?: boolean) {
  return hasErrors ? "is-danger" : "";
}

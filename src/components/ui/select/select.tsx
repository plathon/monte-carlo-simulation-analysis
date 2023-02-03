import styled from "styled-components";

type Props = {
  label: string;
  isLoading?: boolean;
  touched?: boolean | undefined;
  error?: string | undefined;
  data: Array<Record<"label" | "value" | "index", string>>;
  fullWidth?: boolean;
};

type SelectProps = Props & JSX.IntrinsicElements["select"];

type ContainerProps = Omit<
  Props,
  "isLoading" | "label" | "touched" | "error" | "data"
>;

const SelectContainer = styled.div<ContainerProps>`
  width: ${(props) => (props.fullWidth ? "100%" : "inherit")};
  select {
    width: ${(props) => (props.fullWidth ? "100%" : "inherit")};
  }
`;

export function Select(props: SelectProps) {
  const { label, fullWidth, touched, isLoading, error, data, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <SelectContainer
          className={`select ${isLoading ? "is-loading" : ""} ${
            touched && error ? "is-danger" : ""
          }`}
          fullWidth={fullWidth}
        >
          <select {...rest}>
            {data.map((item) => (
              <option key={item.index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </SelectContainer>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

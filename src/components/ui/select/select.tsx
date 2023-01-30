import styled from "styled-components";

type Props = {
  label: string;
  touched?: boolean | undefined;
  error?: string | undefined;
  data: Array<Record<"label" | "value" | "index", string>>;
  fullWidth?: boolean;
};

type SelectProps = Props & JSX.IntrinsicElements["select"];

type ContainerProps = Omit<Props, "label" | "touched" | "error" | "data">;

const SelectContainer = styled.div<ContainerProps>`
  width: ${(props) => (props.fullWidth ? "100%" : "inherit")};
  select {
    width: ${(props) => (props.fullWidth ? "100%" : "inherit")};
  }
`;

export function Select(props: SelectProps) {
  const { label, fullWidth, touched, error, data, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <SelectContainer
          className={`select ${touched && error ? "is-danger" : ""}`}
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
    </div>
  );
}

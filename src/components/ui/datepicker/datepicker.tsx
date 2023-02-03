import { ComponentProps } from "react";
import { DatePicker as AntdDatePiker } from "antd";

type DatePickerProps = {
  label?: string;
  error?: string;
  isLoading?: boolean;
  isFetching?: boolean;
} & ComponentProps<typeof AntdDatePiker>;

export function DatePicker(props: DatePickerProps) {
  const { label, error, isLoading, isFetching, ...rest } = props;
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control`}>
        <AntdDatePiker {...rest} disabled={isLoading || isFetching} />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

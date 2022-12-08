type Props = {
  size?: "small" | "medium" | "medium";
} & JSX.IntrinsicElements["button"];

export function Delete(props: Props) {
  const { size, ...rest } = props;
  return (
    <button className={`delete is-${renderSize(size)}`} {...rest}></button>
  );
}

function renderSize(size: string | undefined) {
  return size ? size : "";
}

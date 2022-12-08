type Props = {
  size?: "small" | "standard" | "medium" | "large";
} & JSX.IntrinsicElements["nav"];

export function Pagination(props: Props) {
  const { className, size, ...rest } = props;
  return (
    <nav
      className={`pagination ${className} ${renderSize(size)}`}
      role="navigation"
      aria-label="pagination"
      {...rest}
    >
      <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a>
    </nav>
  );
}

function renderSize(size: string | undefined) {
  return size ? `is-${size}` : "";
}

type BreadcrumbProps = {
  size?: "small" | "medium" | "large";
} & JSX.IntrinsicElements["nav"];

export function Breadcrumb(props: BreadcrumbProps) {
  const { children, size = "medium" } = props;
  return (
    <nav className={`breadcrumb is-${size}`} aria-label="breadcrumbs">
      <ul>{children}</ul>
    </nav>
  );
}

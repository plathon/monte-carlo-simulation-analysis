type Props = {
  isActive?: boolean;
} & JSX.IntrinsicElements["li"];

export function BreadcrumbItem(props: Props) {
  const { isActive = false, className = "", children, ...rest } = props;
  return (
    <li className={`${isActive && "is-active"} ${className}`} {...rest}>
      {children}
    </li>
  );
}

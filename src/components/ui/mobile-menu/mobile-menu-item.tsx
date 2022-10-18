type Props = {
  children: string;
  className?: string;
  isActive?: boolean;
} & JSX.IntrinsicElements["a"];

export function MobileMenuItem(props: Props) {
  const { children, className, isActive } = props;
  return (
    <a
      {...props}
      className={`dropdown-item ${className} ${isActive && "is-active"}`}
    >
      {children}
    </a>
  );
}

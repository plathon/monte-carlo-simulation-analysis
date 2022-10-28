import { forwardRef } from "react";

export type MobileMenuItemProps = {
  children: string;
  className?: string;
  isActive?: boolean;
} & JSX.IntrinsicElements["a"];

export const MobileMenuItem = forwardRef<
  HTMLAnchorElement,
  MobileMenuItemProps
>(function MobileMenuItemRef(props, ref) {
  const { className, isActive, ...rest } = props;
  return (
    <a
      className={`dropdown-item ${className} ${isActive && "is-active"}`}
      ref={ref}
      {...rest}
    />
  );
});

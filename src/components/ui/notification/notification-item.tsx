type Props = {
  children?: JSX.Element | string;
};

export function NotificationItem(props: Props) {
  const { children } = props;
  return <div className="dropdown-item">{children}</div>;
}

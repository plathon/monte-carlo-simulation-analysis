type Props = {
  isLoading: boolean;
};

export function Loading(props: Props) {
  const { isLoading } = props;

  return isLoading ? (
    <button className="button is-rounded is-loading disabled"></button>
  ) : (
    <></>
  );
}

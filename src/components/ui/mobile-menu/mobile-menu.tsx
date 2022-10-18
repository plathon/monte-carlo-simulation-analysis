type Props = {
  children: JSX.Element | JSX.Element[];
};

export function MobileMenu({ children }: Props) {
  return (
    <div className="dropdown is-right">
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
        >
          <span className="icon is-small">
            <i className="fas fa-bars"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu3" role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
}

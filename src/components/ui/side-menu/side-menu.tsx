export function SideMenu() {
  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <a className="is-active">Profile</a>
        </li>
        <li>
          <a>Workspaces</a>
        </li>
      </ul>
      <p className="menu-label">Transactions</p>
      <ul className="menu-list">
        <li>
          <a>Billing</a>
        </li>
        <li>
          <a>Plans</a>
        </li>
      </ul>
    </aside>
  );
}

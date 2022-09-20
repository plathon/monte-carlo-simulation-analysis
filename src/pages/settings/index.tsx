import Head from "next/head";

import NavBar from "../../components/nav_bar";

export default function Index() {
  return (
    <>
      <Head>
        <title>Snap Trade - Settings</title>
      </Head>
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-full">
            <NavBar />
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <hr />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a className="is-active">Profile</a>
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
          </div>
          <div className="column">
            <form>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Ex: renan@gmail.com"
                  />
                </div>
              </div>

              <div className="control">
                <button className="button is-dark">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

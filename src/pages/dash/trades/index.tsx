import Head from "next/head";

import NavBar from "../../../components/nav_bar";
import Menu from "../../../components/menu";

export default function Index() {
  return (
    <>
      <Head>
        <title>Snap Trade - Dashboard</title>
      </Head>
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-full">
            <NavBar />
          </div>
        </div>
        <Menu />
        <div className="columns">
          <div className="column is-full">
            <table className="table is-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open Price</th>
                  <th>Close Price</th>
                  <th>Long/Short</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>13/12/2021</td>
                  <td>1009.50</td>
                  <td>1009.00</td>
                  <td>L</td>
                  <td>
                    <button className="button is-small">
                      <i className="fa fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Team</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <nav
              className="pagination is-rounded"
              role="navigation"
              aria-label="pagination"
            >
              <ul className="pagination-list">
                <li>
                  <a className="pagination-link" aria-label="Goto page 1">
                    1
                  </a>
                </li>
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 45">
                    45
                  </a>
                </li>
                <li>
                  <a
                    className="pagination-link is-current"
                    aria-label="Page 46"
                    aria-current="page"
                  >
                    46
                  </a>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 47">
                    47
                  </a>
                </li>
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 86">
                    86
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

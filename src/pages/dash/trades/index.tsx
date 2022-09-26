import Head from "next/head";

import NavBar from "../../../components/nav_bar";
import Menu from "../../../components/menu";

import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%;
`;

const Input = styled.input`
  max-width: 180px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

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
          <div className="column">
            <div className="buttons">
              <button className="button">
                <span className="icon is-small">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span>Add Trade</span>
              </button>
              <button className="button">
                <span className="icon is-small">
                  <i className="fa-regular fa-file"></i>
                </span>
                <span>Upload File</span>
              </button>
            </div>
          </div>
        </div>
        <div className="columns">
          <TableContainer className="column">
            <Table className="table is-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Open Price</th>
                  <th>Close Price</th>
                  <th>Long/Short</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="field">
                      <div className="control">
                        <Input
                          className="input"
                          type="text"
                          placeholder="Type trade datetime"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="field">
                      <div className="control">
                        <Input
                          className="input"
                          type="text"
                          placeholder="ex: EURUSD"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="field">
                      <div className="control">
                        <Input
                          className="input"
                          type="text"
                          placeholder="1000.00"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="field">
                      <div className="control">
                        <Input
                          className="input"
                          type="text"
                          placeholder="1000.50"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="field">
                      <div className="control">
                        <div className="select">
                          <select>
                            <option>Long</option>
                            <option>Short</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="buttons">
                      <button className="button is-small is-link">
                        <i className="fa fa-check"></i>
                      </button>
                      <button className="button is-small">
                        <i className="fa fa-xmark"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>13/12/2021</td>
                  <td>EURUSD</td>
                  <td>1009.50</td>
                  <td>1009.00</td>
                  <td>Long</td>
                  <td>
                    <div className="buttons">
                      <button className="button is-small">
                        <i className="fa fa-xmark"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Team</th>
                </tr>
              </tfoot>
            </Table>
          </TableContainer>
        </div>
        <div className="columns">
          <PaginationContainer className="column is-half is-offset-one-quarter">
            <nav
              className="pagination is-small"
              role="navigation"
              aria-label="pagination"
            >
              <a className="pagination-previous">Previous</a>
              <a className="pagination-next">Next page</a>
            </nav>
          </PaginationContainer>
        </div>
      </div>
    </>
  );
}

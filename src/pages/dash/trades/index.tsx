import Head from "next/head";
import { useFormik } from "formik";
import { object, string, number } from "yup";

import NavBar from "../../../components/nav_bar";
import Menu from "../../../components/menu";

import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  max-width: 180px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

export default function Index() {
  const formik = useFormik({
    initialValues: {
      date: "",
      symbol: "",
      open_price: "",
      close_price: "",
      side: "S",
    },
    validationSchema: object({
      open_price: number().required(),
      close_price: number().required(),
      side: string().required(),
    }),
    onSubmit: (data) => console.log(data),
  });
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
              <button className="button is-link">
                <span className="icon is-small">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span>File Upload</span>
              </button>
            </div>
          </div>
        </div>
        <div className="columns">
          <TableContainer className="column">
            <form onSubmit={formik.handleSubmit}>
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
                            className={`input ${
                              formik.touched.date && formik.errors.date
                                ? "is-danger"
                                : ""
                            }`}
                            type="text"
                            placeholder="Type trade datetime"
                            name="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="field">
                        <div className="control">
                          <Input
                            className={`input ${
                              formik.touched.symbol && formik.errors.symbol
                                ? "is-danger"
                                : ""
                            }`}
                            type="text"
                            placeholder="ex: EURUSD"
                            name="symbol"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.symbol}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="field">
                        <div className="control">
                          <Input
                            className={`input ${
                              formik.touched.open_price &&
                              formik.errors.open_price
                                ? "is-danger"
                                : ""
                            }`}
                            type="text"
                            placeholder="1000.00"
                            name="open_price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.open_price}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="field">
                        <div className="control">
                          <Input
                            className={`input ${
                              formik.touched.close_price &&
                              formik.errors.close_price
                                ? "is-danger"
                                : ""
                            }`}
                            type="text"
                            placeholder="1000.50"
                            name="close_price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.close_price}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="field">
                        <div className="control">
                          <div
                            className={`select ${
                              formik.touched.side && formik.errors.side
                                ? "is-danger"
                                : ""
                            }`}
                          >
                            <select
                              name="side"
                              onChange={(event) =>
                                formik.setFieldValue("side", event.target.value)
                              }
                              onBlur={formik.handleBlur}
                              value={formik.values.side}
                            >
                              <option value="L">Long</option>
                              <option value="S">Short</option>
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
            </form>
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

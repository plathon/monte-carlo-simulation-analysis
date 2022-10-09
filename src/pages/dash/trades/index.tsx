import Head from "next/head";
import { useFormik } from "formik";
import { object, number, mixed } from "yup";

import NavBar from "../../../components/nav_bar";
import Menu from "../../../components/menu";

import { trpc } from "../../../utils/trpc";

import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
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
  const { isLoading: isLoadingTrades, data: tradeList } = trpc.useQuery([
    "trade.list",
  ]);
  const { isLoading: isLoadingWorkspaces, data: workspaces } = trpc.useQuery([
    "workspace.list",
  ]);
  const tradeMutation = trpc.useMutation(["trade.create"]);

  const formik = useFormik({
    initialValues: {
      symbol: "",
      open_price: "",
      close_price: "",
      begin_at: "",
      end_at: "",
      side: "BUY",
    },
    validationSchema: object({
      open_price: number().required(),
      close_price: number().required(),
      side: mixed().oneOf(["BUY", "SELL"]),
    }),
    onSubmit: (data) => {
      const { open_price, close_price, side } = data;
      tradeMutation.mutate({
        open_price: Number(open_price),
        close_price: Number(close_price),
        side: side === "SELL" ? "SELL" : "BUY",
      });
    },
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
        <Menu
          isLoadingWorkspaces={isLoadingWorkspaces}
          workspaces={workspaces || []}
        />
        {isLoadingTrades && (
          <LoadingContainer>
            <button className="button is-rounded is-loading disabled"></button>
          </LoadingContainer>
        )}
        {!isLoadingTrades && (
          <>
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
                        <th>Symbol</th>
                        <th>Open Price</th>
                        <th>Close Price</th>
                        <th>Open DateTime</th>
                        <th>Close DateTime</th>
                        <th>Side</th>
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
                              <Input
                                className={`input ${
                                  formik.touched.begin_at &&
                                  formik.errors.begin_at
                                    ? "is-danger"
                                    : ""
                                }`}
                                type="text"
                                placeholder="Type trade datetime"
                                name="begin_at"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.begin_at}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="field">
                            <div className="control">
                              <Input
                                className={`input ${
                                  formik.touched.end_at && formik.errors.end_at
                                    ? "is-danger"
                                    : ""
                                }`}
                                type="text"
                                placeholder="Type close trade datetime"
                                name="end_at"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.end_at}
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
                                    formik.setFieldValue(
                                      "side",
                                      event.target.value
                                    )
                                  }
                                  onBlur={formik.handleBlur}
                                  value={formik.values.side}
                                >
                                  <option value="BUY">Long</option>
                                  <option value="SELL">Short</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="buttons">
                            <button
                              className={`button is-small is-link ${
                                tradeMutation.isLoading && "is-loading"
                              }`}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {tradeList?.map((tarde) => (
                        <tr key={tarde.id}>
                          <td>{tarde.symbol}</td>
                          <td>{tarde.open_price.toString()}</td>
                          <td>{tarde.close_price.toString()}</td>
                          <td>{tarde.begin_at?.toDateString()}</td>
                          <td>{tarde.end_at?.toDateString()}</td>
                          <td>{tarde.side}</td>
                          <td>
                            <div className="buttons">
                              <button className="button is-small">
                                <i className="fa fa-xmark"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
          </>
        )}
      </div>
    </>
  );
}

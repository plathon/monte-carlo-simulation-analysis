import { useFormik } from "formik";
import { useRouter } from "next/router";
import { object, number, mixed } from "yup";
import styled from "styled-components";
import Link from "next/link";

import { MainLayout } from "../../../../components/layouts";

import { Columns } from "../../../../components/ui/columns";
import { Column } from "../../../../components/ui/column";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/Button";
import { Buttons } from "../../../../components/ui/buttons";

import { trpc } from "../../../../utils/trpc";

import type { NextPageWithLayout } from "../../../_app";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .breadcrumb {
    margin-bottom: 0;
  }
`;

const BreadcrumbLink = styled.a`
  text-transform: capitalize;
`;

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

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const { workspace: workspaceParam } = router.query;
  const { isLoading: isLoadingTrades, data: tradeList } = trpc.useQuery([
    "trade.list",
  ]);
  const { data: workspaces } = trpc.useQuery(["workspace.list"]);
  const tradeMutation = trpc.useMutation(["trade.create"]);
  const workspace = workspaces?.find(
    (workspaceItem) => workspaceItem.name === workspaceParam
  );

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
      {!isLoadingTrades && (
        <>
          <Columns>
            <Column>
              <Header>
                {workspace && (
                  <Breadcrumb size="small">
                    <BreadcrumbItem isActive={true}>
                      <BreadcrumbLink>workspace</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <Link href={`/workspace/${workspace.name}`}>
                        <BreadcrumbLink>{workspace.name}</BreadcrumbLink>
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isActive={true}>
                      <BreadcrumbLink>trades</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                )}
                <Buttons>
                  <Button text="File Upload" icon="fas fa-chart-line" />
                </Buttons>
              </Header>
            </Column>
          </Columns>
          <Columns>
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
                    {tradeList?.map((trade) => (
                      <tr key={trade.id}>
                        <td>{trade.symbol}</td>
                        <td>{trade.open_price.toString()}</td>
                        <td>{trade.close_price.toString()}</td>
                        <td>{trade.begin_at?.toDateString()}</td>
                        <td>{trade.end_at?.toDateString()}</td>
                        <td>{trade.side}</td>
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
          </Columns>
          <Columns>
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
          </Columns>
        </>
      )}
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <MainLayout title="Trades Settings">{page}</MainLayout>;
};

export default Index;

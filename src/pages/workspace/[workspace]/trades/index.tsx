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
import { Sidebar } from "../../../../components/ui/sidebar";

import { TextField } from "../../../../components/ui/field";
import { Select } from "../../../../components/ui/select";

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
  text-align: center;
  th {
    font-size: 12px;
    text-align: center !important;
    text-transform: uppercase;
  }
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

  const LongShortSelect = [
    { label: "Long", value: "BUY", index: "0" },
    { label: "Short", value: "SELL", index: "1" },
  ];

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
        <Columns>
          <Column>
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
                    <Button text="Add Trade" icon="fas fa-pen" />
                  </Buttons>
                </Header>
              </Column>
            </Columns>
            <Columns>
              <Column>
                <TableContainer>
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
                      {tradeList?.map((trade) => (
                        <tr key={trade.id}>
                          <td>{trade.symbol}</td>
                          <td>{trade.open_price.toString()}</td>
                          <td>{trade.close_price.toString()}</td>
                          <td>{trade.begin_at?.toDateString()}</td>
                          <td>{trade.end_at?.toDateString()}</td>
                          <td>{trade.side}</td>
                          <td>
                            <button className="button is-small">
                              <i className="fa fa-xmark"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              </Column>
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
          </Column>
          <Column
            size="one-quarter"
            style={{ borderLeft: "1px solid #dbdbdb" }}
          >
            <Sidebar title="register trade">
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label="Symbol"
                  name="symbol"
                  placeholder="Ex: EURUSD"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.symbol}
                  error={formik.touched.symbol ? formik.errors.symbol : ""}
                />

                <TextField
                  label="Open Price"
                  name="open_price"
                  placeholder="Ex: 1000.00"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.open_price}
                  error={
                    formik.touched.open_price ? formik.errors.open_price : ""
                  }
                />

                <TextField
                  label="Close Price"
                  name="close_price"
                  placeholder="Ex: 1000.50"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.close_price}
                  error={
                    formik.touched.close_price ? formik.errors.close_price : ""
                  }
                />

                <TextField
                  label="Open Datetime"
                  name="begin_at"
                  placeholder="Ex: 1000.50"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.begin_at}
                  error={formik.touched.begin_at ? formik.errors.begin_at : ""}
                />

                <TextField
                  label="Close Datetime"
                  name="end_at"
                  placeholder="Ex: 1000.50"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.end_at}
                  error={formik.touched.end_at ? formik.errors.end_at : ""}
                />

                <Select
                  label="Side"
                  name="side"
                  onChange={(event) =>
                    formik.setFieldValue("side", event.target.value)
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.side}
                  data={LongShortSelect}
                  touched={formik.touched.side}
                  error={formik.errors.side}
                />
                <Buttons position="right">
                  <Button text="Create" />
                </Buttons>
              </form>
            </Sidebar>
          </Column>
        </Columns>
      )}
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <MainLayout title="Trades Settings">{page}</MainLayout>;
};

export default Index;

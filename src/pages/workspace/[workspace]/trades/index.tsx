import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import toast from "react-hot-toast";

import { MainLayout } from "../../../../components/layouts";

import { Columns } from "../../../../components/ui/columns";
import { Column } from "../../../../components/ui/column";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/Button";
import { Buttons } from "../../../../components/ui/buttons";

import { Pagination } from "../../../../components/ui/pagination";

import {
  TableBody,
  TableHead,
  Table as TableUI,
} from "../../../../components/ui/table";

import { RegisterTrade as RegisterTradeSidebar } from "../../../../components/sidebars";

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

const PaginationColumn = styled(Column)`
  display: flex;
  justify-content: center;
`;

const Table = styled(TableUI)`
  width: 100%;
  text-align: center;
  th {
    font-size: 12px;
    text-align: center !important;
    text-transform: uppercase;
  }
`;

const TableColumn = styled(Column)`
  overflow-x: auto;
`;

const Index: NextPageWithLayout = () => {
  const [isActiveCreateTrade, setIsActiveCreateTrade] = useState(false);
  const router = useRouter();
  const queryContext = trpc.useContext();
  const { workspace: workspaceParam } = router.query;
  const { isLoading: isLoadingTrades, data: tradeList } = trpc.useQuery([
    "trade.list",
  ]);
  const { data: workspaces } = trpc.useQuery(["workspace.list"]);
  const tradeMutation = trpc.useMutation(["trade.create"], {
    onSuccess: () => {
      queryContext.invalidateQueries(["trade.list"]);
      toast.success("Your trade was successfully created.");
    },
  });
  const workspace = workspaces?.find(
    (workspaceItem) => workspaceItem.name === workspaceParam
  );

  const handleCloseSidebar = () => setIsActiveCreateTrade(!isActiveCreateTrade);
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
                    <Button
                      text="Add Trade"
                      icon="fas fa-pen"
                      color={isActiveCreateTrade ? "black" : "standard"}
                      onClick={handleCloseSidebar}
                    />
                  </Buttons>
                </Header>
              </Column>
            </Columns>
            <Columns>
              <TableColumn>
                <Table bordered>
                  <TableHead>
                    <th>Symbol</th>
                    <th>Open Price</th>
                    <th>Close Price</th>
                    <th>Open DateTime</th>
                    <th>Close DateTime</th>
                    <th>Side</th>
                    <th>Actions</th>
                  </TableHead>
                  <TableBody>
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
                  </TableBody>
                </Table>
              </TableColumn>
            </Columns>
            <Columns>
              <PaginationColumn className="is-half is-offset-one-quarter">
                <Pagination size="small" />
              </PaginationColumn>
            </Columns>
          </Column>
          <Column
            visibility={!isActiveCreateTrade ? "hidden" : "visible"}
            size="one-quarter"
            style={{ borderLeft: "1px solid #dbdbdb" }}
          >
            <RegisterTradeSidebar
              createTrade={tradeMutation.mutate}
              onClose={handleCloseSidebar}
              isLoading={tradeMutation.isLoading}
            />
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

import Head from "next/head";

import { Column } from "../ui/column";
import { Columns } from "../ui/columns";
import { Container } from "../ui/container";
import NavBar from "../nav_bar";
import TopBar from "../top_bar";

import { trpc } from "../../utils/trpc";

type Props = {
  title: string;
  children: JSX.Element;
};

export function NavigationLayout(props: Props) {
  const { title, children } = props;
  const workspaceQuery = trpc.useQuery(["workspace.list"]);
  const { data: workspaces, isLoading: isLoadingWorkspaces } = workspaceQuery;

  return (
    <>
      <Head>
        <title>Snap Trade - {title}</title>
      </Head>
      <Container widescreen>
        <Columns>
          <Column full>
            <TopBar />
          </Column>
        </Columns>
        <NavBar
          isLoadingWorkspaces={isLoadingWorkspaces}
          workspaces={workspaces || []}
          isCreateWorkspaceActive
        />
        <Columns>
          <Column full>
            <hr />
          </Column>
        </Columns>
        {children}
      </Container>
    </>
  );
}

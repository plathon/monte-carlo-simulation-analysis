import Head from "next/head";
import { useRouter } from "next/router";
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
  const router = useRouter();
  console.log(
    "🚀 ~ file: navigation.tsx ~ line 19 ~ NavigationLayout ~ router",
    router
  );
  const { workspace: workspaceParam } = router.query;
  const workspaceQuery = trpc.useQuery(["workspace.list"]);
  const { data: workspaces, isLoading: isLoadingWorkspaces } = workspaceQuery;
  const currentWorkspace = workspaces?.find(
    (workspace) => workspace.name === workspaceParam
  );

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
          workspace={currentWorkspace}
          isCreateWorkspaceActive={router.asPath === "/workspace/create"}
          isSettingsActive={
            router.asPath === `/workspace/${currentWorkspace?.name}/trades`
          }
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

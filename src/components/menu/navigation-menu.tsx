import { useRouter } from "next/router";

import NavBar from "../nav_bar";
import { trpc } from "../../utils/trpc";
import { Columns } from "../ui/columns";
import { Column } from "../ui/column";

export function NavigationMenu() {
  const router = useRouter();
  const { workspace: workspaceParam } = router.query;
  const workspaceQuery = trpc.useQuery(["workspace.list"]);
  const { data: workspaces, isLoading: isLoadingWorkspaces } = workspaceQuery;
  const currentWorkspace = workspaces?.find(
    (workspace) => workspace.name === workspaceParam
  );

  return (
    <>
      <Columns>
        <Column>
          <NavBar
            isLoadingWorkspaces={isLoadingWorkspaces}
            workspaces={workspaces || []}
            workspace={currentWorkspace}
            isCreateWorkspaceActive={router.asPath === "/workspace/create"}
            isSettingsActive={
              router.asPath === `/workspace/${currentWorkspace?.name}/trades`
            }
          />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <hr />
        </Column>
      </Columns>
    </>
  );
}

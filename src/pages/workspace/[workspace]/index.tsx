import { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { MainLayout } from "../../../components/layouts";

import { Columns } from "../../../components/ui/columns";
import { Column } from "../../../components/ui/column";
import { NavigationMenu } from "../../../components/menu";
import { CreateWorkspace } from "../../../components/sidebars";

import { trpc } from "../../../utils/trpc";

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const queryContext = trpc.useContext();
  const { workspace: workspaceParam } = router.query;

  const [isActiveCreateWorkspace, setIsActiveCreateWorkspace] = useState(false);

  const workspaceMutation = trpc.useMutation(["workspace.create"], {
    onSuccess: () => {
      queryContext.invalidateQueries(["workspace.list"]);
      toggleCreateWorkspaceMenu();
      message.success("Workspace was successfully created.");
    },
  });

  const {
    isLoading: isLoadingCreateWSMutation,
    mutate: mutateCreateWorkspace,
  } = workspaceMutation;

  const workspaceQuery = trpc.useQuery(["workspace.list"]);
  const { data: workspaces, isLoading: isLoadingWorkspaces } = workspaceQuery;
  const currentWorkspace = workspaces?.find(
    (workspace) => workspace.name === workspaceParam
  );

  const toggleCreateWorkspaceMenu = () =>
    setIsActiveCreateWorkspace(!isActiveCreateWorkspace);
  return (
    <>
      <NavigationMenu
        workspaces={workspaces || []}
        workspace={currentWorkspace}
        isLoadingWorkspaces={isLoadingWorkspaces}
        openCreateWorkspaceMenu={toggleCreateWorkspaceMenu}
      />
      <CreateWorkspace
        createWorkspace={mutateCreateWorkspace}
        isLoading={isLoadingCreateWSMutation}
        isOpened={isActiveCreateWorkspace}
        onClose={() => setIsActiveCreateWorkspace(false)}
      />
      <Columns>
        <Column></Column>
        <Column
          size="one-quarter"
          style={{ borderLeft: "1px solid #dbdbdb" }}
          visibility={!isActiveCreateWorkspace ? "hidden" : "visible"}
        ></Column>
      </Columns>
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <MainLayout title="Dashboard">{page}</MainLayout>;
};

export default Index;

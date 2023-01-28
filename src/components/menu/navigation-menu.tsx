import { Columns } from "../ui/columns";
import { Column } from "../ui/column";
import { SearchInput } from "../ui/search-input";
import { WorkspaceMenu } from "./workspace-menu";

export type Workspace = {
  id: string;
  name: string;
  ownerId: string;
};

type Props = {
  workspace: Workspace | undefined;
  workspaces: Workspace[];
  isLoadingWorkspaces: boolean;
  openCreateWorkspaceMenu: () => void;
};

export function NavigationMenu(props: Props) {
  return (
    <>
      <Columns>
        <Column>
          <Columns>
            <Column size="one-quarter">
              <SearchInput />
            </Column>
            <Column>
              <WorkspaceMenu {...props} />
            </Column>
          </Columns>

          {/* <NavBar
            isLoadingWorkspaces={isLoadingWorkspaces}
            workspaces={workspaces}
            workspace={workspace}
            openCreateWorkspaceMenu={openCreateWorkspaceMenu}
          /> */}
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

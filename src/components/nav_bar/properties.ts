export type Workspace = {
  id: string;
  name: string;
  ownerId: string;
};

export type MenuProps = {
  isLoadingWorkspaces: boolean;
  workspaces: Workspace[];
  workspace?: Workspace | undefined;
  isSettingsActive?: boolean;
  isCreateWorkspaceActive?: boolean;
};

import Link from "next/link";
import styled from "styled-components";
import { Tooltip } from "antd";

import { Loading } from "../ui/loading";
import { Buttons } from "../ui/buttons";
import { Button } from "../ui/Button";

import { Workspace as WorkspaceProps } from "../../types/workspace";

type WorkspaceMenuProps = {
  isLoadingWorkspaces: boolean;
  workspaces: WorkspaceProps[];
  workspace?: WorkspaceProps | undefined;
  isSettingsActive?: boolean;
  openCreateWorkspaceMenu: () => void;
};

const Workspace = styled.span`
  margin-bottom: 6px;
`;

export function WorkspaceMenu(props: WorkspaceMenuProps) {
  const {
    isLoadingWorkspaces,
    workspaces,
    workspace: currentWorkspace,
    isSettingsActive,
    openCreateWorkspaceMenu,
  } = props;

  return (
    <Buttons position="right">
      <Workspace className="tag is-white">
        <strong>WORKSPACES: </strong>
      </Workspace>
      <Loading isLoading={isLoadingWorkspaces} />
      {!isLoadingWorkspaces && (
        <>
          {workspaces.map((workspace) => (
            <Link href={`/workspace/${workspace.name}`} key={workspace.id}>
              <a>
                <Button
                  text={workspace.name}
                  corner="radius"
                  color={
                    workspace.id === currentWorkspace?.id ? "dark" : "standard"
                  }
                />
              </a>
            </Link>
          ))}

          <Tooltip placement="bottom" title="Create a new workspace">
            <Button
              icon="fa-regular fa-plus"
              color="standard"
              corner="radius"
              onClick={openCreateWorkspaceMenu}
            />
          </Tooltip>
        </>
      )}
      {currentWorkspace && (
        <Link href={`/workspace/${currentWorkspace.name}/trades`}>
          <a>
            <Tooltip placement="bottomRight" title="Workspace settings">
              <Button
                id="workspaceSettings"
                icon="fa fa-sliders"
                corner="radius"
                color={isSettingsActive ? "dark" : "standard"}
              />
            </Tooltip>
          </a>
        </Link>
      )}
    </Buttons>
  );
}

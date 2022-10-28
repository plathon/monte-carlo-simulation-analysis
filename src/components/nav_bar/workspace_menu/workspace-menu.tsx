import Link from "next/link";
import styled from "styled-components";

import { Loading } from "../../ui/loading";
import { Buttons } from "../../ui/buttons";
import { Button } from "../../ui/Button";

import { MenuProps } from "../properties";

const Workspace = styled.span`
  margin-bottom: 6px;
`;

type Workspace = {
  id: string;
  name: string;
  ownerId: string;
};

type WorkspaceMenuProps = MenuProps;

export function WorkspaceMenu(props: WorkspaceMenuProps) {
  const {
    isLoadingWorkspaces,
    workspaces,
    workspace: currentWorkspace,
    isSettingsActive,
    isCreateWorkspaceActive,
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
          <Link href="/workspace/create">
            <a>
              <Button
                id="createWorkspace"
                icon="fa-regular fa-plus"
                color={isCreateWorkspaceActive ? "dark" : "standard"}
                corner="radius"
              />
            </a>
          </Link>
        </>
      )}
      {currentWorkspace && (
        <Link href={`/workspace/${currentWorkspace.name}/trades`}>
          <a>
            <Button
              id="workspaceSettings"
              icon="fa fa-sliders"
              corner="radius"
              color={isSettingsActive ? "dark" : "standard"}
            />
          </a>
        </Link>
      )}
    </Buttons>
  );
}

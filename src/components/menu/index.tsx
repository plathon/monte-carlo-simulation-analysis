import { useEffect } from "react";
import Link from "next/link";
import tippy from "tippy.js";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";

import { SearchInput } from "../ui/search-input";
import { Loading } from "../ui/loading";
import { Buttons } from "../ui/buttons";
import { Button } from "../ui/Button";
import { Columns } from "../ui/columns";
import { Column } from "../ui/column";

const Workspace = styled.span`
  margin-bottom: 6px;
`;

const Hr = styled.hr`
  margin: 0.5 rem 0;
`;

type Workspace = {
  id: string;
  name: string;
  ownerId: string;
};

type MenuProps = {
  isLoadingWorkspaces: boolean;
  workspaces: Workspace[];
  workspace?: Workspace | undefined;
  isSettingsActive?: boolean;
  isCreateWorkspaceActive?: boolean;
};

export default function Menu(props: MenuProps) {
  const {
    isLoadingWorkspaces,
    workspaces,
    workspace: currentWorkspace,
    isSettingsActive,
    isCreateWorkspaceActive,
  } = props;
  useEffect(() => {
    tippy("#createWorkspace", {
      content: "Create a new workspace",
      placement: "bottom",
    });
    tippy("#workspaceSettings", {
      content: "Add trades to workspace",
      placement: "bottom",
    });
  });
  return (
    <>
      <Columns>
        <Column className="is-one-quarter">
          <SearchInput />
        </Column>
        <Column>
          <Buttons position="right">
            <Workspace className="tag is-white">
              <strong>WORKSPACES: </strong>
            </Workspace>
            <Loading isLoading={isLoadingWorkspaces} />
            {!isLoadingWorkspaces && (
              <>
                {workspaces.map((workspace) => (
                  <Link
                    href={`/workspace/${workspace.name}`}
                    key={workspace.id}
                  >
                    <a>
                      <Button
                        text={workspace.name}
                        corner="radius"
                        color={
                          workspace.id === currentWorkspace?.id
                            ? "dark"
                            : "standard"
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
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Hr />
        </Column>
      </Columns>
    </>
  );
}

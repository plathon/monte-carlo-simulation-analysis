import { useEffect } from "react";
import Link from "next/link";
import tippy from "tippy.js";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";

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
};

export default function Menu(props: MenuProps) {
  const {
    isLoadingWorkspaces,
    workspaces,
    workspace: currentWorkspace,
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
      <div className="columns">
        <div className="column is-one-quarter">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input is-rounded"
                type="text"
                placeholder="what did you want?"
              />
              <span className="icon is-small is-left">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </p>
          </div>
        </div>
        <div className="column">
          <p className="buttons is-right">
            <Workspace className="tag is-white">
              <strong>WORKSPACES: </strong>
            </Workspace>
            {isLoadingWorkspaces && (
              <button className="button is-rounded is-loading disabled"></button>
            )}
            {!isLoadingWorkspaces && (
              <>
                {workspaces.map((workspace) => (
                  <Link
                    href={`/workspace/${workspace.name}`}
                    key={workspace.id}
                  >
                    <button
                      className={`button is-rounded ${
                        workspace.id === currentWorkspace?.id && "is-dark"
                      }`}
                    >
                      {workspace.name.charAt(0).toUpperCase() +
                        workspace.name.slice(1)}
                    </button>
                  </Link>
                ))}
                <Link href="/workspace/create">
                  <button id="createWorkspace" className="button is-rounded">
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </Link>
              </>
            )}
            {currentWorkspace && (
              <Link href={`/workspace/${currentWorkspace.name}/trades`}>
                <button id="workspaceSettings" className="button is-rounded">
                  <span className="icon is-small">
                    <i className="fa fa-sliders"></i>
                  </span>
                </button>
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Hr />
        </div>
      </div>
    </>
  );
}

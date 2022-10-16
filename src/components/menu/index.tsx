import Link from "next/link";
import styled from "styled-components";

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
  const { isLoadingWorkspaces, workspaces, workspace } = props;
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
                    <button className="button is-rounded">
                      {workspace.name.charAt(0).toUpperCase() +
                        workspace.name.slice(1)}
                    </button>
                  </Link>
                ))}
                <Link href="/workspace/create">
                  <button className="button is-rounded">
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </Link>
              </>
            )}
            {workspace && (
              <Link href={`/workspace/${workspace.name}/trades`}>
                <button className="button is-rounded">
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

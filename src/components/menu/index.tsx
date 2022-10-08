import Link from "next/link";
import styled from "styled-components";

const Workspace = styled.span`
  margin-bottom: 6px;
`;

type Workspace = {
  id: string;
  name: string;
  ownerId: string;
};

type MenuProps = {
  isLoadingWorkspaces: boolean;
  workspaces: Workspace[];
};

export default function Menu(props: MenuProps) {
  const { isLoadingWorkspaces, workspaces } = props;
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
                  <Link href="dash/trades" key={workspace.id}>
                    <button className="button is-rounded">
                      {workspace.name.charAt(0).toUpperCase() +
                        workspace.name.slice(1)}
                    </button>
                  </Link>
                ))}
                <button className="button is-rounded">
                  <i className="fa-regular fa-plus"></i>
                </button>
              </>
            )}
            <button className="button is-rounded">
              <span className="icon is-small">
                <i className="fa fa-sliders"></i>
              </span>
            </button>
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <hr />
        </div>
      </div>
    </>
  );
}

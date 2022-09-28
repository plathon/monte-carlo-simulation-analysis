import Link from "next/link";
import styled from "styled-components";

const Workspace = styled.span`
  margin-bottom: 6px;
`;

export default function Menu() {
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
            <Link href="dash/trades">
              <button className="button is-rounded">Trades</button>
            </Link>
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

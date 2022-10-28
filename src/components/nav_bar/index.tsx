import { useEffect } from "react";
import tippy from "tippy.js";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";

import { SearchInput } from "../ui/search-input";

import { WorkspaceMenu } from "./workspace_menu";
import { Columns } from "../ui/columns";
import { Column } from "../ui/column";

import { MenuProps } from "./properties";

const Hr = styled.hr`
  margin: 0.5 rem 0;
`;

export default function Menu(props: MenuProps) {
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
          <WorkspaceMenu {...props} />
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

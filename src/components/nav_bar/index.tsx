import { useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

import { SearchInput } from "../ui/search-input";

import { WorkspaceMenu } from "./workspace_menu";
import { Columns } from "../ui/columns";
import { Column } from "../ui/column";

import { MenuProps } from "./properties";

export default function NavBar(props: MenuProps) {
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
    </>
  );
}

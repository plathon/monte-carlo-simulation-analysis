import { useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { NavigationLayout } from "../../../components/layouts/navigation";

import { Columns } from "../../../components/ui/columns";
import { Column } from "../../../components/ui/column";

import { CreateWorkspace as CreateWorkspaceSidebar } from "../../../components/sidebars";

const Index: NextPageWithLayout = () => {
  const [isActiveCreateWorkspace] = useState(true);
  return (
    <>
      <Columns>
        <Column></Column>
        <Column
          size="one-quarter"
          style={{ borderLeft: "1px solid #dbdbdb" }}
          visibility={!isActiveCreateWorkspace ? "hidden" : "visible"}
        >
          <CreateWorkspaceSidebar isLoading={false} />
        </Column>
      </Columns>
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <NavigationLayout title="Dashboard">{page}</NavigationLayout>;
};

export default Index;

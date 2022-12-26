import { useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { MainLayout } from "../../../components/layouts";

import { Columns } from "../../../components/ui/columns";
import { Column } from "../../../components/ui/column";
import { NavigationMenu } from "../../../components/menu";

import { CreateWorkspace as CreateWorkspaceSidebar } from "../../../components/sidebars";

const Index: NextPageWithLayout = () => {
  const [isActiveCreateWorkspace] = useState(true);
  return (
    <>
      <NavigationMenu />
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
  return <MainLayout title="Dashboard">{page}</MainLayout>;
};

export default Index;

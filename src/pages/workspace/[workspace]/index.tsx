import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

import TopBar from "../../../components/top_bar";
import Menu from "../../../components/menu";

import ExampleChart from "../../../components/charts/example-chart";
import ExampleBarChart from "../../../components/charts/example-bar-chart";

export default function Index() {
  const router = useRouter();
  const { workspace: workspaceParam } = router.query;
  const workspaceQuery = trpc.useQuery(["workspace.list"]);
  const { data: workspaces, isLoading: isLoadingWorkspaces } = workspaceQuery;
  const workspace = workspaces?.find(
    (workspace) => workspace.name === workspaceParam
  );
  return (
    <>
      <Head>
        <title>Snap Trade - Dashboard</title>
      </Head>
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-full">
            <TopBar />
          </div>
        </div>
        <Menu
          isLoadingWorkspaces={isLoadingWorkspaces}
          workspaces={workspaces || []}
          workspace={workspace}
        />
        <div className="columns">
          <div className="column is-full">
            <nav className="level is-mobile">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Profit</p>
                  <p className="title">3.456,50</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Payoff</p>
                  <p className="title">1.55</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Profit Factor</p>
                  <p className="title">1.65</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Points</p>
                  <p className="title">88</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <ExampleChart />
          </div>
          <div className="column is-half">
            <ExampleChart />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <ExampleBarChart />
          </div>
          <div className="column is-half">
            <ExampleBarChart />
          </div>
        </div>
      </div>
    </>
  );
}

import { NextPageWithLayout } from "../../_app";
import { NavigationLayout } from "../../../components/layouts/navigation";

import ExampleChart from "../../../components/charts/example-chart";
import ExampleBarChart from "../../../components/charts/example-bar-chart";

const Index: NextPageWithLayout = () => {
  return (
    <>
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
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <NavigationLayout title="Dashboard">{page}</NavigationLayout>;
};

export default Index;

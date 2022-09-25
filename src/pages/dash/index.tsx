import Head from "next/head";

import NavBar from "../../components/nav_bar";
import Menu from "../../components/menu";

import ExampleChart from "../../components/charts/example-chart";
import ExampleBarChart from "../../components/charts/example-bar-chart";

export default function Index() {
  return (
    <>
      <Head>
        <title>Snap Trade - Dashboard</title>
      </Head>
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-full">
            <NavBar />
          </div>
        </div>
        <Menu />
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

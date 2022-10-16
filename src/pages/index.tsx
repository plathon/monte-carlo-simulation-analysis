import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/landing_page";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Snap Trade - Professional risk management to the people.</title>
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;

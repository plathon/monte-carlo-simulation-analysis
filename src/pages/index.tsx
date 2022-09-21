import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import Styled from "styled-components";
import LandingPage from "../components/landing_page";

const Title = Styled.h1`
  color: red;
`;

const Home: NextPage = () => {
  // const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const { data: dbdata } = trpc.useQuery(["example.getAll"]);
  const session = useSession();
  console.log(session);
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

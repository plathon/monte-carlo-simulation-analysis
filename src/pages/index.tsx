import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import Styled from "styled-components";

const Title = Styled.h1`
  color: red;
`;

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Snap Trade - Professional risk management to the people.</title>
      </Head>
      <div>
        <Title>Teste</Title>
      </div>
    </>
  );
};

export default Home;

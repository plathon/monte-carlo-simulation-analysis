import Head from "next/head";

import { Column } from "../ui/column";
import { Columns } from "../ui/columns";
import { Container } from "../ui/container";
import TopBar from "../../components/top_bar";

type Props = {
  title: string;
  children: JSX.Element;
};

export function MainLayout(props: Props) {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>Snap Trade - {title}</title>
      </Head>
      <Container widescreen>
        <Columns>
          <Column full>
            <TopBar />
          </Column>
        </Columns>
        <Columns>
          <Column full>
            <hr />
          </Column>
        </Columns>
        {children}
      </Container>
    </>
  );
}

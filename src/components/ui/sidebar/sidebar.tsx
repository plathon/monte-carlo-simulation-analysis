import styled from "styled-components";

import { Delete } from "../delete";

const SidebarContainer = styled.article`
  background-color: inherit;
`;

const MessageHeader = styled.div`
  background-color: inherit;
  color: #363636;
  text-transform: uppercase;
  padding: 0.75em 0;
`;

const MessageBody = styled.div`
  padding: 1.25em 0;
`;

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
} & JSX.IntrinsicElements["article"];

export function Sidebar(props: Props) {
  const { title, onClose, children } = props;
  return (
    <SidebarContainer className="message">
      <MessageHeader className="message-header">
        {title}
        <Delete onClick={() => onClose()} />
      </MessageHeader>
      <MessageBody className="message-body">{children}</MessageBody>
    </SidebarContainer>
  );
}

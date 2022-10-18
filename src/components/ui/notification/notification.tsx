import styled from "styled-components";

const Notifications = styled.div`
  margin-right: 10px;
`;

const NotificationBtn = styled.button`
  &:hover {
    background-color: #efefef !important;
  }
`;

const Tag = styled.span`
  position: absolute;
  left: 20px;
  top: -6px;
`;

type Props = {
  children?: JSX.Element | JSX.Element[];
  notificationQty: number;
};

export function Notification(props: Props) {
  const { children, notificationQty } = props;
  return (
    <Notifications id="dropdown1" className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <NotificationBtn
          className="button is-white"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
        >
          <span className="icon is-small">
            <i className="fas fa-bell"></i>
          </span>
        </NotificationBtn>
        <Tag className="tag is-danger is-rounded">{notificationQty}</Tag>
      </div>
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </Notifications>
  );
}

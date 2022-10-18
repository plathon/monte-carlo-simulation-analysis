import { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";

import {
  Notification,
  NotificationItem,
  NotificationDivider,
} from "../ui/notification";
import {
  MobileMenu,
  MobileMenuItem,
  MobileMenuDivider,
} from "../ui/mobile-menu";
import Logo from "../logo";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const TopBarItem = styled.div``;

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown:not(.is-hoverable)");

    if (dropdowns.length > 0) {
      dropdowns.forEach(function (el) {
        el.addEventListener("click", function (e) {
          if (e.target instanceof Element) {
            if (e.target?.classList.contains("dropdown-item")) {
              return;
            }
          }
          closeDropdowns();
          e.stopPropagation();
          el.classList.toggle("is-active");
        });
      });

      document.addEventListener("click", function () {
        closeDropdowns();
      });
    }

    function closeDropdowns() {
      dropdowns.forEach(function (el) {
        el.classList.remove("is-active");
      });
    }

    document.addEventListener("keydown", function (event) {
      const e = event || window.event;
      if (e.key === "Esc" || e.key === "Escape") {
        closeDropdowns();
      }
    });
  }, []);

  return (
    <TopBar>
      <TopBarItem>
        <Logo />
      </TopBarItem>
      <TopBarItem>
        <Notification notificationQty={2}>
          <NotificationItem>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </NotificationItem>
          <NotificationDivider />
          <NotificationItem>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </NotificationItem>
        </Notification>
        <MobileMenu>
          <Link href="/workspace/default">
            <MobileMenuItem isActive={router.asPath === "/workspace/default"}>
              Workspaces
            </MobileMenuItem>
          </Link>
          <Link href="/settings">
            <MobileMenuItem isActive={router.asPath === "/settings"}>
              Settings
            </MobileMenuItem>
          </Link>
          <MobileMenuItem>Docs</MobileMenuItem>
          <MobileMenuItem>Help</MobileMenuItem>
          <MobileMenuDivider />
          <MobileMenuItem onClick={() => signOut()}>Logout</MobileMenuItem>
        </MobileMenu>
      </TopBarItem>
    </TopBar>
  );
}

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import styled from "styled-components";

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Notifications = styled.div`
  margin-right: 10px;
`;

const NotificationBtn = styled.button`
  background-color: #f5f5f5 !important;
  &:hover {
    background-color: #efefef !important;
  }
`;

const Tag = styled.span`
  position: absolute;
  left: 20px;
  top: -6px;
`;

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
    <NavMenu>
      <div>
        <p>
          <strong>SNP.T</strong>
        </p>
      </div>
      <div>
        <Notifications
          id="dropdown1"
          className="dropdown is-right is-hoverable"
        >
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
            <Tag className="tag is-danger is-rounded">2</Tag>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <p>
                  You can insert <strong>any type of content</strong> within the
                  dropdown menu.
                </p>
              </div>
              <hr className="dropdown-divider" />
              <div className="dropdown-item">
                <p>
                  You simply need to use a <code>&lt;div&gt;</code> instead.
                </p>
              </div>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                This is a link
              </a>
            </div>
          </div>
        </Notifications>

        <div className="dropdown is-right">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu3"
            >
              <span className="icon is-small">
                <i className="fas fa-bars"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            <div className="dropdown-content">
              <Link href="/dash">
                <a
                  className={`dropdown-item ${
                    router.asPath === "/dash" ? "is-active" : ""
                  }`}
                >
                  Dashboard
                </a>
              </Link>
              <Link href="/settings">
                <a
                  className={`dropdown-item ${
                    router.asPath === "/settings" ? "is-active" : ""
                  }`}
                >
                  Settings
                </a>
              </Link>
              <a href="#" className="dropdown-item">
                Docs
              </a>
              <a href="#" className="dropdown-item">
                Help
              </a>
              <hr className="dropdown-divider" />
              <a onClick={() => signOut()} className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}

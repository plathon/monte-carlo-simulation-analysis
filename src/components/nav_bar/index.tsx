import { useEffect } from "react";
import styled from "styled-components";

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export default function Index() {
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown:not(.is-hoverable)");

    if (dropdowns.length > 0) {
      dropdowns.forEach(function (el) {
        el.addEventListener("click", function (e) {
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
              <a href="#" className="dropdown-item">
                Home
              </a>
              <a href="#" className="dropdown-item">
                Settings
              </a>
              <a href="#" className="dropdown-item">
                Docs
              </a>
              <a href="#" className="dropdown-item">
                Help
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}

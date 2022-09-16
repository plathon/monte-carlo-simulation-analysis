import Link from "next/link";
import Styled from "styled-components";

const TopBar = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 5px 0 5px;
`;

const Menu = Styled.div`
    ul li {
        display: inline;
        margin: 0 15px 0 15px;
    }
`;

const Hero = Styled.section``;

const Index = () => {
  return (
    <div>
      <TopBar>
        <div>
          <a href="#" className="has-text-dark">
            Snap Trade
          </a>
        </div>
        <Menu>
          <ul>
            <li>
              <a className="has-text-dark" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="has-text-dark" href="#">
                Plans
              </a>
            </li>
            <li>
              <a className="has-text-dark" href="#">
                Docs
              </a>
            </li>
            <li>
              <a className="has-text-dark" href="#">
                Support
              </a>
            </li>
          </ul>
        </Menu>
        <div>
          <Link href="/auth/signin">
            <button className="button">Sign In</button>
          </Link>
        </div>
      </TopBar>

      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="">
            <p className="title">SNAP TRADING</p>
            <p className="subtitle">
              Professional Risk management to the people
            </p>
            <p>
              <Link href="/auth/signin">
                <button className="button is-light">Get Start Now</button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */
// import cookie from "cookie";
// import { OpenAPI } from "./api";
import * as Sentry from "@sentry/react";
import { useState } from "react";
import { MdFoodBank } from "react-icons/md";
import { BrowserRouter, Link } from "react-router-dom";
import { styled } from "styled-components";

import Category from "./components/Category";
import Search from "./components/Search";
import SearchHistory from "./components/SearchHistory";
import Pages from "./pages/Pages";

// OpenAPI.interceptors.request.use(
//   (request: { headers: { [x: string]: string } }) => {
//     const { csrftoken } = cookie.parse(document.cookie);
//     if (request.headers && csrftoken) {
//       request.headers["X-CSRFTOKEN"] = csrftoken;
//     }
//     return request;
//   },
// );

function App() {
  const [input, setInputValue] = useState<string>("");

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <div className="App">
        <BrowserRouter>
          <Layout>
            <LeftColumn>
              <Nav>
                <MdFoodBank />
                <Logo to="/">Recipes</Logo>
              </Nav>
              <br />
              <Description>
                Hungry for something delicious?
                <span>
                  &nbsp;Tell us what your craving and we'll find the perfect recipe for you! Just type in a keyword and let the magic
                  happen.
                </span>
              </Description>
              <Search setInputValue={setInputValue} />
              <SearchHistory input={input} />
              <br />
              <Category />
            </LeftColumn>
            <RightColumn>
              <Pages />
            </RightColumn>
          </Layout>
        </BrowserRouter>
      </div>
    </Sentry.ErrorBoundary>
  );
}

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #1c2331;
  padding: 0 2rem;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const LeftColumn = styled.div`
  width: 35%;
  margin-top: 2rem;
  padding-right: 2rem;

  @media (max-width: 767px) {
    width: 100%;
    padding-right: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 4rem;
    margin-left: -0.6rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-family: "Lobster", cursive;
  font-size: 3rem;
  color: #1c2331;
`;

const Description = styled.p`
  span {
    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const RightColumn = styled.div`
  width: 65%;
  padding-left: 2rem;
  margin-top: 4rem;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
    padding-left: 0;
    margin-top: 1rem;
  }
`;

export default App;
